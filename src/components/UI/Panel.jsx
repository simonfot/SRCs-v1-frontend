import React from 'react';

const Panel = ({ 
  width, 
  onHover, 
  onLeave, 
  isActive, 
  title,
  subtitle,
  children,
  className = '',
  decorationType = 'default'
}) => {
  // Geometric decoration elements based on type
  const renderGeometricDecor = () => {
    switch (decorationType) {
      case 'trees':
        return (
          <div className="geometric-decor">
            <div className="geo-tree"></div>
            <div className="geo-tree"></div>
            <div className="geo-tree"></div>
          </div>
        );
      case 'cubes':
        return (
          <div className="geometric-decor">
            <div className="geo-cube"></div>
            <div className="geo-cube small"></div>
          </div>
        );
      case 'pyramids':
        return (
          <div className="geometric-decor">
            <div className="geo-pyramid"></div>
            <div className="geo-pyramid small"></div>
            <div className="geo-pyramid"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={`panel ${isActive ? 'active' : ''} ${className}`}
      style={{ width }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="grid-background"></div>
      
      <div className="content-container">
        {title && <h2 className="panel-title">{title}</h2>}
        {subtitle && <h3 className="panel-subtitle">{subtitle}</h3>}
        
        <div className="panel-content">
          {children}
        </div>
      </div>
      
      {renderGeometricDecor()}
    </div>
  );
};

export default Panel;