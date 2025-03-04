import React from 'react';
import './TopicNav.css';

const topics = [
  { id: 1, name: 'Politics', active: true },
  { id: 2, name: 'Technology', active: false },
  { id: 3, name: 'Science', active: false },
  { id: 4, name: 'Health', active: false },
  { id: 5, name: 'Environment', active: false },
  { id: 6, name: 'Economy', active: false },
  { id: 7, name: 'Sports', active: false },
  { id: 8, name: 'Entertainment', active: false }
];

const TopicNav = () => {
  return (
    <div className="topic-nav">
      <div className="topic-nav-container">
        {topics.map(topic => (
          <button 
            key={topic.id} 
            className={`topic-button ${topic.active ? 'active' : ''}`}
          >
            {topic.name}
          </button>
        ))}
        <button className="topic-button more">More Topics +</button>
      </div>
    </div>
  );
};

export default TopicNav;