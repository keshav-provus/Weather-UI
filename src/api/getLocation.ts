async function fetchLocationUsingIP(): Promise<string> {
  try {
    const response = await fetch(`${import.meta.env.VITE_IP_GEOLOCATION_API_URL}`);
    if (!response.ok) throw new Error("IP fetch failed");

    const data = await response.json();
    return data.city || "Pune";
  } catch (error) {
    console.error("IP lookup error:", error);
    return "Pune";
  }
}

export async function fetchLocation(): Promise<string> {
    return await fetchLocationUsingIP();
  }
