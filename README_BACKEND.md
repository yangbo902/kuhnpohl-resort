# KuhnPohl Backend Server

This folder contains the server-side code required to make payments and AI generation secure and functional.

## Setup Instructions

1. **Install Node.js**: Ensure Node.js (v18+) is installed on your server.
2. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```
3. **Environment Variables**:
   Create a `.env` file in the `backend` folder with the following keys:
   ```env
   PORT=3001
   NODE_ENV=development
   
   # Google AI
   API_KEY=your_google_genai_api_key_here
   
   # Payments (Stripe)
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   
   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:5173
   ```

## API Endpoints

### Payments
- `POST /api/payment/create-intent`: Initiates a transaction. Accepts `{ amount, currency, paymentMethodType }`.
- `POST /api/payment/webhook`: Receives status updates from Stripe (Success/Fail).

### AI (Google Gemini/Veo)
- `POST /api/ai/generate-video`: Proxies requests to Google Veo so your API key remains secret.
- `POST /api/ai/generate-image`: Proxies requests to Imagen.

## Deployment
You can deploy this folder to:
- **Vercel**: Add a `vercel.json` configuration.
- **AWS EC2**: Run with PM2 (`pm2 start server.js`).
- **Render/Heroku**: Connect your repo and set the build command.
