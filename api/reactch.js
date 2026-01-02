export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { link, emoji } = req.query;

  if (!link || !emoji) {
    return res.status(400).json({ error: "link & emoji wajib" });
  }

  try {
    const apiRes = await fetch(
      `https://react.whyux-xec.my.id/api/rch?link=${encodeURIComponent(link)}&emoji=${encodeURIComponent(emoji)}`,
      {
        headers: {
          "x-api-key": "d08ab503b161c0fc400041c7b2b955ae6b6e9dd08e654adbee321d0d59d45227"
        }
      }
    );

    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy error" });
  }
}
