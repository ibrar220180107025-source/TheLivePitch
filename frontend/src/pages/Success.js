import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Success.css';
import { FaCheckCircle, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan, orderId, paymentId } = location.state || {};

  useEffect(() => {
    if (!plan) {
      navigate('/');
    }
  }, [plan, navigate]);

  if (!plan) {
    return null;
  }

  return (
    <div className="success-page">
      <div className="success-container">
        <motion.div
          className="success-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="success-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <FaCheckCircle />
          </motion.div>

          <motion.h1
            className="success-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Payment Successful! 🎉
          </motion.h1>

          <motion.p
            className="success-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Thank you for subscribing to TheLivePitch!
          </motion.p>

          <motion.div
            className="success-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="detail-card">
              <h3>Subscription Details</h3>
              <div className="detail-row">
                <span className="detail-label">Plan:</span>
                <span className="detail-value">{plan.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Duration:</span>
                <span className="detail-value">{plan.duration}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Amount Paid:</span>
                <span className="detail-value amount">₹{plan.price}</span>
              </div>
              {orderId && (
                <div className="detail-row">
                  <span className="detail-label">Order ID:</span>
                  <span className="detail-value order-id">{orderId}</span>
                </div>
              )}
              {paymentId && (
                <div className="detail-row">
                  <span className="detail-label">Payment ID:</span>
                  <span className="detail-value payment-id">{paymentId}</span>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="next-steps"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3>What's Next?</h3>
            <div className="steps-grid">
              <div className="step-item">
                <div className="step-number">1</div>
                <p>Check your email for subscription details and activation instructions</p>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <p>Our team will contact you within 24 hours to activate your account</p>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <p>Start enjoying 26+ OTT apps and 400+ live TV channels</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="success-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              Back to Home
            </button>
            <div className="contact-buttons">
              <a 
                href="https://wa.me/917203886696" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-icon"
              >
                <FaWhatsapp />
                <span>WhatsApp Support</span>
              </a>
              <a 
                href="mailto:support@thelivepitch.com"
                className="btn btn-secondary btn-icon"
              >
                <FaEnvelope />
                <span>Email Support</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="success-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p>Need help? Contact us at <strong>7203886696</strong></p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;
