import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './page.css';
import './../main/main.css';

const PostPage = ({ posts, setPosts }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = posts.find(post => post.id === Number(id));
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState("");
    const [editedPost, setEditedPost] = useState({
        title: post?.title || '',
        body: post?.body || '',
        image: post?.image || null
    });

    if (!post) {
        return <div className="post-not-found">Пост не найден</div>;
    }

    const handleInput = (etar) => {
        setValue(etar.target.value);
    }

    const handleDelete = (postId) => {
        if (window.confirm('Вы уверены, что хотите удалить этот пост?')) {
            setPosts(posts.filter(post => post.id !== postId));
            navigate('/');
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedPost(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedPost(prev => ({
                    ...prev,
                    image: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        const updatedPosts = posts.map(p =>
            p.id === Number(id) ? { ...p, ...editedPost } : p
        );
        setPosts(updatedPosts);
        setIsEditing(false);
    };

    return (
        <div className="post-page">
            <div className="post-page-container">
                <button onClick={() => navigate(-1)} className="back-button">
                    ← Назад
                </button>

                {isEditing ? (
                    <div className="edit-form">
                        <input
                            type="text"
                            name="title"
                            value={editedPost.title}
                            onChange={handleInputChange}
                            placeholder="Заголовок"
                            className="edit-input"
                        />
                        <textarea
                            name="body"
                            value={editedPost.body}
                            onChange={handleInputChange}
                            placeholder="Текст статьи"
                            className="edit-textarea"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="edit-image-input"
                        />
                        <div className="edit-buttons">
                            <button onClick={handleSave} className="save-button">
                                Сохранить
                            </button>
                            <button onClick={() => setIsEditing(false)} className="cancel-button">
                                Отмена
                            </button>
                            <button onClick={() => handleDelete(post.id)}>Удалить Пост</button>
                        </div>
                    </div>
                ) : (
                    <div className="post-content">
                        {post.title && <h1 className="post-title">{post.title}</h1>}
                        <p className="post-body">{post.body}</p>
                        <small className="post-date">{post.createdAt}</small>
                    </div>
                )}

                <div className="post-container">
                    {post.image && (
                        <img
                            src={post.image}
                            alt="Post content"
                            className="post-image"
                        />
                    )}
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className='btn_redactor'
                    >
                        {isEditing ? 'Отменить редактирование' : 'Редактировать'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostPage;