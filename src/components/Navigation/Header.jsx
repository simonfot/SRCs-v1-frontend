import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-left">
        <div className="logo">
          <h1>SRCS</h1>
        </div>
        
        <nav className="main-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#topics" className="nav-link active">Topics</a>
            </li>
            <li className="nav-item">
              <a href="#sources" className="nav-link">Sources</a>
            </li>
            <li className="nav-item">
              <a href="#verify" className="nav-link">Verify</a>
            </li>
            <li className="nav-item">
              <a href="#discussions" className="nav-link">Discussions</a>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="header-right">
        <div className="search-bar">
          <input type="text" placeholder="Search topics, sources..." />
          <button className="search-button">🔍</button>
        </div>
        <div className="user-menu">
          <button className="user-button">Sign In</button>
        </div>
      </div>
    </header>
  );
};

export default Header;