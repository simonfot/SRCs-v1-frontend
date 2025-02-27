import React, { useState } from 'react';
import Header from './components/Navigation/Header';
import TopicNav from './components/Navigation/TopicNav';
import ExplorePanel from './components/ExplorePanel/ExplorePanel';
import TruthTreePanel from './components/TruthTree/TruthTreePanel';
import EngagePanel from './components/EngagePanel/EngagePanel';
import './styles/global.css';

const App = () => {
  const [activePanel, setActivePanel] = useState(null);
  
  // Panel width calculations based on active state
  const getPanelWidth = (panelName) => {
    if (!activePanel) return '33.33%'; // Equal width when no panel is active
    return activePanel === panelName ? '60%' : '20%'; // 60% for active, 20% for inactive
  };

  return (
    <div className="srcs-app">
      <Header />
      <TopicNav />
      
      <div className="panels-container">
        <ExplorePanel 
          width={getPanelWidth('explore')}
          onHover={() => setActivePanel('explore')}
          onLeave={() => setActivePanel(null)}
          isActive={activePanel === 'explore'}
        />
        
        <TruthTreePanel 
          width={getPanelWidth('truth-tree')}
          onHover={() => setActivePanel('truth-tree')}
          onLeave={() => setActivePanel(null)}
          isActive={activePanel === 'truth-tree'}
        />
        
        <EngagePanel 
          width={getPanelWidth('engage')}
          onHover={() => setActivePanel('engage')}
          onLeave={() => setActivePanel(null)}
          isActive={activePanel === 'engage'}
        />
      </div>
    </div>
  );
};

export default App;