import axios from 'axios';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Context from '../context';
import { IAnnouncement } from '../types/types';
import AnnouncementAddPage from './AnnouncementAddPage';
import AnnouncementEditPage from './AnnouncementEditPage';
import AnnouncementsPage from './AnnouncementsPage';

interface AnnouncementsRouterProps {}

const AnnouncementsRouter: FunctionComponent<AnnouncementsRouterProps> = () => {
    const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);
    const [searchResults, setSearchResults] = useState<{ query: string; searchResults: IAnnouncement[] }>({
        query: '',
        searchResults: [],
    });

    useEffect(() => {
        fetchAnnouncements();
    }, []);
    //

    async function fetchAnnouncements() {
        try {
            const response = await axios.get<IAnnouncement[]>('https://jsonplaceholder.typicode.com/posts?_limit=6');
            setAnnouncements(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    function submitAddHandler(id: string | undefined, title: string, body: string) {
        let newAnnouncements = [...announcements];
        newAnnouncements.push({ id: Number(id), title, body });
        setAnnouncements(newAnnouncements);
    }

    function submitEditHandler(id: number, title: string, body: string) {
        let newAnnouncements;
        title = title.replace(/(\n+)|(\s+)/g, ' ').trim();
        body = body.replace(/(\n+)|(\s+)/g, ' ').trim();
        newAnnouncements = announcements.map((announcement) => {
            return announcement.id === id ? { id, title, body } : announcement;
        });
        setAnnouncements(newAnnouncements);
    }

    function searchHandler(query: string) {
        let searchResults;
        searchResults = announcements.filter((announcement) => {
            if (announcement.title.toLowerCase().includes(query)) {
                return announcement;
            }
        });
        setSearchResults({ query, searchResults });
    }

    return (
        <Context.Provider value={announcements}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/announcements"
                        element={
                            <AnnouncementsPage
                                announcements={searchResults.query ? searchResults.searchResults : announcements}
                                onSearch={searchHandler}
                            />
                        }
                    />
                    <Route
                        path="/announcements/new/:id"
                        element={<AnnouncementAddPage onSubmit={submitAddHandler} />}
                    />
                    <Route
                        path="/announcements/edit/:id"
                        element={<AnnouncementEditPage announcements={announcements} onSubmit={submitEditHandler} />}
                    />
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    );
};

export default AnnouncementsRouter;
