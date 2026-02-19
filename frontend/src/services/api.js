import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getPlans = async () => {
  try {
    const response = await api.get('/api/plans');
    return response.data;
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/api/create-order', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await api.post('/api/verify-payment', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

export const createSubscription = async (subscriptionData) => {
  try {
    const response = await api.post('/api/subscription', subscriptionData);
    return response.data;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

export const getRazorpayKey = async () => {
  try {
    const response = await api.get('/api/razorpay-key');
    return response.data.key;
  } catch (error) {
    console.error('Error fetching Razorpay key:', error);
    // Fallback to environment variable
    return process.env.REACT_APP_RAZORPAY_KEY_ID;
  }
};

export default api;
