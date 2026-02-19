import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    pricingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-lights"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="highlight">WATCH CRICKET</span>
              <br />
              <span className="highlight">FREE ON HOTSTAR</span>
              <br />
              + 26 OTT APPS
            </motion.h1>

            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Watch all cricket matches LIVE on Hotstar + Prime Video, Sony Liv & 25+ more apps!
              <br />
              <strong>One subscription. Unlimited cricket & entertainment.</strong>
            </motion.p>

            <motion.div 
              className="hero-features"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="feature-badge highlight-badge">🏏 FREE Hotstar</div>
              <div className="feature-badge">26+ OTT Apps</div>
              <div className="feature-badge">400+ Live TV</div>
            </motion.div>

            <motion.div 
              className="hero-cta"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <button className="btn btn-primary btn-large" onClick={scrollToPricing}>
                View Plans
              </button>
              <p className="hero-discount">
                🎉 NEW YEAR MEGA OTT DHAMAKA - Save upto 85%!
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="hero-video-container">
              <div className="video-glow"></div>
              <video 
                className="hero-video"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/vid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="video-overlay"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
