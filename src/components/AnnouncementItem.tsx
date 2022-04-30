import React, { FunctionComponent, useState } from 'react';
import '../styles/AnnouncementItem.css';
import { IAnnouncement } from '../types/types';

interface AnnouncementItemProps {
    announcement: IAnnouncement;
    onClick: (announcement: IAnnouncement) => void;
}

const AnnouncementItem: FunctionComponent<AnnouncementItemProps> = ({ announcement, onClick }) => {
    const [hover, setHover] = useState<boolean>(false);

    function mouseHoverHandler() {
        setHover(true);
    }

    function mouseLeaveHandler() {
        setHover(false);
    }

    return (
        <div
            onMouseEnter={mouseHoverHandler}
            onMouseLeave={mouseLeaveHandler}
            onClick={() => onClick(announcement)}
            className="announcement-item"
        >
            <div className="announcement-item__container">
                <h2 className="announcement-item__header">{announcement.title}</h2>
                <p className="announcement-item__body">{announcement.body}</p>
                <div className="announcement-item__control-text">
                    {hover && (
                        <p>
                            Click to edit<span>Drag to delete</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnnouncementItem;
