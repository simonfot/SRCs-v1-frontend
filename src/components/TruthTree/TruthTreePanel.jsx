import React, { useState } from 'react';
import Panel from '../UI/Panel';
import TruthTreeViz from './TruthTreeViz';
import NodeDetails from './NodeDetails';
import { mockTruthTreeData } from '../../data/mockTruthTreeData';

const TruthTreePanel = ({ width, onHover, onLeave, isActive }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  
  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };
  
  const handleCloseDetails = () => {
    setSelectedNode(null);
  };
  
  return (
    <Panel
      width={width}
      onHover={onHover}
      onLeave={onLeave}
      isActive={isActive}
      className="truth-tree-panel"
      decorationType="cubes"
    >
      <div className="truth-tree-header">
        <h3>Truth Tree</h3>
        <p className="truth-tree-description">
          Explore connections and verify information through an interactive visualization.
        </p>
      </div>
      
      <div className="truth-tree-content">
        <TruthTreeViz 
          data={mockTruthTreeData} 
          onNodeClick={handleNodeClick} 
        />
        
        {selectedNode && (
          <NodeDetails 
            node={selectedNode} 
            onClose={handleCloseDetails} 
          />
        )}
      </div>
      
      <div className="truth-tree-footer">
        <div className="legend">
          <div className="legend-item">
            <span className="legend-dot verified"></span>
            <span>Verified</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot unverified"></span>
            <span>Unverified</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot disputed"></span>
            <span>Disputed</span>
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default TruthTreePanel;