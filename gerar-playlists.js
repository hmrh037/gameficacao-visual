// Gera o arquivo playlists.json varrendo a pasta "musicas".
// Cada subpasta de "musicas" vira uma playlist; os .mp3 (e afins) dentro dela viram a lista.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, 'musicas');
const EXTS = ['.mp3', '.m4a', '.ogg', '.wav', '.aac'];
const out = {};
if (fs.existsSync(ROOT)) {
  for (const d of fs.readdirSync(ROOT, { withFileTypes: true })) {
    if (d.isDirectory()) {
      const dir = path.join(ROOT, d.name);
      const songs = fs.readdirSync(dir)
        .filter(f => EXTS.includes(path.extname(f).toLowerCase()))
        .sort((a, b) => a.localeCompare(b, 'pt-BR'));
      out[d.name] = songs;
    }
  }
}
fs.writeFileSync(path.join(__dirname, 'playlists.json'), JSON.stringify(out, null, 2));
const total = Object.values(out).reduce((s, a) => s + a.length, 0);
console.log('playlists.json gerado: ' + Object.keys(out).length + ' playlist(s), ' + total + ' musica(s).');
for (const [k, v] of Object.entries(out)) console.log('  - ' + k + ': ' + v.length + ' musica(s)');
