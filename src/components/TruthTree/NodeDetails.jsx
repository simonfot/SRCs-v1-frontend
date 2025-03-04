import React from 'react';
import './NodeDetails.css';

const NodeDetails = ({ node, onClose }) => {
  if (!node) return null;
  
  return (
    <div className="node-details">
      <div className="node-details-header">
        <h3>Source Details</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <div className="node-details-content">
        <h4>{node.name}</h4>
        
        {node.credibility && (
          <div className="credibility-tag" data-credibility={node.credibility}>
            {node.credibility.charAt(0).toUpperCase() + node.credibility.slice(1)} Credibility
          </div>
        )}
        
        <div className="details-section">
          <h5>Description</h5>
          <p>
            {node.description || "No detailed description available for this source."}
          </p>
        </div>
        
        {node.metadata && (
          <div className="details-section">
            <h5>Source Metadata</h5>
            <ul className="metadata-list">
              {Object.entries(node.metadata).map(([key, value]) => (
                <li key={key}>
                  <span className="metadata-key">{key}:</span> {value}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {node.references && node.references.length > 0 && (
          <div className="details-section">
            <h5>References</h5>
            <ul className="references-list">
              {node.references.map((ref, index) => (
                <li key={index}>
                  <a href={ref.url} target="_blank" rel="noopener noreferrer">
                    {ref.title || ref.url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="action-buttons">
          <button className="action-button view-source">View Full Source</button>
          <button className="action-button add-highlight">Add Highlight</button>
        </div>
      </div>
    </div>
  );
};

export default NodeDetails;