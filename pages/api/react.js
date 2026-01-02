export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
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
    // Format emoji
    const reacts = emoji.split(',').map(e => e.trim()).join(', ');
    
    // COBA 3 API BERBEDA dengan API Key yang sama
    
    // 1. API Lama (react.whyux-xec.my.id)
    const apiUrl1 = `https://react.whyux-xec.my.id/api/rch?link=${encodeURIComponent(link)}&emoji=${encodeURIComponent(reacts)}`;
    
    // 2. API Bot (foreign-marna...)
    const apiUrl2 = 'https://foreign-marna-sithaunarathnapromax-9a005c2e.koyeb.app/api/channel/react-to-post';
    
    // 3. API Alternative (mungkin ada yang lain)
    const apiUrl3 = 'https://api.asitha.top/api/react'; // coba tebak
    
    const apiKey = "040f2f333ec598e6b0baba7b0e083d03598201f8dcf5818a662112368541580a";
    
    let response, data;
    
    // COBA API 1 dulu
    try {
      response = await fetch(apiUrl1, {
        headers: {
          "x-api-key": apiKey
        }
      });
      data = await response.json();
      
      if (response.ok) {
        return res.status(200).json({
          success: true,
          message: data.message || "Reaction sent via API 1",
          link: link,
          emojis: reacts,
          source: "react.whyux-xec.my.id"
        });
      }
    } catch (e) {}
    
    // COBA API 2 (Bot API dengan format berbeda)
    try {
      const requestData = {
        post_link: link,
        reacts: reacts,
        api_key: apiKey  // coba taruh di body
      };
      
      response = await fetch(apiUrl2, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey  // dan di header
        },
        body: JSON.stringify(requestData)
      });
      
      data = await response.json();
      
      if (response.ok) {
        return res.status(200).json({
          success: true,
          message: data.message || "Reaction sent via Bot API",
          link: link,
          emojis: reacts,
          source: "bot-api"
        });
      }
    } catch (e) {}
    
    // COBA API 3 (tanpa API Key)
    try {
      response = await fetch(`https://react.whyux-xec.my.id/api/public?link=${encodeURIComponent(link)}&emoji=${encodeURIComponent(reacts)}`);
      data = await response.json();
      
      if (response.ok) {
        return res.status(200).json({
          success: true,
          message: data.message || "Reaction sent via Public API",
          link: link,
          emojis: reacts,
          source: "public-api"
        });
      }
    } catch (e) {}
    
    // SEMUA GAGAL
    return res.status(403).json({
      success: false,
      error: "API Key tidak valid atau expired",
      message: "API Key 040f2f333ec598e6b0baba7b0e083d03598201f8dcf5818a662112368541580a tidak valid",
      solution: "Dapatkan API Key baru dari https://asitha.top atau gunakan mode simulasi"
    });

  } catch (error) {
    console.error('API Error:', error);
    
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      details: error.message
    });
  }
}
