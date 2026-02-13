// api/getLocation.ts
export const config = {
  runtime: 'edge', 
};

export default function handler(request: Request) {
  // Edge runtime automatically receives these headers
  const city = request.headers.get('x-vercel-ip-city') || 'Jaipur';
  const country = request.headers.get('x-vercel-ip-country') || 'IN';

  return new Response(
    JSON.stringify({ city, country }),
    {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }
  );
}