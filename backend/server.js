const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const axios = require('axios');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Razorpay Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'TheLivePitch Backend API' });
});

// Get Razorpay Key
app.get('/api/razorpay-key', (req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID });
});

// Create Order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;

    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency: currency || 'INR',
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {}
    };

    const order = await razorpay.orders.create(options);
    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

// Verify Payment
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      // Payment is successful and verified
      // You can save the payment details to database here
      
      res.json({
        success: true,
        message: 'Payment verified successfully',
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid signature'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message
    });
  }
});

// Save Subscription (after successful payment)
app.post('/api/subscription', async (req, res) => {
  try {
    const { name, email, phone, plan, orderId, paymentId } = req.body;

    // Here you would typically save to database
    // For now, we'll just return success
    const subscription = {
      id: Date.now(),
      name,
      email,
      phone,
      plan,
      orderId,
      paymentId,
      status: 'active',
      createdAt: new Date()
    };

    res.json({
      success: true,
      message: 'Subscription created successfully',
      subscription
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create subscription',
      error: error.message
    });
  }
});

// Get Subscription Plans
app.get('/api/plans', (req, res) => {
  const plans = [
    {
      id: 'annual',
      name: 'Annual Pack',
      duration: '12 months',
      price: 1499,
      originalPrice: 9999,
      discount: 85,
      features: [
        '🏏 Watch All Cricket Matches LIVE',
        '📺 FREE Hotstar Included',
        '26+ OTT Apps (Prime, Sony, Zee5)',
        '400+ Live TV Channels',
        'Unlimited Sports & Entertainment',
        'No Multiple Logins',
        'No Separate Renewals',
        'No Extra Bills',
        'Available on all devices',
        '24/7 Customer Support'
      ],
      popular: true
    }
  ];

  res.json({ success: true, plans });
});

// Get Live Cricket Scores
app.get('/api/cricket/live-scores', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://allsportsapi2.p.rapidapi.com/api/cricket/matches/live',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || 'e3a941646emshce69345a407cf8fp111518jsn7f1c553af798',
        'x-rapidapi-host': 'allsportsapi2.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    
    // Ensure matches is always an array
    let matches = [];
    if (response.data && Array.isArray(response.data)) {
      matches = response.data;
    } else if (response.data && response.data.events && Array.isArray(response.data.events)) {
      matches = response.data.events;
    }
    
    // Return live cricket matches
    res.json({
      success: true,
      matches: matches
    });
  } catch (error) {
    console.error('Error fetching cricket scores:', error.message);
    
    // Return mock data if API fails
    const mockMatches = [
      {
        id: 1,
        homeTeam: 'India',
        awayTeam: 'Australia',
        homeScore: '285/6',
        awayScore: '198/8',
        status: 'Live',
        overs: '45.2',
        matchType: 'ODI'
      },
      {
        id: 2,
        homeTeam: 'England',
        awayTeam: 'Pakistan',
        homeScore: '156/4',
        awayScore: '',
        status: 'Live',
        overs: '18.5',
        matchType: 'T20'
      }
    ];
    
    res.json({
      success: true,
      matches: mockMatches,
      isMockData: true
    });
  }
});

// Get Cricket Match Details
app.get('/api/cricket/match/:matchId', async (req, res) => {
  try {
    const { matchId } = req.params;
    
    const options = {
      method: 'GET',
      url: `https://allsportsapi2.p.rapidapi.com/api/cricket/match/${matchId}`,
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || 'e3a941646emshce69345a407cf8fp111518jsn7f1c553af798',
        'x-rapidapi-host': 'allsportsapi2.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    
    res.json({
      success: true,
      match: response.data
    });
  } catch (error) {
    console.error('Error fetching match details:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch match details'
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
