export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET method
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { link, emoji } = req.query;

  // Validate required parameters
  if (!link || !emoji) {
    return res.status(400).json({ 
      error: "link & emoji wajib",
      message: "Link dan emoji harus diisi"
    });
  }

  try {
    // Forward request to external API
    const apiResponse = await fetch(
      `https://react.whyux-xec.my.id/api/rch?link=${encodeURIComponent(link)}&emoji=${encodeURIComponent(emoji)}`,
      {
        headers: {
          "x-api-key": "040f2f333ec598e6b0baba7b0e083d03598201f8dcf5818a662112368541580a" // API Key baru
        }
      }
    );

    const data = await apiResponse.json();
    
    // Return the same status and data from external API
    res.status(apiResponse.status).json(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: "Proxy error", 
      message: "Gagal terhubung ke server",
      details: error.message 
    });
  }
}
