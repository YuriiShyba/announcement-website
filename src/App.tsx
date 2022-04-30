import React from 'react';
import AnnouncementsPage from './components/AnnouncementsPage';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AnnouncementAddPage from './components/AnnouncementAddPage';
import AnnouncementsRouter from './components/AnnouncementsRouter';

function App() {
    return (
        <div className="wrapper">
            <AnnouncementsRouter />
        </div>
    );
}

export default App;
