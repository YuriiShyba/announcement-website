import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AnnouncementItem.css';
import { IAnnouncement } from '../types/types';
import LinesEllipsis from 'react-lines-ellipsis';

interface AnnouncementItemProps {
    announcement: IAnnouncement;
    onCtrlClick?: (announcement: IAnnouncement) => void;
    onDrag?: (event: React.DragEvent<HTMLDivElement>, announcement: IAnnouncement) => void;
    onDragEnd?: (event: React.DragEvent<HTMLDivElement>) => void;
    draggable?: boolean;
}

const AnnouncementItem: FunctionComponent<AnnouncementItemProps> = ({
    announcement,
    onCtrlClick,
    onDrag,
    onDragEnd,
    draggable = true,
}) => {
    const [hover, setHover] = useState<boolean>(false);
    const navigate = useNavigate();
    let classesForDeleteText = 'item-control__delete-text';
    let classesForEditText = 'item-control__edit-text';
    let classesForAnnouncement = 'announcement-item draggable';

    if (!draggable) {
        classesForDeleteText += ' hidden';
        classesForAnnouncement = classesForAnnouncement.replace(' draggable', '');
    }

    if (onCtrlClick === undefined) {
        classesForEditText += ' hidden';
    }

    function mouseHoverHandler() {
        setHover(true);
    }

    function mouseLeaveHandler() {
        setHover(false);
    }

    function clickHandler(announcement: IAnnouncement) {
        navigate('/announcement-website/announcements/' + announcement.id);
    }

    return (
        <div
            onMouseEnter={mouseHoverHandler}
            onMouseLeave={mouseLeaveHandler}
            onClick={(event) => {
                event.ctrlKey ? onCtrlClick?.(announcement) : clickHandler(announcement);
            }}
            className={classesForAnnouncement}
            onDrag={(event) => onDrag?.(event, announcement)}
            draggable={draggable}
            onDragEnd={(event) => {
                onDragEnd?.(event);
            }}
        >
            <div className="announcement-item__container">
                <h2 className="announcement-item__header">
                    <LinesEllipsis text={announcement.title} maxLine={3} />
                </h2>
                <LinesEllipsis text={announcement.body} className="announcement-item__body" maxLine="7" />
                <div className="announcement-item__control-text item-control">
                    {hover && (
                        <p>
                            Click to view
                            <span className={classesForEditText}>Hold CTRL and click to edit</span>
                            <span className={classesForDeleteText}>Drag to delete</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnnouncementItem;
