import React from 'react';
import { motion } from 'framer-motion';
import './Platforms.css';
import { 
  FaTv, 
  FaMobileAlt, 
  FaTabletAlt, 
  FaDesktop, 
  FaApple, 
  FaAndroid, 
  FaAmazon, 
  FaChrome 
} from 'react-icons/fa';

const Platforms = () => {
  const platforms = [
    { icon: <FaAndroid />, name: 'Android TV' },
    { icon: <FaAmazon />, name: 'Fire Stick' },
    { icon: <FaApple />, name: 'Apple TV' },
    { icon: <FaTv />, name: 'Samsung' },
    { icon: <FaTv />, name: 'LG' },
    { icon: <FaChrome />, name: 'Web' },
    { icon: <FaMobileAlt />, name: 'Android' },
    { icon: <FaApple />, name: 'iPhone' },
    { icon: <FaTabletAlt />, name: 'iPad' },
    { icon: <FaDesktop />, name: 'JioStore' }
  ];

  const ottApps = [
    { name: 'Hotstar', logo: '/logos/hotstar.svg' },
    { name: 'Prime Video', logo: '/logos/prime-video.svg' },
    { name: 'Sony Liv', logo: '/logos/sonyliv.svg' },
    { name: 'Zee5', logo: '/logos/zee5.svg' },
    { name: 'Disney+', logo: '/logos/disney.svg' },
    { name: 'Times Play', logo: '/logos/timesplay.svg' },
    { name: 'Fancode', logo: '/logos/fancode.svg' },
    { name: 'Chaupal', logo: '/logos/chaupal.svg' },
    { name: 'Discovery+', logo: '/logos/discovery.svg' },
    { name: 'Lionsgate', logo: '/logos/lionsgate.svg' },
    { name: 'Stage', logo: '/logos/stage.svg' },
    { name: 'YRF', logo: '/logos/yrf.svg' },
    { name: 'Shemaroo', logo: '/logos/shemaroo.svg' },
    { name: 'Hungama', logo: '/logos/hungama.svg' },
    { name: 'Hoichoi', logo: '/logos/hoichoi.svg' },
    { name: 'MX Player', logo: '/logos/mxplayer.svg' }
  ];

  const posters = [
    '0750x1125etvwinposter-1766127750.avif',
    '0750x1125jiohotstarposter-1766127751.webp',
    '0750x1125jiohotstarposter-1770209757.webp',
    '0750x1125sonylivposter-1765183913.webp',
    '0750x1125sonylivposter-1770209757.webp',
    '0750x1125z5poster-1770209757.webp',
    '0750x1125z5poster-1770630102.avif',
    '750x1125-2-1771150638.webp',
    '750x1125-5-1754982299.webp',
    '750x1125jiohosterposter-1770209757.avif',
    '750x1125poster-1766127751.avif',
    '750x1125poster-1770885134.webp',
    '750x1125zee5poster-1765183913.avif',
    'ia-1771226735.webp',
    'poster-1767348135.avif',
    'poster-1767859110.webp',
    'poster-1767859403.webp',
    'poster-1770361268.avif',
    'poster-1770361436.avif',
    'poster-1770879828.webp',
    'tmkoc750x1125old-1751971198.avif'
  ];

  return (
    <section id="platforms" className="platforms-section">
      <div className="container">
        <motion.div
          className="platforms-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">OTT PLATFORMS INCLUDED</h2>
          <p className="section-subtitle">
            Access 26+ premium OTT apps in one subscription
          </p>
        </motion.div>

        <motion.div
          className="ott-apps-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {ottApps.map((app, index) => (
            <motion.div
              key={index}
              className="ott-app-card"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img 
                src={app.logo} 
                alt={app.name} 
                className="ott-logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="ott-fallback-text" style={{display: 'none'}}>{app.name}</span>
            </motion.div>
          ))}
          <div className="ott-app-card more">+ 11 More</div>
        </motion.div>

        {/* Posters Section */}
        <motion.div
          className="platforms-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="section-title">40000+ TITLES WITH HD QUALITY</h2>
          <p className="section-subtitle">
            Unlimited movies, web series, and shows in crystal clear quality
          </p>
        </motion.div>

        <motion.div
          className="posters-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {posters.map((poster, index) => (
            <motion.div
              key={index}
              className="poster-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
            >
              <img 
                src={`/slider-poster/${poster}`} 
                alt={`Content poster ${index + 1}`}
                className="poster-image"
                loading="lazy"
              />
            </motion.div>
          ))}
          
          {/* Final 40000+ Card */}
          <motion.div
            className="poster-card poster-more"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: posters.length * 0.05 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="poster-more-content">
              <div className="poster-more-number">40000+</div>
              <div className="poster-more-text">More Titles</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="platforms-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="section-title">AVAILABLE ON ALL YOUR DEVICES</h2>
          <p className="section-subtitle">
            Watch on your favorite devices anytime, anywhere
          </p>
        </motion.div>

        <div className="platforms-grid">
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              className="platform-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="platform-icon">{platform.icon}</div>
              <p className="platform-name">{platform.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;
