import React from 'react';

const TopicNav = () => {
  return (
    <div className="topic-nav">
      <ul className="topic-tabs">
        <li className="topic-tab active">
          <a href="#meroe">Meroe</a>
        </li>
        <li className="topic-tab">
          <a href="#topics">Topics</a>
        </li>
        <li className="topic-tab">
          <a href="#nowens">Nowens</a>
        </li>
        <li className="topic-tab">
          <a href="#rades">Rades</a>
        </li>
      </ul>
    </div>
  );
};

export default TopicNav;