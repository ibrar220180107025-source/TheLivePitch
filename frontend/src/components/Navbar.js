import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="logo">
            <span className="logo-text">TheLive</span>
            <span className="logo-play">Pitch</span>
          </Link>
          
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#platforms">Platforms</a>
            <Link to="/checkout" className="btn btn-primary btn-small">
              Subscribe Now
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
