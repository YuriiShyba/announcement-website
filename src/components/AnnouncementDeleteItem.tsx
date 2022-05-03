import React from 'react';
import '../styles/AnnouncementDeleteItem.css';

interface AnnouncementDeleteItemProps {
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    classes: string;
}

export default function AnnouncementDeleteItem({
    onDragOver,
    classes,
    onDrop,
    onDragLeave,
}: AnnouncementDeleteItemProps) {
    return (
        <div
            onDragOver={(event) => onDragOver(event)}
            onDrop={(event) => onDrop(event)}
            onDragLeave={(event) => onDragLeave(event)}
            className={classes}
        >
            <div className="announcement-delete__item">
                <p>Drag here to delete!</p>
            </div>
        </div>
    );
}
