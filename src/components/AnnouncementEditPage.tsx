import React, { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IAnnouncement } from '../types/types';

interface AnnouncementEditPageProps {
    announcements: IAnnouncement[];
    onSubmit: (id: number, title: string, body: string) => void;
}

const AnnouncementEditPage: FunctionComponent<AnnouncementEditPageProps> = ({ announcements, onSubmit }) => {
    const [announcement, setAnnouncement] = useState<IAnnouncement | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAnnouncement();
    }, [announcements]);

    function fetchAnnouncement() {
        let matchedAnnouncement;
        matchedAnnouncement = announcements.filter((announcement) => announcement.id === Number(id));
        setAnnouncement(matchedAnnouncement[0]);
    }

    return (
        <div className="announcement-add-page__container">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    onSubmit(announcement!.id, announcement!.title, announcement!.body);
                    navigate('/announcements/');
                }}
            >
                <label className="announcement-add-page__label-for-title" htmlFor="announcementAddTitle">
                    Title:{' '}
                </label>
                <textarea
                    value={announcement?.title}
                    onChange={(event) =>
                        setAnnouncement({ id: announcement!.id, body: announcement!.body, title: event.target.value })
                    }
                    name="announcementAddTitle"
                    id="announcementAddTitle"
                    required
                />
                <label className="announcement-add-page__label-for-body" htmlFor="announcementAddBody">
                    Body:{' '}
                </label>
                <textarea
                    value={announcement?.body}
                    onChange={(event) =>
                        setAnnouncement({ id: announcement!.id, title: announcement!.title, body: event.target.value })
                    }
                    name="announcementAddBody"
                    id="announcementAddBody"
                    required
                />
                <div className="announcement-add-page__buttons-container">
                    <input type="submit" value="Submit" id="announcementAddSubmit" />
                    <button onClick={() => navigate('/announcements/')} id="announcementAddBack">
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AnnouncementEditPage;
