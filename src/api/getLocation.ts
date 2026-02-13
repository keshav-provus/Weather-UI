export async function fetchLocation(): Promise<string> {
  try {
    // This provider supports HTTPS and is Vercel-friendly
    const response = await fetch('https://freeipapi.com/api/json/');
    
    if (!response.ok) throw new Error("Location fetch failed");

    const data = await response.json();
    // Use the cityName property from their specific response
    return data.cityName || "Jaipur"; 
  } catch (error) {
    console.error("Geolocation error:", error);
    return "Jaipur"; // Safe fallback
  }
}