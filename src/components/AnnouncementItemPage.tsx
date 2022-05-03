import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IAnnouncement } from '../types/types';
import AnnouncementItem from './AnnouncementItem';
import List from './List';
import '../styles/AnnouncementItemPage.css';

interface AnnouncementItemPageProps {
    announcements: IAnnouncement[];
}

export default function AnnouncementItemPage({ announcements }: AnnouncementItemPageProps) {
    const [announcement, setAnnouncement] = useState<IAnnouncement | null>(null);
    const [relatedAnnouncements, setRelatedAnnouncements] = useState<IAnnouncement[]>([]);
    const { id } = useParams();
    const date = announcement?.id ? new Date(announcement.id) : '';

    useEffect(() => {
        getAnnouncement();
        getRelatedAnnouncements();
    }, [announcements, announcement, id]);

    function getAnnouncement() {
        let matchedAnnouncement = announcements.filter((announcement) => announcement.id === Number(id));
        setAnnouncement(matchedAnnouncement[0]);
    }
    function getRelatedAnnouncements() {
        let eachWordFromAnAnnouncement =
            announcement?.title.toLowerCase().split(' ') + ' ' + announcement?.body.toLowerCase().split(' ');
        if (eachWordFromAnAnnouncement !== undefined) {
            let newRelatedAnnouncements = announcements.filter((announce) => {
                if (announce.id !== announcement?.id) {
                    for (let i = 0; i < eachWordFromAnAnnouncement!.length; i++) {
                        return (
                            announce.title.toLowerCase().includes(eachWordFromAnAnnouncement![i]) ||
                            announce.body.toLowerCase().includes(eachWordFromAnAnnouncement![i])
                        );
                    }
                }
            });
            setRelatedAnnouncements(newRelatedAnnouncements.slice(0, 3));
        }
    }

    return (
        <div className="announcement-item-page__container">
            <div className="announcement-item-page__item-page item-page">
                <h2 className="item-page__title">{announcement?.title}</h2>
                <p className="item-page__body">{announcement?.body}</p>
                <div className="item-page__date">
                    Announcement created: <br />
                    {date.toString()}
                </div>
            </div>
            <div className="announcement-item-page__related item-page-related">
                <hr className="item-page-related__horizontal-line" />
                <h3 className="item-page-related__header">Similar announcements:</h3>
                <div className="item-page-related__similar-announcements">
                    {relatedAnnouncements.length !== 0 ? (
                        <List
                            items={relatedAnnouncements}
                            renderItem={(announcement) => (
                                <AnnouncementItem key={announcement.id} announcement={announcement} draggable={false} />
                            )}
                        />
                    ) : (
                        <p className="item-page-related__text">no similar announcements</p>
                    )}
                </div>
            </div>
        </div>
    );
}
