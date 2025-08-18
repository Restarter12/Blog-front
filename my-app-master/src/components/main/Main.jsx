import React, { useState } from 'react';
import './main.css';
import camera from './../../img/camera.svg';
import send from './../../img/send.svg';

export const Main = ({ posts, setPosts }) => {
    const [title, setTitle] = useState(""); 
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [showTitleInput, setShowTitleInput] = useState(false); 

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const addNewPost = (e) => {
        e.preventDefault();
        if (!body.trim() && !image) return;
        
        const newPost = {
            id: Date.now(),
            title: title.trim() || "Без названия", 
            body,
            image,
            createdAt: new Date().toLocaleString()
        };

        setPosts(prev => [...prev, newPost]);
        setTitle("");
        setBody("");
        setImage(null);
        setShowTitleInput(false);
        document.getElementById('imageInput').value = "";
    };

    const toggleTitleInput = () => {
        setShowTitleInput(!showTitleInput);
    };

    return (
        <main className="main">
            <div className="main_container">
                <div className="main_content">
                    <form className="main_content-input-container" onSubmit={addNewPost}>
                        <div className="input-wrapper">
                            <button 
                                type="button" 
                                className="add-title-btn"
                                onClick={toggleTitleInput}
                            >
                                {showTitleInput ? 'Скрыть заголовок' : '+ Добавить заголовок'}
                            </button>
                            
                            {showTitleInput && (
                                <input
                                    className='main_content-input title-input'
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder='Введите заголовок'
                                />
                            )}
                            
                            <input
                                className='main_content-input'
                                type="text"
                                value={body}
                                onChange={e => setBody(e.target.value)}
                                placeholder='Напишите что-нибудь'
                            />
                            
                            <div className="buttons-container">
                                <label htmlFor="imageInput" className="file-upload-btn">
                                    <div className="buttons_img-camera">
                                        <img src={camera} alt="Добавить изображение" />
                                    </div>
                                    <input
                                        id="imageInput"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className='main_content-image-input'
                                    />
                                </label>
                                <button
                                    type="submit"
                                    disabled={!body.trim() && !image}
                                    className='main_content-input-btn'
                                >
                                    <img src={send} alt="Отправить" />
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="posts-list">
                        {posts.length === 0 ? (
                            <h1 className='posts-list-empty'>Посты не найдены</h1>
                        ) : (
                            posts.map(post => (
                                <div key={post.id} className="post">
                                    {post.image && (
                                        <img
                                            src={post.image}
                                            alt="Post content"
                                            className="post-image"
                                        />
                                    )}
                                    <div className="post_title-text">
                                        {post.title && post.title !== "Без названия" && (
                                            <h3 className='post-title'>{post.title}</h3>
                                        )}
                                        {post.body && <p className='post-body'>{post.body}</p>}
                                        <small className='post-date'>{post.createdAt}</small>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};