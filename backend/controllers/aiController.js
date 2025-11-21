const { GoogleGenAI } = require("@google/genai");

// Initialize on server start
// WARNING: Never commit your API KEY to git. Use .env file.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

exports.generateVideoProxy = async (req, res) => {
  try {
    const { prompt, imageBase64, mimeType } = req.body;

    if (!process.env.API_KEY) {
      return res.status(503).json({ error: "Server AI configuration missing" });
    }

    // Call Google Veo Model from Server
    // This keeps the API Key hidden from the browser network tab
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      image: imageBase64 ? {
        imageBytes: imageBase64,
        mimeType: mimeType || 'image/jpeg',
      } : undefined,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    // NOTE: For a real production app, you wouldn't wait for the polling here
    // because it might timeout the HTTP request (30s+).
    // Instead, you would return a Job ID, and the frontend would poll your server status.
    // For simplicity in this demo code, we await (but beware of timeouts).
    
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    
    // We need to proxy the download too, or sign a URL, because the raw URI might need auth
    // For now, we return the URI and the frontend appends the key? 
    // Actually, safe practice: Server downloads video, uploads to S3/Cloud Storage, returns public URL.
    
    res.json({ 
      success: true, 
      videoUri: videoUri,
      // In a real app, don't send the key back. Server should proxy the binary data.
      // requiresKey: true 
    });

  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ error: "AI Service Unavailable" });
  }
};

exports.generateImageProxy = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
      },
    });

    const imageBytes = response.generatedImages?.[0]?.image?.imageBytes;
    res.json({ imageBase64: imageBytes });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Image Generation Failed" });
  }
};