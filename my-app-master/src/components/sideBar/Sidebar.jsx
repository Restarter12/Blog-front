import React from 'react';
import "./sidebar.css";
import sidebarImg from './../../img/logo-sidebar.png';
import photoLogo from './../../img/photo-logo.jpg';
import instagram from './../../img/instagram.svg';
import vk from './../../img/vk.svg';

const Sidebar = ({ firstName, setFirstname, lastName, setLastName, avatar = photoLogo }) => {
  return (
    <div className='sidebar'>
      <div className="container">
        <div className="sidebar_content">
          <img src={sidebarImg} alt="sideLogo" />
          <img className='sidebar-content-photo' src={avatar} alt="Photo" />
          <div className="sidebar_name">
            <span className="sidebar_content-span-name">{firstName}</span>
            <span className="sidebar_content-span-last">{lastName}</span>
          </div>
          <span className="sidebar_content-span-blog">блог front-end разработчика</span>
          <ul className="sidebar_content-social-list">
            <button>
              <li className='sidebar_content-social-item'>
                <img src={instagram} alt="" />
              </li></button>
            <button>
              <li className='sidebar_content-social-item'>
                <img src={vk} alt="" />
              </li>
            </button>
          </ul>
          <span className="sidebar_content-about">
            Front-end разработчик. Практик верстки сайтов.
            Созданием сайтов занимаюсь с 2022 года.
          </span>
          <div className="sidebar_content-button">
            <button className='sidebar_content-button-work'>Мои работы</button>
            <button className='sidebar_content-button-chat'>Написать мне</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;