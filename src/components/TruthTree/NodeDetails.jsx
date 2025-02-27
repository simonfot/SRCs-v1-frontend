import React from 'react';

const NodeDetails = ({ node, onClose }) => {
  let statusClass = 'status-unknown';
  
  switch (node.status) {
    case 'verified':
      statusClass = 'status-verified';
      break;
    case 'unverified':
      statusClass = 'status-unverified';
      break;
    case 'disputed':
      statusClass = 'status-disputed';
      break;
    default:
      statusClass = 'status-unknown';
  }
  
  return (
    <div className="node-details-overlay">
      <div className="node-details-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="node-details-header">
          <h3 className="node-title">{node.title}</h3>
          <span className={`node-status ${statusClass}`}>
            {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
          </span>
        </div>
        
        <div className="node-details-body">
          <p className="node-description">{node.description}</p>
          
          <div className="node-type-info">
            <h4>Type</h4>
            <p>{node.type.charAt(0).toUpperCase() + node.type.slice(1)}</p>
          </div>
          
          <div className="node-connections">
            <h4>Connections</h4>
            <p>This node has connections to other sources in the Truth Tree.</p>
            <button className="view-connections-btn">View in Truth Tree</button>
          </div>
          
          <div className="node-discussions">
            <h4>Discussions</h4>
            <div className="discussion-items">
              <div className="discussion-item">
                <span className="discussion-author">User123</span>
                <p className="discussion-text">This source seems reliable based on the methodology used.</p>
              </div>
              <div className="discussion-item">
                <span className="discussion-author">Researcher45</span>
                <p className="discussion-text">I've cross-referenced this with other studies and the findings align.</p>
              </div>
            </div>
            <textarea 
              className="discussion-input" 
              placeholder="Add your thoughts on this source..."
            ></textarea>
            <button className="post-discussion-btn">Post</button>
          </div>
        </div>
        
        <div className="node-details-footer">
          <button className="highlight-btn">Highlight Content</button>
          <button className="connect-btn">Connect to Source</button>
        </div>
      </div>
    </div>
  );
};

export default NodeDetails;