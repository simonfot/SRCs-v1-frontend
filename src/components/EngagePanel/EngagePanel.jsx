import React from 'react';
import './EngagePanel.css';

const mockStories = [
  {
    id: 1,
    title: 'New research reveals promising climate mitigation strategies',
    source: 'Scientific American',
    timestamp: '2 hours ago',
    trustScore: 92,
    discussions: 24
  },
  {
    id: 2,
    title: 'Tech giants announce joint initiative for AI safety standards',
    source: 'Tech Chronicle',
    timestamp: '6 hours ago',
    trustScore: 87,
    discussions: 48
  },
  {
    id: 3,
    title: 'Global health report highlights pandemic preparedness gaps',
    source: 'Health Times',
    timestamp: '12 hours ago',
    trustScore: 95,
    discussions: 36
  },
  {
    id: 4,
    title: 'Analysis: Economic impacts of renewable energy transition',
    source: 'Economy Today',
    timestamp: '1 day ago',
    trustScore: 88,
    discussions: 32
  },
  {
    id: 5,
    title: 'New space telescope reveals unprecedented images of distant galaxies',
    source: 'Astronomy Now',
    timestamp: '1 day ago',
    trustScore: 90,
    discussions: 42
  }
];

const EngagePanel = ({ width, onHover, onLeave, isActive }) => {
  return (
    <div 
      className={`panel engage-panel ${isActive ? 'active' : ''}`}
      style={{ width }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="panel-inner">
        <h2 className="panel-title">Latest Stories</h2>
        <div className="panel-content">
          <div className="stories-list">
            {mockStories.map(story => (
              <div key={story.id} className="story-card">
                <h3 className="story-title">{story.title}</h3>
                <div className="story-meta">
                  <span className="story-source">{story.source}</span>
                  <span className="story-timestamp">{story.timestamp}</span>
                </div>
                <div className="story-stats">
                  <div className="trust-score">
                    <span className="score-label">Trust Score</span>
                    <div className="score-value">
                      <span className="score-number">{story.trustScore}</span>
                      <div className="score-bar" style={{ width: `${story.trustScore}%` }}></div>
                    </div>
                  </div>
                  <span className="discussions-count">{story.discussions} discussions</span>
                </div>
              </div>
            ))}
          </div>
          <button className="view-more-button">View More Stories</button>
        </div>
      </div>
    </div>
  );
};

export default EngagePanel;