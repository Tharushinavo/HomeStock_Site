import React from 'react';
import './Footer.css';

const footer = () => {
  const handleSocialMediaClick = (platform) => {
    // Add functionality for social media buttons if needed
    console.log(`Redirecting to ${platform}`);
  };

  return (
    <div>
      <footer className="footer py-3 bg-body-tertiary">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <h5>About Us</h5>
              <p>Home inventory helps you keep your things organized, and it's totally free.</p>
            </div>
            <div className="col-md-3">
              <h5>Contact</h5>
              <ul className="list-unstyled">
                <li><i className="fas fa-phone"></i> +1 124 578 2190</li>
                <li><i className="fas fa-envelope"></i> <a href="mailto:info@example.com">Grocify@example.com</a></li>
                
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Address</h5>
              <ul className="list-unstyled">
                <li>132 My Street,</li>
                <li>Kingston,</li>
                <li>New York 12401.</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Follow Us</h5>
              <ul className="list-unstyled social-icons">
                <li>
                  <button className="social-icon-btn" onClick={() => handleSocialMediaClick('Facebook')}>
                    <img src="https://w7.pngwing.com/pngs/637/497/png-transparent-facebook-fb-social-media-logo-social-media-logo-socialmedia-3d-icon-thumbnail.png" alt="Facebook Icon" width="45" height="45" />
                  </button>
                </li>
                <li>
                  <button className="social-icon-btn" onClick={() => handleSocialMediaClick('Instagram')}>
                    <img src="https://img.freepik.com/premium-vector/insta-icon-modern-instagram-logo-vector-social-media-creators-highquality-branding_867537-142.jpg" alt="Instagram Icon" width="35" height="35" />
                  </button>
                </li>
                <li>
                  <button className="social-icon-btn" onClick={() => handleSocialMediaClick('Twitter')}>
                    <img src="https://store-images.s-microsoft.com/image/apps.45406.9007199266244427.4d45042b-d7a5-4a83-be66-97779553b24d.2a88a418-b96d-44a6-ad4f-5e0ee6289b2c" alt="Twitter Icon" width="45" height="45" />
                  </button>
                </li>
                <li>
                  <button className="social-icon-btn" onClick={() => handleSocialMediaClick('Whatsapp')}>
                    <img src="https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049563.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724457600&semt=ais_hybrid" alt="Whatsapp Icon" width="40" height="40" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-center text-muted">Copyright &copy; 2024 Grocify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default footer;