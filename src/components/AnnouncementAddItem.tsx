import React from 'react';
import '../styles/AnnouncementItem.css';

interface AnnouncementAddItemProps {
    onClick: (id: number) => void;
}

export default function AnnouncementAddItem({ onClick }: AnnouncementAddItemProps) {
    return (
        <div onClick={() => onClick(Date.now())} className="announcement-item announcement-add-item">
            <p>Add Announcement</p>
        </div>
    );
}
