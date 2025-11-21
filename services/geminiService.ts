import { GoogleGenAI } from "@google/genai";

export const checkApiKey = async (): Promise<boolean> => {
  if (window.aistudio && window.aistudio.hasSelectedApiKey) {
    return await window.aistudio.hasSelectedApiKey();
  }
  return !!process.env.API_KEY;
};

export const promptApiKeySelect = async (): Promise<void> => {
  if (window.aistudio && window.aistudio.openSelectKey) {
    await window.aistudio.openSelectKey();
  } else {
    alert("AI Studio API Key selection is not available in this environment.");
  }
};

export const generateCampVideo = async (
  prompt: string,
  base64Image: string,
  mimeType: string,
  onProgress: (status: string) => void
): Promise<string> => {
  
  // 1. Ensure API Key
  const hasKey = await checkApiKey();
  if (!hasKey) {
    throw new Error("API Key not selected. Please select an API key first.");
  }

  // 2. Initialize Client
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  onProgress("Initializing Veo generation...");

  // 3. Start Video Generation Operation
  // Model: veo-3.1-fast-generate-preview
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt || "A cinematic video of a luxury camping resort, 4k, photorealistic, slow motion camera movement.",
    image: {
      imageBytes: base64Image,
      mimeType: mimeType,
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p', 
      aspectRatio: '16:9'
    }
  });

  // 4. Poll for completion
  onProgress("Dreaming up your video... (This may take a minute)");
  
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5s
    onProgress("Rendering magic...");
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  onProgress("Finalizing...");

  // 5. Retrieve Result
  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

  if (!downloadLink) {
    throw new Error("Failed to generate video: No download link returned.");
  }

  // The response.body contains the MP4 bytes. You must append an API key when fetching from the download link.
  const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  
  if (!response.ok) {
      throw new Error(`Failed to download video: ${response.statusText}`);
  }

  const videoBlob = await response.blob();
  return URL.createObjectURL(videoBlob);
};

export const generateImage = async (prompt: string): Promise<string> => {
  // 1. Ensure API Key
  const hasKey = await checkApiKey();
  if (!hasKey) {
    throw new Error("API Key not selected.");
  }

  // 2. Initialize Client
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // 3. Generate Image
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio: '3:4', // Portrait for staff cards
    },
  });

  const base64ImageBytes = response.generatedImages?.[0]?.image?.imageBytes;
  if (!base64ImageBytes) {
    throw new Error("Failed to generate image");
  }

  return `data:image/jpeg;base64,${base64ImageBytes}`;
};

// Helper to convert File to Base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the Data-URI prefix (e.g. "data:image/png;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

// Helper to fetch a preset image url and convert to base64
export const urlToBase64 = async (url: string): Promise<{base64: string, mimeType: string}> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(blob);
  });
  return { base64, mimeType: blob.type };
}