async function fetchLocationUsingIP(): Promise<string> {
  try {
    const response = await fetch(`https://demo.ip-api.com/json/?fields=city`);
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
