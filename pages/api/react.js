export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET' });
  }

  const { link, emoji } = req.query;

  if (!link || !emoji) {
    return res.status(400).json({ 
      success: false,
      error: "link & emoji wajib diisi"
    });
  }

  try {
    // API Key BARU dari asitha.top
    const API_KEY = "dab69bae4382d36d65a27fe15dbe37e080eb7470c06372a85f598ee74d4659b8";
    
    const apiUrl = `https://react.whyux-xec.my.id/api/rch?link=${encodeURIComponent(link)}&emoji=${encodeURIComponent(emoji)}`;
    
    const response = await fetch(apiUrl, {
      headers: {
        "x-api-key": API_KEY
      }
    });

    const data = await response.json();
    
    // Format response untuk web
    const webResponse = {
      success: data.success !== false,
      message: data.message || (data.success ? "Reaction sent successfully" : "Failed to send reaction"),
      link: link,
      emojis: emoji,
      details: data.details || data.error,
      timestamp: new Date().toISOString(),
      apiKeyUsed: API_KEY.substring(0, 8) + "..." // untuk debug
    };

    return res.status(response.status).json(webResponse);

  } catch (error) {
    console.error('API Error:', error);
    
    return res.status(500).json({
      success: false,
      error: "Gagal terhubung ke server API",
      details: error.message,
      solution: "Cek koneksi internet atau API Key mungkin expired"
    });
  }
}
