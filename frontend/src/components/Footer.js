import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-text">TheLive</span>
              <span className="logo-play">Pitch</span>
            </div>
            <p className="footer-tagline">
              One screen. Unlimited entertainment. 
              <br />
              Your gateway to 26+ OTT apps.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#platforms">Platforms</a></li>
              <li><Link to="/">Home</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <div className="contact-info">
              <a href="tel:7203886696" className="contact-item">
                <FaPhone />
                <span>7203886696</span>
              </a>
              <a href="mailto:support@thelivepitch.com" className="contact-item">
                <FaEnvelope />
                <span>support@thelivepitch.com</span>
              </a>
              <a 
                href="https://wa.me/917203886696" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-item whatsapp"
              >
                <FaWhatsapp />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 TheLivePitch. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Terms of Service</a>
            <span>|</span>
            <a href="#">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
