import React, { useState } from 'react';
import StoryItem from './StoryItem';
import StoryViewer from './StoryViewer';
import "./stories.css";

import avatar1 from './../../img/photo-logo.jpg';
import storyPhoto1 from './../../img/photo-logo.jpg';
import video from './../../img/videoOne.mp4';



const Stories = () => {
    const [stories, setStories] = useState([
        {
            id: 1,
            username: 'Askhab',
            avatar: avatar1,
            items: [
                {
                    id: 1,
                    type: 'image',
                    url: storyPhoto1,
                    duration: 5000
                },
                {
                    id: 2,
                    type: 'video',
                    url: video,
                    duration: 5000
                }
            ],
            viewed: false
        },
        {
            id: 2,
            username: 'Askhab',
            avatar: avatar1,
            items: [
                {
                    id: 2,
                    type: 'video',
                    url: video,
                    duration: 5000
                }
            ],
            viewed: false
        }
    ]);
    // Текущая открытая история (null если закрыто)
    const [currentStory, setCurrentStory] = useState(null);

    // Функция открытия истории
    const openStory = (story) => {
        setCurrentStory(story); // Устанавливаем текущую историю
        // Помечаем как просмотренную
        setStories(prev => prev.map(s =>
            s.id === story.id ? { ...s, viewed: true } : s
        ));
    };

    // Функция закрытия
    const closeStory = () => {
        setCurrentStory(null); // Сбрасываем текущую историю
    };

    // Рендер компонента
    return (
        // Основной контейнер
        <div className="stories-container">
            {/* Список кружков историй */}
            <div className="stories-list">
                {stories.map(story => (
                    <StoryItem
                        key={story.id} // Ключ для оптимизации рендера
                        story={story} // Данные истории
                        onClick={() => openStory(story)} // Обработчик клика
                    />
                ))}
            </div>

            {/* Если есть currentStory - показываем Viewer */}
            {currentStory && (
                <StoryViewer
                    story={currentStory} // Передаем историю
                    onClose={closeStory} // Функция закрытия
                />
            )}
        </div>
    );
};

export default Stories;