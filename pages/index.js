import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('videoweb');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    const res = await fetch('/api/video-generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, model }),
    });
    const json = await res.json();
    setVideoUrl(json.videoUrl || '');
    setLoading(false);
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🎬 Magnetika - AI Video Generator</h1>
      <p>Genera video professionali da prompt testuale usando AI gratuita!</p>
      
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Scrivi il prompt per il video..."
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      />
      
      <select value={model} onChange={(e) => setModel(e.target.value)} style={{ padding: '10px', marginTop: '10px' }}>
        <option value="videoweb">VideoWeb AI</option>
        <option value="wan">Wan AI</option>
        <option value="vidful">Vidful AI</option>
      </select>
      
      <button
        onClick={handleGenerate}
        disabled={loading || !prompt}
        style={{ padding: '10px 20px', marginTop: '10px', cursor: 'pointer' }}
      >
        {loading ? 'Generazione...' : 'Genera Video'}
      </button>
      
      {videoUrl && (
        <div style={{ marginTop: '20px' }}>
          <video src={videoUrl} controls width="400" />
          <br />
          <a href={videoUrl} download>
            📥 Scarica Video
          </a>
        </div>
      )}
    </div>
  );
}
