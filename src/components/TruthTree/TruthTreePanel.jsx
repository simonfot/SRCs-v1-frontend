import React from 'react';
import TruthTree from './TruthTree';
import NodeDetails from './NodeDetails';
import './TruthTreePanel.css';

const TruthTreePanel = ({ width, onHover, onLeave, isActive }) => {
  const [selectedNode, setSelectedNode] = React.useState(null);

  return (
    <div 
      className={`panel truth-tree-panel ${isActive ? 'active' : ''}`}
      style={{ width }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="panel-inner">
        <h2 className="panel-title">Truth Tree</h2>
        <div className="panel-content">
          <TruthTree onNodeSelect={setSelectedNode} />
          
          {selectedNode && (
            <NodeDetails 
              node={selectedNode} 
              onClose={() => setSelectedNode(null)} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TruthTreePanel;