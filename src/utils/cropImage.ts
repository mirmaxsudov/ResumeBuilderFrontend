// utils/cropImage.ts
/**
 * Utility to create an HTMLImageElement from a DataURL or URL.
 */
function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.setAttribute('crossOrigin', 'anonymous'); // needed for cross-origin images
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
        image.src = url;
    });
}

/**
 * Converts degrees to radians.
 */
function getRadianAngle(degreeValue: number): number {
    return (degreeValue * Math.PI) / 180;
}

/**
 * Given width/height and a rotation angle (in degrees), returns
 * the bounding box dimensions after rotation.
 */
function getRotatedDimensions(
    width: number,
    height: number,
    rotation: number
): { width: number; height: number } {
    const rotRad = getRadianAngle(rotation);
    return {
        width:
            Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height:
            Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
}

/**
 * Returns a Blob of the cropped image, given:
 * - imageSrc: DataURL or URL string
 * - pixelCrop: { x, y, width, height } in px (relative to original image coords)
 * - rotation: rotation in degrees (clockwise)
 */
export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number },
    rotation = 0
): Promise<Blob> {
    // 1. Load the image
    const image = await createImage(imageSrc);
    const originalWidth = image.width;
    const originalHeight = image.height;

    // 2. Compute the size of the bounding box after rotation
    const { width: rotatedW, height: rotatedH } = getRotatedDimensions(
        originalWidth,
        originalHeight,
        rotation
    );

    // 3. Create a canvas large enough to contain the rotated image
    const canvas = document.createElement('canvas');
    canvas.width = rotatedW;
    canvas.height = rotatedH;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2D context not supported');

    // 4. Move the origin to the center of the canvas, rotate, then draw the image
    ctx.translate(rotatedW / 2, rotatedH / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.drawImage(
        image,
        -originalWidth / 2,
        -originalHeight / 2,
        originalWidth,
        originalHeight
    );

    // 5. Now we need to crop the exact rectangle from this rotated image.
    //    Create a second smaller canvas whose dimensions = pixelCrop.width/height
    const croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = pixelCrop.width;
    croppedCanvas.height = pixelCrop.height;
    const croppedCtx = croppedCanvas.getContext('2d');
    if (!croppedCtx) throw new Error('2D context not supported on croppedCanvas');

    // 6. The drawImage source rectangle (sx, sy) in the rotated canvas coordinate.
    //    Because we translated to center before rotating, the top-left of the rotated image is
    //    ( (rotatedW/2 - originalWidth/2), (rotatedH/2 - originalHeight/2) ).
    const offsetX = (rotatedW / 2) - originalWidth / 2;
    const offsetY = (rotatedH / 2) - originalHeight / 2;

    // 7. Finally, draw the cropped portion onto croppedCanvas
    croppedCtx.drawImage(
        canvas,
        offsetX + pixelCrop.x,
        offsetY + pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    // 8. Convert croppedCanvas to Blob and return
    return new Promise<Blob>((resolve, reject) => {
        croppedCanvas.toBlob(
            (blob) => {
                if (!blob) {
                    return reject(new Error('Canvas is empty'));
                }
                resolve(blob);
            },
            'image/jpeg',
            0.9 /* quality */
        );
    });
}
