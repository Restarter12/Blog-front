import React, { useState } from "react";
import './profile.css';
import defaultAvatar from './../../img/photo-logo.jpg';

const Profile = ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    avatar = defaultAvatar,
    setAvatar,
    saveUserData
}) => {
    const [localData, setLocalData] = useState({
        firstName: firstName,
        lastName: lastName,
        email: email || ""
    });


    React.useEffect(() => {
        setLocalData({
            firstName: firstName,
            lastName: lastName,
            email: email || ""
        });
    }, [firstName, lastName, email]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setFirstName(localData.firstName);
        setLastName(localData.lastName);
        setEmail(localData.email);
        
        if (saveUserData) {
            saveUserData({
                firstName: localData.firstName,
                lastName: localData.lastName,
                email: localData.email
            });
        }
        
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatar(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profile">
            <div className="profile_container">
                <h2 className="profile_name">Профиль</h2>
                <div className="form_container">
                    <form className="profile_form" onSubmit={handleSave}>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Имя"
                            value={localData.firstName}
                            onChange={handleInputChange}
                            className="profile_form-input"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Фамилия"
                            value={localData.lastName}
                            onChange={handleInputChange}
                            className="profile_form-input"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={localData.email}
                            onChange={handleInputChange}
                            className="profile_form-input"
                        />
                        <button type="submit" className="profile_form-btn">
                            Сохранить
                        </button>
                    </form>
                    <div className="profile_avatar-container">
                        <img src={avatar} alt="Аватар" className="profile_avatar-img" />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="edit-image-input"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;