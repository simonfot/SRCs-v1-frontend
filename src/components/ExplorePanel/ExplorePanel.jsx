import React from 'react';
import './ExplorePanel.css';

const mockTopics = [
  {
    id: 1,
    title: 'Climate Change',
    description: 'Latest research and discussions on global climate change',
    sources: 42,
    activity: 'high'
  },
  {
    id: 2,
    title: 'COVID-19 Research',
    description: 'Recent studies and findings about COVID-19',
    sources: 78,
    activity: 'high'
  },
  {
    id: 3,
    title: 'Space Exploration',
    description: 'Updates on space missions and astronomical discoveries',
    sources: 35,
    activity: 'medium'
  },
  {
    id: 4,
    title: 'Artificial Intelligence',
    description: 'Developments in AI research and applications',
    sources: 56,
    activity: 'high'
  },
  {
    id: 5,
    title: 'Renewable Energy',
    description: 'Advancements in renewable energy technologies',
    sources: 28,
    activity: 'medium'
  }
];

const ExplorePanel = ({ width, onHover, onLeave, isActive }) => {
  return (
    <div 
      className={`panel explore-panel ${isActive ? 'active' : ''}`}
      style={{ width }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="panel-inner">
        <h2 className="panel-title">Explore Topics</h2>
        <div className="panel-content">
          <div className="topics-list">
            {mockTopics.map(topic => (
              <div key={topic.id} className="topic-card">
                <h3 className="topic-title">{topic.title}</h3>
                <p className="topic-description">{topic.description}</p>
                <div className="topic-meta">
                  <span className="topic-sources">{topic.sources} sources</span>
                  <span className={`topic-activity ${topic.activity}`}>
                    {topic.activity} activity
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="view-more-button">View More Topics</button>
        </div>
      </div>
    </div>
  );
};

export default ExplorePanel;