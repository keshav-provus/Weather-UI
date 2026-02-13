// src/api/getLocation.ts

/**
 * Fetches the user's city name from our internal Vercel API route.
 * This avoids CORS issues and third-party rate limits.
 */
export async function fetchLocation(): Promise<string> {
  try {
    // We call our own local API path
    const response = await fetch('/api/getLocation');
    
    if (!response.ok) {
      throw new Error("Vercel Geolocation fetch failed");
    }

    const data = await response.json();
    
    // Return the city name or a default fallback for local dev
    return data.city || "Jaipur"; 
  } catch (error) {
    console.error("Geolocation error:", error);
    // Always return a fallback so the app doesn't crash
    return "Jaipur"; 
  }
}