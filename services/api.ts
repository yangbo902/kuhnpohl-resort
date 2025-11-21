// services/api.ts

/**
 * Configuration
 * To use Mock mode (no backend required), set REACT_APP_USE_MOCK=true in your .env file.
 */
const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true'; 

// If running locally, use localhost:3001. If in production, use the environment variable.
// Ensure your Vercel/Netlify environment variable REACT_APP_BACKEND_URL is set to your deployed backend URL.
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001/api';

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

/**
 * Process Payment via Backend
 */
export const processPayment = async (
  amount: number, 
  method: 'card' | 'wechat' | 'alipay'
): Promise<PaymentResult> => {
  
  if (USE_MOCK) {
    // --- MOCK SIMULATION ---
    return new Promise((resolve) => {
      console.log(`[Mock API] Processing ${method} payment for $${amount}`);
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve({ success: true, transactionId: `mock_tx_${Date.now()}` });
        } else {
          resolve({ success: false, error: 'Bank declined transaction (Mock)' });
        }
      }, 2500);
    });
  } else {
    // --- REAL BACKEND CALL ---
    try {
      console.log(`Connecting to backend at: ${BACKEND_URL}`);
      const response = await fetch(`${BACKEND_URL}/payment/create-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount * 100, currency: 'usd', paymentMethodType: method }) // Amount in cents
      });
      
      const data = await response.json();
      
      if (data.error) throw new Error(data.error);
      
      // Note: In a real Stripe flow, you would now use stripe.confirmCardPayment(data.clientSecret)
      // This is a simplified confirmation for the demo structure
      return { success: true, transactionId: data.id };
      
    } catch (err: any) {
      console.error("Backend Error:", err);
      return { success: false, error: err.message || "Network Error: Check if backend is running" };
    }
  }
};

/**
 * Check Backend Health
 */
export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${BACKEND_URL}/health`);
    return res.ok;
  } catch (e) {
    return false;
  }
};
