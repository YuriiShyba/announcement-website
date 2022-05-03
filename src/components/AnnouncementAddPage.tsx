import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type AnnouncementAddPageParams = {
    id: string;
};

interface AnnouncementAddPageProps {
    onSubmit: (id: string | undefined, title: string, body: string) => void;
}

export default function AnnouncementAddPage({ onSubmit }: AnnouncementAddPageProps) {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const { id } = useParams<AnnouncementAddPageParams>();
    const navigate = useNavigate();

    return (
        <div className="announcement-add-page__container">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    onSubmit(id, title, body);
                    navigate('/announcement-website/announcements/');
                }}
            >
                <label className="announcement-add-page__label-for-title" htmlFor="announcementAddTitle">
                    Title:{' '}
                </label>
                <textarea
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    name="announcementAddTitle"
                    id="announcementAddTitle"
                    required
                />
                <label className="announcement-add-page__label-for-body" htmlFor="announcementAddBody">
                    Body:{' '}
                </label>
                <textarea
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    name="announcementAddBody"
                    id="announcementAddBody"
                    required
                />
                <div className="announcement-add-page__buttons-container">
                    <input type="submit" value="Submit" id="announcementAddSubmit" />
                    <button onClick={() => navigate('/announcement-website/announcements/')} id="announcementAddBack">
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
}
