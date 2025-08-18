import React, { useState } from 'react';
import './header.css';
import MySelect from '../UI/select/MySelect';

export const Header = ({ onSearch, onSort, selectedSort }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearch(value);
    };

    return (
        <header className='header'>
            <div className="header_container">
                <nav className="header_container-nav">
                    <div className="header_container-nav-left">
                        <button className='header_container-nav-a'>Главная</button>
                        <MySelect
                            value={selectedSort}
                            onChange={onSort}
                            defaultValue="Статьи"
                            options={[
                                { value: "title", name: "По названию" },
                                { value: "createdAt", name: "По дате" }
                            ]}
                        />
                        <button className='header_container-nav-a'>Обо мне</button>
                        <button className='header_container-nav-a'>Реклама</button>
                    </div>
                    <div className="header_container-nav-right">
                        <button className='header_container-nav-a'>Профиль</button>
                        <input
                            className='header_container-nav-right-input'
                            placeholder='Поиск по блогу'
                            value={searchValue}
                            onChange={handleSearchChange}
                            type="text"
                        />
                    </div>
                </nav>
            </div>
        </header>
    );
};