import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPlans } from '../services/api';
import './Pricing.css';

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await getPlans();
      setPlans(response.plans);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setLoading(false);
    }
  };

  const handleSubscribe = (plan) => {
    navigate('/checkout', { state: { plan } });
  };

  if (loading) {
    return <div className="loading">Loading plans...</div>;
  }

  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <motion.div
          className="pricing-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="title-highlight">OTT KI SABSE BADI SALE.</span>
            <br />
            UNLIMITED ENTERTAINMENT, CRAZY PRICES!
          </h2>
          <p className="section-subtitle">
            Bundled into one simple plan. Special offer pricing.
          </p>
        </motion.div>

        <div className="pricing-cards">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              {plan.popular && (
                <div className="popular-badge">
                  🔥 MOST POPULAR
                </div>
              )}

              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-duration">{plan.duration}</p>
              </div>

              <div className="plan-pricing">
                <div className="price-original">
                  <span className="currency">₹</span>
                  <span className="amount">{plan.originalPrice}</span>
                </div>
                <div className="price-offer">
                  <span className="currency">₹</span>
                  <span className="amount">{plan.price}</span>
                </div>
                <div className="discount-badge">
                  Save {plan.discount}%
                </div>
              </div>

              <div className="plan-features">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <span className="check-icon">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-full`}
                onClick={() => handleSubscribe(plan)}
              >
                Subscribe Now
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="pricing-note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>NO MULTIPLE LOGINS. NO SEPARATE RENEWALS. NO EXTRA BILLS.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
