import React from "react";
import './stories.css';


const StoryItem = ({story, onClick}) => {
    return(
        <div
            className={`story-item ${story.viewed ? 'viewed' : ''}`}
            onClick={onClick}
        >
            <div className="story-avatar-wrapper">
                <img src={story.avatar} alt={story.username} className="story-avatar" />
            </div>
            <span className="story-username">{story.username}</span>
        </div>
    );
};

export default StoryItem;