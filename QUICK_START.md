# 🎬 TheLivePitch - Quick Start Guide

Follow these simple steps to get started:

## ⚡ Quick Setup (5 minutes)

### 1️⃣ Install Dependencies
```bash
npm run install-all
```

### 2️⃣ Get Razorpay Keys

1. Go to: https://dashboard.razorpay.com/
2. Sign up (it's free!)
3. Go to Settings → API Keys
4. Click "Generate Test Keys"
5. Copy your **Key ID** and **Key Secret**

### 3️⃣ Add Your Razorpay Keys

**Edit: `backend/.env`**
```
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE
RAZORPAY_KEY_SECRET=YOUR_SECRET_HERE
```

**Edit: `frontend/.env`**
```
REACT_APP_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE
```

### 4️⃣ Run the Application
```bash
npm run dev
```

### 5️⃣ Open Your Browser
- Go to: **http://localhost:3000**
- Your website is ready! 🎉

## 💳 Test Payment

Use these test card details:
- **Card**: 4111 1111 1111 1111
- **CVV**: 123
- **Expiry**: 12/25
- **Name**: Any name

## 📞 Need Help?

Read the detailed [SETUP_GUIDE.md](SETUP_GUIDE.md) or contact: 7203886696

---

## 🎨 What's Included

✅ Beautiful landing page with animations
✅ Annual subscription plan
✅ Live cricket scores integration
✅ Razorpay payment integration
✅ Responsive design for all devices
✅ Success page with order details
✅ Contact forms and WhatsApp integration

## 🚀 Next Steps

1. Customize your branding and colors
2. Update contact information
3. Add more OTT platform logos
4. Deploy to production

Happy coding! 🎉
