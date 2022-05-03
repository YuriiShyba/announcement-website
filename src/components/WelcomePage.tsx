import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import '../styles/WelcomePage.css';

interface WelcomePageProps {}

const WelcomePage: FunctionComponent<WelcomePageProps> = () => {
    return (
        <div className="welcome-page__container">
            <h1>Welcome to my Announcement Website!</h1>
            <Link to={'/announcements/'} className="welcome-page__button">
                Show Announcements
            </Link>
        </div>
    );
};

export default WelcomePage;
