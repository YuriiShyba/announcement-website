import React, { ChangeEvent, useEffect, useState } from 'react';
import '../styles/AnnouncementSearchItem.css';

interface AnnouncementSearchItemProps {
    onSearch: (query: string) => void;
}

export default function AnnouncementSearchItem({ onSearch }: AnnouncementSearchItemProps) {
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        onSearch(value.toLowerCase());
    }, [value]);

    function changeHandler(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    return (
        <div className="announcement-page__search">
            <input
                className="dark"
                placeholder="Search by title"
                type="search"
                value={value}
                onChange={changeHandler}
            />
        </div>
    );
}
