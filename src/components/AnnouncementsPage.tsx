import React, { FunctionComponent, useState } from 'react';
import { IAnnouncement } from '../types/types';
import AnnouncementItem from './AnnouncementItem';
import List from './List';
import '../styles/AnnouncementsPage.css';
import AnnouncementAddItem from './AnnouncementAddItem';
import { useNavigate } from 'react-router-dom';
import '../styles/AnnouncementAddPage.css';
import AnnouncementSearchItem from './AnnouncementSearchItem';
import AnnouncementDeleteItem from './AnnouncementDeleteItem';

interface AnnouncementsPageProps {
    announcements: IAnnouncement[];
    onSearch: (query: string) => void;
    onDelete: (announcement: IAnnouncement | null) => void;
}

const AnnouncementsPage: FunctionComponent<AnnouncementsPageProps> = ({ announcements, onSearch, onDelete }) => {
    const navigate = useNavigate();
    const [deleteItemClasses, setDeleteItemClasses] = useState<string>('announcement-delete__container hidden');
    const [currentDrag, setCurrentDrag] = useState<IAnnouncement | null>(null);

    function ctrlClickHandler(announcement: IAnnouncement) {
        navigate('/announcement-website/announcements/edit/' + announcement.id);
    }

    function dragHandler(event: React.DragEvent<HTMLDivElement>, announcement: IAnnouncement) {
        setCurrentDrag(announcement);
        let newClasses = deleteItemClasses.replace(' hidden', '');
        setDeleteItemClasses(newClasses);
    }

    function dragEndHandler(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        let newClasses = deleteItemClasses + ' hidden';
        setDeleteItemClasses(newClasses);
    }

    function dropHandler(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        onDelete(currentDrag);
        let newClasses = deleteItemClasses.replace(' hover', '') + ' hidden';
        setDeleteItemClasses(newClasses);
    }

    function dragOverHandler(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        if (!deleteItemClasses.includes('hover')) {
            let newClasses = deleteItemClasses + ' hover';
            setDeleteItemClasses(newClasses);
        }
    }

    function dragLeaveHandler(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        let newClasses = deleteItemClasses.replace(' hover', '');
        setDeleteItemClasses(newClasses);
    }

    return (
        <div className="announcements">
            <AnnouncementSearchItem onSearch={onSearch} />
            <section className="announcements-page">
                <AnnouncementAddItem onClick={(id: number) => navigate('/announcements/new/' + id)} />
                {announcements.length !== 0 ? (
                    <List
                        items={announcements}
                        renderItem={(announcement: IAnnouncement) => (
                            <AnnouncementItem
                                key={announcement.id}
                                announcement={announcement}
                                onCtrlClick={ctrlClickHandler}
                                onDrag={dragHandler}
                                onDragEnd={dragEndHandler}
                            />
                        )}
                    />
                ) : (
                    <p className="announcements-page__no-results">No announcements</p>
                )}
            </section>
            <AnnouncementDeleteItem
                onDragOver={dragOverHandler}
                classes={deleteItemClasses}
                onDragLeave={dragLeaveHandler}
                onDrop={dropHandler}
            />
        </div>
    );
};

export default AnnouncementsPage;
