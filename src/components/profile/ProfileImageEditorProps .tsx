"use client"

import React, { useCallback, useState, useRef } from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';
import styles from './ProfileImageEditor.module.css';
import { getCroppedImg } from '@/utils/cropImage';

interface ProfileImageEditorProps {
    initialImageUrl?: string;
    onSave: (croppedBlob: Blob) => void;
}

const ProfileImageEditor: React.FC<ProfileImageEditorProps> = ({
    initialImageUrl,
    onSave,
}) => {
    const [imageSrc, setImageSrc] = useState<string | null>(initialImageUrl || null);
    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);
    const [rotation, setRotation] = useState<number>(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const onCropComplete = useCallback(
        (_: Area, croppedAreaPixels: Area) => {
            setCroppedAreaPixels(croppedAreaPixels);
        },
        []
    );

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

    const triggerFileSelectPopup = () => {
        inputRef.current?.click();
    };

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

    const onUploadNew = () => {
        setImageSrc(null);
        setCroppedAreaPixels(null);
        setZoom(1);
        setRotation(0);
        setCrop({ x: 0, y: 0 });
    };

    return (
        <div className={styles.container}>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                style={{ display: 'none' }}
                onChange={onFileChange}
            />

            {!imageSrc ? (
                <button className={styles.uploadBtn} onClick={triggerFileSelectPopup}>
                    Upload Profile Image
                </button>
            ) : (
                <>
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
                    <div className={styles.controls}>
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