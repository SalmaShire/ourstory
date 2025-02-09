import React from 'react';
import { Link } from 'react-router-dom';  
import './NavBar.css';
import homeIcon from '../../assets/home.png';
import communityIcon from '../../assets/group.png';
import profileIcon from '../../assets/profile.png';

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-item">
        <img src={homeIcon} alt="Home" className="nav-icon" />
        <span>Home</span>
      </Link>
      <Link to="/community" className="nav-item"> 
        <img src={communityIcon} alt="Community" className="nav-icon" />
        <span>Community</span>
      </Link>
      <Link to="/profile" className="nav-item">
        <img src={profileIcon} alt="Profile" className="nav-icon" />
        <span>Profile</span>
      </Link>
    </nav>
  );
}

export default NavBar;
