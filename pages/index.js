import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // JavaScript functions
    async function sendReact() {
      const link = document.getElementById("link")?.value.trim();
      const emojiRaw = document.getElementById("emoji")?.value.trim();
      const result = document.getElementById("result");

      if (!link || !emojiRaw) {
        result.textContent = "❌ Link dan emoji wajib diisi";
        return;
      }

      // Format: "😂, 🔥" 
      const emoji = emojiRaw.replace(/,/g, " ").split(/\s+/).filter(e => e).join(', ');
      
      result.textContent = "⏳ Mengirim react... (Menggunakan API Key baru)";

      try {
        const response = await fetch(
          `/api/react?link=${encodeURIComponent(link)}&emoji=${encodeURIComponent(emoji)}`
        );
        
        const data = await response.json();
        
        if (data.success) {
          result.textContent = 
`✅ REACTION BERHASIL!

🔗 Link:
${link}

🎭 Emoji:
${emoji}

📝 Pesan:
${data.message}

💰 Saldo Tersisa:
${data.balance || '147 KOIN'}

⚡ Metode:
${data.method || 'Bearer Token'}`;
        } else {
          result.textContent = 
`❌ GAGAL

Error: ${data.error || data.message}

Detail: ${data.details || 'Coba lagi'}

💡 Info: ${data.solution || 'Format API: Authorization: Bearer <Key>'}`;
        }
      } catch (error) {
        result.textContent = "❌ API tidak bisa diakses. Cek koneksi internet.";
        console.error(error);
      }
    }

    // Music control
    function toggleMusic() {
      const music = document.getElementById("bgMusic");
      const musicBtn = document.querySelector(".music-player");
      
      if (music && musicBtn) {
        if (music.paused) {
          music.play();
          musicBtn.classList.add("playing");
        } else {
          music.pause();
          musicBtn.classList.remove("playing");
        }
      }
    }

    // Attach to window for HTML onclick
    window.sendReact = sendReact;
    window.toggleMusic = toggleMusic;
  }, []);

  return (
    <html lang="id">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reactch Web - Asitha API</title>
        <style>{`
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: "Segoe UI", Arial, sans-serif;
            background: radial-gradient(circle at top, #020617, #000);
            color: #e5e7eb;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
          }
          .card {
            position: relative;
            background: rgba(2,6,23,.88);
            backdrop-filter: blur(14px);
            border-radius: 18px;
            width: 100%;
            max-width: 420px;
            padding: 26px;
            box-shadow: 0 30px 70px rgba(0,0,0,.7);
            z-index: 2;
            animation: fadeUp .8s ease;
          }
          .card::before {
            content: "";
            position: absolute;
            inset: -2px;
            border-radius: 20px;
            background: linear-gradient(90deg, red, orange, yellow, lime, cyan, blue, magenta, red);
            background-size: 400% 400%;
            animation: rgbFlow 8s linear infinite;
            z-index: -1;
          }
          .card::after {
            content: "";
            position: absolute;
            inset: 2px;
            background: rgba(2,6,23,.95);
            border-radius: 16px;
            z-index: -1;
          }
          @keyframes rgbFlow {
            0% { background-position: 0% 50%; }
            100% { background-position: 400% 50%; }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          h1 {
            margin: 0 0 6px;
            font-size: 22px;
            text-align: center;
            background: linear-gradient(90deg, #22c55e, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .subtitle {
            text-align: center;
            font-size: 13px;
            color: #94a3b8;
            margin-bottom: 22px;
          }
          .api-status {
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.3);
            border-radius: 8px;
            padding: 8px 12px;
            margin-bottom: 16px;
            font-size: 12px;
            text-align: center;
          }
          .api-status span {
            color: #22c55e;
            font-weight: bold;
          }
          label {
            font-size: 13px;
            color: #cbd5f5;
            display: block;
            margin-top: 4px;
          }
          input {
            width: 100%;
            padding: 13px;
            margin-top: 6px;
            margin-bottom: 14px;
            border-radius: 12px;
            border: 1px solid rgba(148,163,184,.2);
            background: rgba(2,6,23,.9);
            color: #fff;
            outline: none;
          }
          input:focus {
            border-color: #22c55e;
            box-shadow: 0 0 0 2px rgba(34,197,94,.25);
          }
          button {
            width: 100%;
            padding: 14px;
            border: none;
            border-radius: 14px;
            font-weight: bold;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: #020617;
            cursor: pointer;
            transition: transform .15s ease, box-shadow .15s ease;
          }
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 25px rgba(34,197,94,.45);
          }
          .result {
            margin-top: 18px;
            padding: 14px;
            background: rgba(2,6,23,.9);
            border-radius: 12px;
            border: 1px solid rgba(148,163,184,.15);
            font-size: 13px;
            white-space: pre-wrap;
            min-height: 70px;
          }
          .footer {
            margin-top: 16px;
            text-align: center;
            font-size: 11px;
            color: #64748b;
          }
          .music-player {
            position: fixed;
            bottom: 18px;
            right: 18px;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: #020617;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 10px 25px rgba(34,197,94,.45);
            z-index: 99;
            font-size: 20px;
          }
          .music-player.playing {
            animation: spin 3s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </head>
      <body>
        <div className="card">
          <h1>🚀 Reactch Web v2</h1>
          <div className="subtitle">Send reaction to WhatsApp Channel post</div>
          
          <div className="api-status">
            🔑 API Key: <span>dab69bae...</span> • 💰 Saldo: <span>147 KOIN</span>
          </div>
          
          <label>🔗 Link Post Channel</label>
          <input id="link" placeholder="https://whatsapp.com/channel/xxx/123" />
          
          <label>🎭 Emoji (pisah dengan spasi)</label>
          <input id="emoji" placeholder="😂 😱 🔥" />
          
          <button onClick={() => window.sendReact && window.sendReact()}>🚀 KIRIM REACT</button>
          
          <div id="result" className="result">Status: Menunggu input...</div>
          
          <div className="footer">
            © 2026 • Powered by dhekzsuli loli
            <div style={{fontSize: '9px', marginTop: '4px', opacity: 0.7}}>
              Format: Authorization: Bearer &lt;Key&gt;
            </div>
          </div>
        </div>
        
        <div className="music-player" onClick={() => window.toggleMusic && window.toggleMusic()}>
          🎵
          <audio id="bgMusic" src="https://files.catbox.moe/feurs1.m4a" loop></audio>
        </div>
      </body>
    </html>
  );
}
