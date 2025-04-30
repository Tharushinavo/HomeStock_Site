import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import logo from '../logo.jpg';

function Header() {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="/" aria-label="Home Page">
          <img
            src={logo}
            alt="System Logo"
            width="100"
            height="80"
            className="me-2"
          />
          <span className="header-title">GROCIFY</span>
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNavAltMarkup" 
          aria-controls="navbarNavAltMarkup" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" href="/">Home</a>
            <a className="nav-link" href="/item">Grocery List</a>
            <a className="nav-link" href="/inventory">Inventory</a>
            <button className="nav-link disabled" disabled>Meal Planner</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
