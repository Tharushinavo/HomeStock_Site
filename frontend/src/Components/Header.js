import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'; // Custom CSS for the header (you can add styling here)

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Use a button if you don't need navigation */}
        <a className="navbar-brand" href="/" aria-label="Home Page">
          <img
            src="/images/logo12.jpg"
            alt="System Logo"
            width="100"
            height="80"
            className="me-2"
          />
          <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>GROCIFY</span>
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
            {/* Update the links with actual paths */}
            <a className="nav-link active" aria-current="page" href="/">Home</a>
            <a className="nav-link" href="/item">Grocery List</a>
            <a className="nav-link" href="/pricing">Inventory</a>
            <button className="nav-link disabled" disabled>Meal Planner</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;