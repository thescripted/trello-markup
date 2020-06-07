import React from 'react';

const Header = () => {
  return (
    <div className="header-container">
      <div className="left-header-container">
        <button className="header-home-button">Home</button>
        <button className="header-boards-button">Boards</button>
        <div className="header-search-field">Search Will Be Here...(Coming Soon)</div>
      </div>
      <a href="/" className="header-main-logo f20">Logo</a>
      <div className="right-header-container">
        <button className="header-add-button">Add</button>
        <button className="header-info-button">Info</button>
        <div className="header-user-initial-field">
          <span style={{height: "32px", width: "32px", lineHeight: "32px", fontSize: "14px"}}>BK</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
