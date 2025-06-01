"use client"

// components/ProfileImageEditor.tsx
import React, { useCallback, useState, useRef } from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';
import styles from './ProfileImageEditor.module.css'; // optional CSS module
import { getCroppedImg } from '@/utils/cropImage';

interface ProfileImageEditorProps {
    /** 
     * Initial image URL (if you already have a profile image). 
     * Leave undefined to force user to upload a new one. 
     */
    initialImageUrl?: string;
    /** 
     * Called when user clicks “Save Changes”. 
     * The argument is a Blob of the cropped+rotated image (JPEG by default). 
     */
    onSave: (croppedBlob: Blob) => void;
}

const ProfileImageEditor: React.FC<ProfileImageEditorProps> = ({
    initialImageUrl,
    onSave,
}) => {
    // 1) Local state
    const [imageSrc, setImageSrc] = useState<string | null>(initialImageUrl || null);
    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);
    const [rotation, setRotation] = useState<number>(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // 2) Whenever crop area changes, store the new pixel coordinates
    const onCropComplete = useCallback(
        (_: Area, croppedAreaPixels: Area) => {
            setCroppedAreaPixels(croppedAreaPixels);
        },
        []
    );

    // 3) Handle file selection
    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageDataUrl = await readFileAsDataURL(file);
            setImageSrc(imageDataUrl);
            setZoom(1);
            setRotation(0);
            setCrop({ x: 0, y: 0 });
        }
    };

    // 4) Trigger hidden file input
    const triggerFileSelectPopup = () => {
        inputRef.current?.click();
    };

    // 5) When user clicks “Save Changes”, produce the cropped image Blob
    const onSaveClick = async () => {
        if (!imageSrc || !croppedAreaPixels) {
            return;
        }

        try {
            const blob = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation
            );

            onSave(blob);
        } catch (e) {
            console.error(e);
        }
    };

    // 6) If user wants to “upload new”, just clear out the imageSrc to show the file picker again
    const onUploadNew = () => {
        setImageSrc(null);
        setCroppedAreaPixels(null);
        setZoom(1);
        setRotation(0);
        setCrop({ x: 0, y: 0 });
    };

    return (
        <div className={styles.container}>
            {/* Hidden file input */}
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                style={{ display: 'none' }}
                onChange={onFileChange}
            />

            {/* If no image is loaded yet, show Upload button */}
            {!imageSrc ? (
                <button className={styles.uploadBtn} onClick={triggerFileSelectPopup}>
                    Upload Profile Image
                </button>
            ) : (
                <>
                    {/* Cropper viewport */}
                    <div className={styles.cropContainer}>
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={1 /* square */}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onRotationChange={setRotation}
                            onCropComplete={onCropComplete}
                            cropShape="rect"
                            showGrid={true}
                        />
                    </div>

                    {/* Controls */}
                    <div className={styles.controls}>
                        {/* Zoom slider */}
                        <div className={styles.controlItem}>
                            <label htmlFor="zoomRange">Zoom</label>
                            <input
                                id="zoomRange"
                                type="range"
                                min={1}
                                max={3}
                                step={0.01}
                                value={zoom}
                                onChange={(e) => setZoom(Number(e.target.value))}
                            />
                        </div>

                        {/* Rotation slider */}
                        <div className={styles.controlItem}>
                            <label htmlFor="rotationRange">Rotate</label>
                            <input
                                id="rotationRange"
                                type="range"
                                min={-180}
                                max={180}
                                step={1}
                                value={rotation}
                                onChange={(e) => setRotation(Number(e.target.value))}
                            />
                        </div>

                        {/* Buttons: Upload New / Save Changes */}
                        <div className={styles.buttonRow}>
                            <button className={styles.grayBtn} onClick={onUploadNew}>
                                Upload New
                            </button>
                            <button className={styles.primaryBtn} onClick={onSaveClick}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileImageEditor;

/** Utility to read File → DataURL */
function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error('Failed to read file as DataURL'));
            }
        });
        reader.addEventListener('error', (err) => reject(err));
        reader.readAsDataURL(file);
    });
}