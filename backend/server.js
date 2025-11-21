require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const paymentController = require('./controllers/paymentController');
const aiController = require('./controllers/aiController');

const app = express();
const PORT = process.env.PORT || 3001;

// Security & Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST']
}));
app.use(express.json());

// --- ROUTES ---

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', timestamp: new Date().toISOString() });
});

// 2. Payment Routes (Stripe / WeChat / Alipay)
// Create a payment session or intent
app.post('/api/payment/create-intent', paymentController.createPaymentIntent);
// Webhook to handle successful payments asynchronously
app.post('/api/payment/webhook', express.raw({type: 'application/json'}), paymentController.handleWebhook);

// 3. AI Proxy Routes (Protecting Google API Keys)
// Frontend calls this -> Server adds Key -> Server calls Google -> Returns result
app.post('/api/ai/generate-video', aiController.generateVideoProxy);
app.post('/api/ai/generate-image', aiController.generateImageProxy);

// Start Server
app.listen(PORT, () => {
  console.log(`KUHNPOHL Backend System Online on Port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});