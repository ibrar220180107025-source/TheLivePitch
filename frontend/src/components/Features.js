import React from 'react';
import { motion } from 'framer-motion';
import './Features.css';
import { 
  FaInfinity, 
  FaLock, 
  FaMoneyBillWave, 
  FaHeadset, 
  FaTv, 
  FaShieldAlt 
} from 'react-icons/fa';
import { GiCricketBat } from 'react-icons/gi';

const Features = () => {
  const features = [
    {
      icon: '🏏',
      title: 'FREE Hotstar - Watch All Cricket',
      description: 'Watch every cricket match LIVE on Hotstar. IPL, World Cup, T20, ODI - all matches included FREE!',
      highlight: true
    },
    {
      icon: <FaInfinity />,
      title: 'Unlimited Content',
      description: 'Access to blockbuster movies, binge-worthy series, live sports, regional hits, devotion, and kids content'
    },
    {
      icon: <FaLock />,
      title: 'No Multiple Logins',
      description: 'One account for everything. Simple and hassle-free access to all platforms'
    },
    {
      icon: <FaMoneyBillWave />,
      title: 'No Extra Bills',
      description: 'Pay once and enjoy all platforms. No hidden charges or surprise bills'
    },
    {
      icon: <FaTv />,
      title: '400+ Live TV',
      description: 'Live TV channels covering news, sports, entertainment, and regional content'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Secure & Safe',
      description: 'Your payment and personal information is completely secure with us'
    },
    {
      icon: <FaHeadset />,
      title: '24/7 Support',
      description: 'Round the clock customer support to help you with any issues'
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <motion.div
          className="features-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Why Choose <span className="title-highlight">TheLivePitch?</span>
          </h2>
          <p className="section-subtitle">
            Everything your family watches is covered in one simple subscription
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`feature-card ${feature.highlight ? 'highlight-card' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
