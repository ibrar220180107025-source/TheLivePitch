# TheLivePitch - Setup Guide

This guide will help you set up and run the TheLivePitch subscription platform on your local machine.

## Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- A **Razorpay Account** - [Sign up](https://razorpay.com/)

## Step-by-Step Setup

### 1. Install Dependencies

Open terminal in the project root directory and run:

```bash
npm run install-all
```

This will install dependencies for both frontend and backend.

Alternatively, you can install them separately:

```bash
# Root dependencies
npm install

# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 2. Set Up Razorpay

1. Sign up or log in to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to **Settings** → **API Keys**
3. Generate API Keys (Use Test Mode for development)
4. Copy your **Key ID** and **Key Secret**

### 3. Configure Backend Environment

1. Navigate to the `backend` folder
2. Copy `.env.example` to `.env`:
   ```bash
   cd backend
   cp .env.example .env
   ```
   (On Windows PowerShell: `Copy-Item .env.example .env`)

3. Open `.env` file and add your Razorpay credentials:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/thelivepitch
   RAZORPAY_KEY_ID=your_actual_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_actual_razorpay_key_secret
   FRONTEND_URL=http://localhost:3000
   ```

### 4. Configure Frontend Environment

1. Navigate to the `frontend` folder
2. Copy `.env.example` to `.env`:
   ```bash
   cd frontend
   cp .env.example .env
   ```
   (On Windows PowerShell: `Copy-Item .env.example .env`)

3. Open `.env` file and add your Razorpay Key ID:
   ```
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_RAZORPAY_KEY_ID=your_actual_razorpay_key_id
   ```

### 5. Run the Application

From the project root directory:

```bash
npm run dev
```

This will start both the backend server and frontend application simultaneously.

Or run them separately:

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Testing Payments

When using Razorpay Test Mode, use these test card details:

- **Card Number**: 4111 1111 1111 1111
- **CVV**: Any 3 digits (e.g., 123)
- **Expiry Date**: Any future date (e.g., 12/25)
- **Cardholder Name**: Any name

## Project Structure

```
TheLivePitch/
├── backend/
│   ├── server.js          # Express server with Razorpay integration
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables (create this)
│
├── frontend/
│   ├── public/
│   │   └── index.html    # HTML template
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── Navbar.js
│   │   │   ├── Hero.js
│   │   │   ├── Features.js
│   │   │   ├── Pricing.js
│   │   │   ├── Platforms.js
│   │   │   └── Footer.js
│   │   ├── pages/        # Page components
│   │   │   ├── Home.js
│   │   │   ├── Checkout.js
│   │   │   └── Success.js
│   │   ├── services/     # API services
│   │   │   └── api.js
│   │   ├── App.js        # Main App component
│   │   └── index.js      # App entry point
│   ├── package.json      # Frontend dependencies
│   └── .env             # Environment variables (create this)
│
├── package.json          # Root package.json
└── README.md            # Project documentation
```

## Features

✅ **Beautiful Landing Page** with animations
✅ **Responsive Design** for all devices
✅ **Live Cricket Scores** integration
✅ **Annual Subscription Plan** with Razorpay
✅ **Razorpay Payment Gateway** integration
✅ **Payment Verification** for security
✅ **Success Page** with order details
✅ **Modern UI** with smooth animations

## Troubleshooting

### Port Already in Use

If you see an error about ports being in use:

**Backend (Port 5000):**
```bash
# Find and kill the process
# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

**Frontend (Port 3000):**
```bash
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Razorpay Script Not Loading

Make sure you have internet connection as Razorpay script is loaded from CDN.

### Payment Not Working

1. Check if your Razorpay keys are correct in both `.env` files
2. Make sure you're using Test Mode keys for development
3. Check browser console for any errors

## Customization

### Update Contact Number

Search for `7203886696` in the project and replace with your number:
- [backend/server.js](backend/server.js)
- [frontend/src/components/Footer.js](frontend/src/components/Footer.js)
- [frontend/src/pages/Success.js](frontend/src/pages/Success.js)

### Update Branding

- Colors: Edit CSS variables in [frontend/src/App.css](frontend/src/App.css)
- Logo: Update in [frontend/src/components/Navbar.js](frontend/src/components/Navbar.js)
- Pricing: Modify in [backend/server.js](backend/server.js) (GET /api/plans endpoint)

## Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Set environment variables on your platform
2. Deploy the `backend` folder
3. Update `REACT_APP_API_URL` in frontend

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `build` folder
3. Set environment variables on your platform

## Support

For any issues or questions:
- 📞 Phone: 7203886696
- 📧 Email: support@thelivepitch.com
- 💬 WhatsApp: https://wa.me/917203886696

## License

ISC License - Feel free to use and modify this project.
