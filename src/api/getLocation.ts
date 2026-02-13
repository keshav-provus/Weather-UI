/** * Helper: Converts latitude and longitude into a city name.
 */
async function reverseGeocode(lat: number, lon: number): Promise<string> {
    try {
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Reverse geocoding failed");
        
        const data = await response.json();
        // Priority: City name, then Locality, finally a placeholder
        return data.city || data.locality || "Unknown Location";
    } catch (error) {
        console.error("Geocoding error:", error);
        return "Unknown City";
    }
}


async function fetchLocationUsingIP(): Promise<string> {
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error("IP fetch failed");

        const data = await response.json();
        return data.city || "Pune";
    } catch (error) {
        console.error('IP lookup error:', error);
        return "Pune";
    }
}


export async function fetchLocation(): Promise<string | null> {
    // Check if the browser supports navigator at all
    if (navigator.geolocation) {
        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    // Success: Reverse geocode the coords
                    const cityName = await reverseGeocode(
                        position.coords.latitude, 
                        position.coords.longitude
                    );
                    resolve(cityName);
                },
                (error) => {
                    // User denied or other error -> Return null (don't use IP)
                    console.warn("Location access denied or failed. Stopping.");
                    resolve(error.code === error.PERMISSION_DENIED ? null : "Pune"); 
                },
                { timeout: 8000 }
            );
        });
    } else {
        // Browser doesn't support navigator -> Fallback to IP
        console.info("Navigator not supported. Falling back to IP.");
        return await fetchLocationUsingIP();
    }
}