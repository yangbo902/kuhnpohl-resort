const Stripe = require('stripe');
// Initialize Stripe with your Secret Key (from Dashboard)
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, paymentMethodType } = req.body;

    // 1. Basic Validation
    if (!amount || amount < 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // 2. Create PaymentIntent based on method
    let paymentIntent;

    if (paymentMethodType === 'card') {
      // Credit Card Logic (Stripe)
      paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // Amount in smallest currency unit (e.g., cents)
        currency: currency || 'usd',
        automatic_payment_methods: { enabled: true },
        metadata: { integration_check: 'accept_a_payment' },
      });
    } else if (paymentMethodType === 'wechat' || paymentMethodType === 'alipay') {
      // WeChat/Alipay Logic (Stripe supports these or use native SDKs)
      // This is a simplified Stripe implementation for wallets
      paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'cny',
        payment_method_types: [paymentMethodType === 'wechat' ? 'wechat_pay' : 'alipay'],
      });
    }

    // 3. Return the Client Secret to frontend
    res.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id
    });

  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.handleWebhook = (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded!', paymentIntent.id);
      // TODO: Update database to set Booking Status to 'CONFIRMED'
      break;
    case 'payment_intent.payment_failed':
      console.log('Payment failed.');
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
};