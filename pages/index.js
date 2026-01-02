export default function Home() {
  return (
    <html lang="id">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reactch Web</title>
        <style>{`
          /* SALIN SEMUA CSS KAMU DI SINI */
          * {
            box-sizing: border-box;
          }

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

          /* ... LANJUTKAN SAMPAI AKHIR CSS ... */
        `}</style>
      </head>
      <body>
        <div class="card">
          <h1>🚀 Reactch Web</h1>
          <div class="subtitle">Send reaction to WhatsApp Channel post</div>

          <label>🔗 Link Post Channel</label>
          <input id="link" placeholder="https://whatsapp.com/channel/xxx/123" />

          <label>🎭 Emoji</label>
          <input id="emoji" placeholder="😂 😱 🔥" />

          <button onclick="sendReact()">KIRIM REACT</button>

          <div id="result" class="result">Status: -</div>

          <div class="footer">© 2026 Reactch Interface</div>
        </div>

        <div class="music-player" onclick="toggleMusic()">
          🎵
          <audio id="bgMusic" src="https://files.catbox.moe/a5ncoy.mp3" loop></audio>
        </div>

        <script>
          async function sendReact() {
            const link = document.getElementById("link").value.trim();
            const emojiRaw = document.getElementById("emoji").value.trim();
            const result = document.getElementById("result");

            if (!link || !emojiRaw) {
              result.textContent = "❌ Link dan emoji wajib diisi";
              return;
            }

            // Format emoji
            const emoji = emojiRaw.replace(/,/g, " ").split(/\s+/).join(",");

            result.textContent = "⏳ Mengirim react...";

            try {
              // PAKAI API LOKAL DI VERCEL
              const response = await fetch(
                \`/api/react?link=\${encodeURIComponent(link)}&emoji=\${encodeURIComponent(emoji)}\`
              );

              const data = await response.json();
              
              if (response.ok) {
                result.textContent = 
\`✅ SUCCESS

Link:
\${link}

Emoji:
\${emoji.replace(/,/g, " ")}

Response:
\${JSON.stringify(data, null, 2)}\`;
              } else {
                result.textContent = \`❌ ERROR: \${data.error || "Unknown error"}\`;
              }
            } catch (error) {
              result.textContent = "❌ API tidak bisa diakses";
              console.error(error);
            }
          }

          // Music control
          const music = document.getElementById("bgMusic");
          const musicBtn = document.querySelector(".music-player");

          function toggleMusic() {
            if (music.paused) {
              music.play();
              musicBtn.classList.add("playing");
            } else {
              music.pause();
              musicBtn.classList.remove("playing");
            }
          }
        </script>
      </body>
    </html>
  );
}
