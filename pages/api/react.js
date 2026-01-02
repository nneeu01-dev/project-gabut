export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

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
    // Format emoji seperti di bot
    const reacts = emoji.split(',').map(e => e.trim()).join(', ');
    
    const url = 'https://foreign-marna-sithaunarathnapromax-9a005c2e.koyeb.app/api/channel/react-to-post';
    
    const requestData = {
      post_link: link,
      reacts: reacts
    };

    const headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzgyZDFhMTE0YWI3MTE5ZmNhNTdjZiIsImlhdCI6MTc2NTI4OTI0MiwiZXhwIjoxNzY1ODk0MDQyfQ.PyblreikWf2_fcPwRfrM_w-_VZmSlvk1vQtrrOuNFBo'
    };

    // Kirim ke API bot
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestData)
    });

    const data = await response.json();

    const webResponse = {
      success: data.message ? true : false,
      message: data.message || 'Reaction sent',
      link: link,
      emojis: reacts,
      botResponse: data.botResponse || null,
      timestamp: new Date().toISOString()
    };

    return res.status(response.status).json(webResponse);

  } catch (error) {
    console.error('API Error:', error);
    
    return res.status(500).json({
      success: false,
      error: "Gagal mengirim reaction",
      details: error.message
    });
  }
}
