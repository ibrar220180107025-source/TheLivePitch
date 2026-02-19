import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createOrder, verifyPayment, createSubscription, getRazorpayKey, getPlans } from '../services/api';
import './Checkout.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(location.state?.plan || null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchPlan = async () => {
      if (!plan) {
        try {
          const response = await getPlans();
          if (response.plans && response.plans.length > 0) {
            setPlan(response.plans[0]); // Get the annual plan (only plan available)
          } else {
            navigate('/');
          }
        } catch (error) {
          console.error('Error fetching plan:', error);
          navigate('/');
        }
      }
    };

    fetchPlan();
  }, [plan, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Create order
      const orderResponse = await createOrder({
        amount: plan.price,
        currency: 'INR',
        notes: {
          planId: plan.id,
          planName: plan.name
        }
      });

      if (!orderResponse.success) {
        throw new Error('Failed to create order');
      }

      // Get Razorpay key
      const razorpayKey = await getRazorpayKey();

      // Razorpay options
      const options = {
        key: razorpayKey,
        amount: orderResponse.order.amount,
        currency: orderResponse.order.currency,
        name: 'TheLivePitch',
        description: `${plan.name} Subscription`,
        order_id: orderResponse.order.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#6a1b9a'
        },
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyResponse.success) {
              // Create subscription
              await createSubscription({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                plan: plan.id,
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id
              });

              // Redirect to success page
              navigate('/success', {
                state: {
                  plan: plan,
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id
                }
              });
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setLoading(false);

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  if (!plan) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="loading">Loading subscription details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <motion.div
          className="checkout-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button className="back-button" onClick={() => navigate('/')}>
            ← Back to Home
          </button>

          <h1 className="checkout-title">Complete Your Subscription</h1>

          <div className="checkout-layout">
            <div className="checkout-form-section">
              <h2>Your Details</h2>
              <form className="checkout-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10 digit phone number"
                    maxLength="10"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </form>
            </div>

            <div className="order-summary-section">
              <h2>Order Summary</h2>
              <div className="summary-card">
                <div className="plan-badge">{plan.popular ? '🔥 Most Popular' : '💎 Premium'}</div>
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-duration">{plan.duration}</p>

                <div className="summary-divider"></div>

                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Original Price</span>
                    <span className="price-original">₹{plan.originalPrice}</span>
                  </div>
                  <div className="price-row discount-row">
                    <span>Discount ({plan.discount}%)</span>
                    <span className="price-discount">-₹{plan.originalPrice - plan.price}</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="price-row total-row">
                    <span>Total Amount</span>
                    <span className="price-total">₹{plan.price}</span>
                  </div>
                </div>

                <div className="plan-highlights">
                  <h4>What's Included:</h4>
                  <ul>
                    <li>✓ 26+ OTT Apps</li>
                    <li>✓ 400+ Live TV Channels</li>
                    <li>✓ Unlimited Entertainment</li>
                    <li>✓ All Devices Supported</li>
                  </ul>
                </div>

                <button
                  className="btn btn-primary btn-full"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : `Pay ₹${plan.price}`}
                </button>

                <p className="secure-note">
                  🔒 Secure payment powered by Razorpay
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
