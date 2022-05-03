import React, { useEffect, useState } from 'react';
import AnnouncementsPage from './components/AnnouncementsPage';
import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import AnnouncementAddPage from './components/AnnouncementAddPage';
import { IAnnouncement } from './types/types';
import axios from 'axios';
import Context from './context';
import WelcomePage from './components/WelcomePage';
import AnnouncementEditPage from './components/AnnouncementEditPage';
import Footer from './components/Footer';
import AnnouncementItemPage from './components/AnnouncementItemPage';

function App() {
    const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);
    const [searchResults, setSearchResults] = useState<{ query: string; searchResults: IAnnouncement[] }>({
        query: '',
        searchResults: [],
    });

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    useEffect(() => {
        searchHandler(searchResults.query);
    }, [announcements]);

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

    function deleteAnnouncementHandler(announcement: IAnnouncement | null) {
        let newAnnouncements = announcements.filter((item) => item.id !== announcement?.id);
        setAnnouncements(newAnnouncements);
    }

    return (
        <div className="wrapper">
            <Context.Provider value={announcements}>
                <BrowserRouter>
                    <div className="page-links">
                        <NavLink to={''} className="page-links__link">
                            Home
                        </NavLink>
                        <NavLink to={'/announcements/'} className="page-links__link">
                            List of Announcements
                        </NavLink>
                    </div>
                    <Routes>
                        <Route path="" element={<WelcomePage />} />
                        <Route
                            path="/announcements"
                            element={
                                <AnnouncementsPage
                                    announcements={searchResults.query ? searchResults.searchResults : announcements}
                                    onSearch={searchHandler}
                                    onDelete={deleteAnnouncementHandler}
                                />
                            }
                        />
                        <Route
                            path="/announcements/:id"
                            element={<AnnouncementItemPage announcements={announcements} />}
                        />
                        <Route
                            path="/announcements/new/:id"
                            element={<AnnouncementAddPage onSubmit={submitAddHandler} />}
                        />
                        <Route
                            path="/announcements/edit/:id"
                            element={
                                <AnnouncementEditPage announcements={announcements} onSubmit={submitEditHandler} />
                            }
                        />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </Context.Provider>
        </div>
    );
}

export default App;
