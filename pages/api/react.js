export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { link, emoji } = req.query;

  if (!link || !emoji) {
    return res.status(400).json({ 
      success: false,
      error: "link & emoji wajib diisi"
    });
  }

  try {
    // API Key dengan format BEARER TOKEN
    const API_KEY = "dab69bae4382d36d65a27fe15dbe37e080eb7470c06372a85f598ee74d4659b8";
    
    // COBA 2 FORMAT BERBEDA:
    
    // 1. Format Bearer Token (sesuai dokumentasi)
    const apiUrl1 = `https://react.whyux-xec.my.id/api/rch?link=${encodeURIComponent(link)}&emoji=${encodeURIComponent(emoji)}`;
    
    // 2. Format dengan apiKey parameter (alternatif)
    const apiUrl2 = `https://react.whyux-xec.my.id/api/rch?link=${encodeURIComponent(link)}&emoji=${encodeURIComponent(emoji)}&apiKey=${API_KEY}`;
    
    let response, data;
    
    // COBA FORMAT 1: Bearer Token
    try {
      console.log("Trying Bearer Token format...");
      response = await fetch(apiUrl1, {
        headers: {
          "Authorization": `Bearer ${API_KEY}`
        }
      });
      
      data = await response.json();
      console.log("Bearer Token Response:", data);
      
      if (response.ok) {
        return res.status(200).json({
          success: true,
          message: data.message || "✅ Reaction sent successfully!",
          link: link,
          emojis: emoji,
          method: "Bearer Token",
          balance: "147 KOIN" // dari screenshot
        });
      }
    } catch (e) {
      console.log("Bearer Token failed:", e.message);
    }
    
    // COBA FORMAT 2: apiKey parameter
    try {
      console.log("Trying apiKey parameter format...");
      response = await fetch(apiUrl2);
      
      data = await response.json();
      console.log("apiKey Parameter Response:", data);
      
      if (response.ok) {
        return res.status(200).json({
          success: true,
          message: data.message || "✅ Reaction sent via apiKey parameter!",
          link: link,
          emojis: emoji,
          method: "apiKey Parameter"
        });
      }
    } catch (e) {
      console.log("apiKey Parameter failed:", e.message);
    }
    
    // COBA FORMAT 3: Kombinasi
    try {
      console.log("Trying combined headers...");
      response = await fetch(apiUrl1, {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "x-api-key": API_KEY // backup
        }
      });
      
      data = await response.json();
      
      if (response.ok) {
        return res.status(200).json({
          success: true,
          message: "✅ Reaction sent with combined headers!",
          link: link,
          emojis: emoji,
          method: "Combined Headers"
        });
      }
      
      // Jika semua gagal
      return res.status(response.status || 403).json({
        success: false,
        error: data.error || "API Key format masih salah",
        details: data,
        solution: "Cek dokumentasi API untuk format yang benar",
        triedMethods: ["Bearer Token", "apiKey Parameter", "Combined Headers"]
      });
      
    } catch (error) {
      console.error('Final API Error:', error);
    }

  } catch (error) {
    console.error('API Error:', error);
    
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      details: error.message
    });
  }
}
