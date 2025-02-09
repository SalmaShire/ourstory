import React from 'react';
import './NavBar.css';
import homeIcon from '../../assets/home.png';
import communityIcon from '../../assets/group.png';
import profileIcon from '../../assets/profile.png';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-item selected">
        <img src={homeIcon} alt="Home" className="nav-icon" />
        <span>Home</span>
      </div>
      <div className="nav-item">
        <img src={communityIcon} alt="Community" className="nav-icon" />
        <span>Community</span>
      </div>
      <div className="nav-item">
        <img src={profileIcon} alt="Profile" className="nav-icon" />
        <span>Profile</span>
      </div>
    </nav>
  );
}

export default NavBar;
