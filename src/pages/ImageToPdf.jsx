import { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { ProgressBar } from 'primereact/progressbar';
import { jsPDF } from 'jspdf';
import AppHeader from '../components/AppHeader';

const PAGE_SIZES = [
    { label: 'A4', value: 'a4' },
    { label: 'Letter', value: 'letter' },
    { label: 'A3', value: 'a3' },
    { label: 'A5', value: 'a5' },
];

const ORIENTATIONS = [
    { label: 'Portrait', value: 'portrait' },
    { label: 'Landscape', value: 'landscape' },
];

const ImageToPdf = () => {
    const [images, setImages] = useState([]);
    const [pageSize, setPageSize] = useState('a4');
    const [orientation, setOrientation] = useState('portrait');
    const [converting, setConverting] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [dragIndex, setDragIndex] = useState(null);
    const fileInputRef = useRef(null);

    const handleFiles = (files) => {
        const validFiles = Array.from(files).filter((f) =>
            f.type.startsWith('image/')
        );

        const newImages = validFiles.map((file) => ({
            file,
            name: file.name,
            preview: URL.createObjectURL(file),
            id: crypto.randomUUID(),
        }));

        setImages((prev) => [...prev, ...newImages]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => setDragOver(false);

    const removeImage = (id) => {
        setImages((prev) => {
            const img = prev.find((i) => i.id === id);
            if (img) URL.revokeObjectURL(img.preview);
            return prev.filter((i) => i.id !== id);
        });
    };

    const moveImage = (fromIndex, toIndex) => {
        if (toIndex < 0 || toIndex >= images.length) return;
        setImages((prev) => {
            const updated = [...prev];
            const [moved] = updated.splice(fromIndex, 1);
            updated.splice(toIndex, 0, moved);
            return updated;
        });
    };

    const handleReorderDragStart = (index) => {
        setDragIndex(index);
    };

    const handleReorderDragOver = (e, index) => {
        e.preventDefault();
        if (dragIndex === null || dragIndex === index) return;
        moveImage(dragIndex, index);
        setDragIndex(index);
    };

    const handleReorderDragEnd = () => {
        setDragIndex(null);
    };

    const clearAll = () => {
        images.forEach((img) => URL.revokeObjectURL(img.preview));
        setImages([]);
    };

    const loadImage = (src) =>
        new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });

    const convertToPdf = async () => {
        if (images.length === 0) return;
        setConverting(true);

        try {
            const pdf = new jsPDF({
                orientation,
                unit: 'mm',
                format: pageSize,
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 10;
            const usableWidth = pageWidth - margin * 2;
            const usableHeight = pageHeight - margin * 2;

            for (let i = 0; i < images.length; i++) {
                if (i > 0) pdf.addPage();

                const img = await loadImage(images[i].preview);

                const imgRatio = img.width / img.height;
                const pageRatio = usableWidth / usableHeight;

                let drawWidth, drawHeight;

                if (imgRatio > pageRatio) {
                    drawWidth = usableWidth;
                    drawHeight = usableWidth / imgRatio;
                } else {
                    drawHeight = usableHeight;
                    drawWidth = usableHeight * imgRatio;
                }

                const x = margin + (usableWidth - drawWidth) / 2;
                const y = margin + (usableHeight - drawHeight) / 2;

                pdf.addImage(img, 'JPEG', x, y, drawWidth, drawHeight);
            }

            pdf.save('images.pdf');
        } catch (err) {
            console.error('PDF conversion failed:', err);
        } finally {
            setConverting(false);
        }
    };

    return (
        <>
            <AppHeader />

            <div className="p-4" style={{ textAlign: 'left' }}>
                <Card title="Image to PDF Converter">
                    <div className="flex flex-column gap-3">
                        {/* Drop zone */}
                        <div
                            id="image-drop-zone"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onClick={() => fileInputRef.current?.click()}
                            style={{
                                border: `2px dashed ${dragOver ? 'var(--accent)' : 'var(--border)'}`,
                                borderRadius: '12px',
                                padding: '48px 24px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                background: dragOver ? 'var(--accent-bg)' : 'transparent',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <i
                                className="pi pi-cloud-upload"
                                style={{ fontSize: '2.5rem', color: 'var(--accent)', marginBottom: '12px', display: 'block' }}
                            />
                            <p style={{ fontWeight: 600, color: 'var(--text-h)', margin: '0 0 4px' }}>
                                Drag & drop images here
                            </p>
                            <p style={{ fontSize: '14px', color: 'var(--text)' }}>
                                or click to browse — supports JPG, PNG, WEBP, GIF
                            </p>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            hidden
                            onChange={(e) => {
                                handleFiles(e.target.files);
                                e.target.value = '';
                            }}
                        />

                        {/* Options row */}
                        {images.length > 0 && (
                            <div className="flex flex-wrap align-items-center gap-3">
                                <div className="flex align-items-center gap-2">
                                    <label style={{ fontWeight: 500, fontSize: '14px' }}>Page Size:</label>
                                    <Dropdown
                                        id="page-size-select"
                                        value={pageSize}
                                        options={PAGE_SIZES}
                                        onChange={(e) => setPageSize(e.value)}
                                        style={{ minWidth: '120px' }}
                                    />
                                </div>

                                <div className="flex align-items-center gap-2">
                                    <label style={{ fontWeight: 500, fontSize: '14px' }}>Orientation:</label>
                                    <Dropdown
                                        id="orientation-select"
                                        value={orientation}
                                        options={ORIENTATIONS}
                                        onChange={(e) => setOrientation(e.value)}
                                        style={{ minWidth: '140px' }}
                                    />
                                </div>

                                <div className="flex-grow-1" />

                                <span style={{ fontSize: '14px', color: 'var(--text)' }}>
                                    {images.length} image{images.length !== 1 ? 's' : ''} selected
                                </span>
                            </div>
                        )}

                        {/* Image previews */}
                        {images.length > 0 && (
                            <div
                                className="grid"
                                style={{ gap: '12px' }}
                            >
                                {images.map((img, index) => (
                                    <div
                                        key={img.id}
                                        className="col-6 md:col-3 lg:col-2"
                                        draggable
                                        onDragStart={() => handleReorderDragStart(index)}
                                        onDragOver={(e) => handleReorderDragOver(e, index)}
                                        onDragEnd={handleReorderDragEnd}
                                        style={{
                                            position: 'relative',
                                            border: '1px solid var(--border)',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            cursor: 'grab',
                                            opacity: dragIndex === index ? 0.5 : 1,
                                            transition: 'opacity 0.2s',
                                        }}
                                    >
                                        <img
                                            src={img.preview}
                                            alt={img.name}
                                            style={{
                                                width: '100%',
                                                height: '120px',
                                                objectFit: 'cover',
                                                display: 'block',
                                            }}
                                        />

                                        <div
                                            style={{
                                                padding: '6px 8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                borderTop: '1px solid var(--border)',
                                                background: 'var(--bg)',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: '11px',
                                                    color: 'var(--text)',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    maxWidth: '60%',
                                                }}
                                            >
                                                {index + 1}. {img.name}
                                            </span>

                                            <div className="flex gap-1">
                                                <Button
                                                    icon="pi pi-chevron-up"
                                                    rounded
                                                    text
                                                    size="small"
                                                    severity="secondary"
                                                    disabled={index === 0}
                                                    onClick={() => moveImage(index, index - 1)}
                                                    style={{ width: '24px', height: '24px' }}
                                                />
                                                <Button
                                                    icon="pi pi-chevron-down"
                                                    rounded
                                                    text
                                                    size="small"
                                                    severity="secondary"
                                                    disabled={index === images.length - 1}
                                                    onClick={() => moveImage(index, index + 1)}
                                                    style={{ width: '24px', height: '24px' }}
                                                />
                                                <Button
                                                    icon="pi pi-times"
                                                    rounded
                                                    text
                                                    size="small"
                                                    severity="danger"
                                                    onClick={() => removeImage(img.id)}
                                                    style={{ width: '24px', height: '24px' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Converting progress */}
                        {converting && (
                            <ProgressBar mode="indeterminate" style={{ height: '6px' }} />
                        )}

                        {/* Action buttons */}
                        {images.length > 0 && (
                            <div className="flex gap-2">
                                <Button
                                    id="convert-btn"
                                    label="Convert to PDF"
                                    icon="pi pi-file-pdf"
                                    onClick={convertToPdf}
                                    disabled={converting}
                                    loading={converting}
                                />
                                <Button
                                    id="add-more-btn"
                                    label="Add More"
                                    icon="pi pi-plus"
                                    severity="secondary"
                                    outlined
                                    onClick={() => fileInputRef.current?.click()}
                                />
                                <Button
                                    id="clear-all-btn"
                                    label="Clear All"
                                    icon="pi pi-trash"
                                    severity="danger"
                                    outlined
                                    onClick={clearAll}
                                />
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </>
    );
};

export default ImageToPdf;
