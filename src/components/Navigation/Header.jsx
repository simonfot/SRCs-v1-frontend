import React from 'react';

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
              <a href="#stractivors" className="nav-link">Stractivors</a>
            </li>
            <li className="nav-item">
              <a href="#hope" className="nav-link">Hope</a>
            </li>
            <li className="nav-item">
              <a href="#coweeting" className="nav-link">Coweeting</a>
            </li>
            <li className="nav-item">
              <a href="#latest" className="nav-link">Latest Stories</a>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="header-right">
        <div className="search-icon">
          <span className="icon">🔍</span>
        </div>
      </div>
    </header>
  );
};

export default Header;