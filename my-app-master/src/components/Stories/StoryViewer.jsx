import React, { useState, useEffect, useRef } from 'react';
import './stories.css';

const StoryViewer = ({ story, onClose }) => {
    // Текущий индекс элемента (фото/видео) в истории
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    // Прогресс заполнения полоски (0-100)
    const [progress, setProgress] = useState(0);
    // Реф для хранения таймера
    const timerRef = useRef();
    // Текущий отображаемый элемент
    const currentItem = story.items[currentItemIndex];

    // Эффект для запуска/остановки таймера
    useEffect(() => {
        startProgressTimer();
        return () => {
            clearTimeout(timerRef.current);
        };
    }, [currentItemIndex]);

    // Функция запуска таймера прогресса
    const startProgressTimer = () => {
        setProgress(0);
        const startTime = Date.now();
        const duration = currentItem.duration;

        // Функция обновления прогресса
        const updateProgress = () => {
            const elapsed = Date.now() - startTime;

            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);


            if (newProgress < 100) {
                timerRef.current = requestAnimationFrame(updateProgress);
            } else {
                nextItem();
            }
        };

        // Запускаем анимацию
        timerRef.current = requestAnimationFrame(updateProgress);

    };

    const nextItem = () => {
        if (currentItemIndex < story.items.length - 1) {
            
            setCurrentItemIndex(currentItemIndex + 1);
        } else {
            
            onClose();
        }
    };

    const prevItem = () => {
        if (currentItemIndex > 0) {
            setCurrentItemIndex(currentItemIndex - 1);
        }
    };

    return (
        // Оверлей (фон затемнения)
        <div className="story-viewer-overlay">
            {}
            <div className="story-viewer">
                {}
                <div className="story-progress-container">
                    {story.items.map((_, index) => (
                        // Трек для каждой полоски
                        <div key={index} className="story-progress-track">
                            {}
                            <div
                                className={`story-progress-bar ${index === currentItemIndex ? 'active' : ''}`}
                                style={{
                                    width: index === currentItemIndex ? `${progress}%` :
                                        index < currentItemIndex ? '100%' : '0%'
                                }}
                            />
                        </div>
                    ))}
                </div>

                {}
                <div className="story-content">
                    {currentItem.type === 'image' ? (
                        // Если изображение
                        <img src={currentItem.url} alt="Story" />
                    ) : (
                        // Если видео
                        <video src={currentItem.url} autoPlay muted />
                    )}
                </div>

                {/* Невидимые кликабельные зоны для навигации */}
                <div className="story-nav">
                    <div className="story-nav-left" onClick={prevItem}></div>
                    <div className="story-nav-right" onClick={nextItem}></div>
                </div>

                {/* Кнопка закрытия */}
                <button className="story-close-btn" onClick={onClose}>×</button>
            </div>
        </div>
    );
};

export default StoryViewer;


