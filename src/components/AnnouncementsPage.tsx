import React, { FunctionComponent } from 'react';
import { IAnnouncement } from '../types/types';
import AnnouncementItem from './AnnouncementItem';
import List from './List';
import '../styles/AnnouncementsPage.css';
import AnnouncementAddItem from './AnnouncementAddItem';
import { useNavigate } from 'react-router-dom';
import '../styles/AnnouncementAddPage.css';
import AnnouncementSearchItem from './AnnouncementSearchItem';

interface AnnouncementsPageProps {
    announcements: IAnnouncement[];
    onSearch: (query: string) => void;
}

const AnnouncementsPage: FunctionComponent<AnnouncementsPageProps> = ({ announcements, onSearch }) => {
    const navigate = useNavigate();

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
                                onClick={(announcement: IAnnouncement) =>
                                    navigate('/announcements/edit/' + announcement.id)
                                }
                            />
                        )}
                    />
                ) : (
                    'no result'
                )}
            </section>
        </div>
    );
};

export default AnnouncementsPage;
