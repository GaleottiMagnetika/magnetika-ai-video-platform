export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { prompt, model } = req.body;
  
  let apiUrl;
  switch (model) {
    case 'wan':
      apiUrl = 'https://api.wan.video/v2/generate';
      break;
    case 'vidful':
      apiUrl = 'https://api.vidful.ai/v1/generate';
      break;
    default:
      apiUrl = 'https://api.videoweb.ai/v1/generate';
      break;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, image: '' }),
    });
    const data = await response.json();
    res.status(200).json({ success: true, ...data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
