/**
 * Service to handle AI chat logic using native fetch and Gemini 2.5 Flash URL
 */
export async function getClimateResponse(message: string, city: string, weather: any) {
  // Vite uses import.meta.env.VITE_... instead of process.env
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
  
  if (!API_KEY) {
    console.error("API Key is missing! Check your .env file.");
    return "The Climate Assistant is unavailable (API Key missing).";
  }

  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

  // Building a stronger context for better AI personality
  const context = `You are a helpful Climate Assistant and Tourist helper. User is in ${city}. 
  Current Weather: ${weather?.temp}°C, ${weather?.condition}, Humidity: ${weather?.humidity}%.Don't use MD formatting. Just plain text. Give short and precise answers.`;

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ text: `${context}\nUser Question: ${message}` }] 
        }]
      })
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("Gemini API Error:", errorBody);
      throw new Error("API request failed");
    }

    const data = await response.json();
    
    // Safely extract text from the REST response
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    
    return "I processed your request but couldn't generate a response.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "I'm having trouble connecting to the climate station.";
  }
}