// Erstellt abgabe/<projektname>_<datum>.zip OHNE node_modules, .next, Datenbank usw.
// Läuft auf Windows, macOS und Linux, ohne zusätzliche Programme.
import { readdirSync, readFileSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { deflateRawSync, crc32 } from "node:zlib";
import path from "node:path";

const ROOT = process.cwd();
const AUSLASSEN_ORDNER = new Set(["node_modules", ".next", ".git", "abgabe", ".turbo", ".vercel"]);
const AUSLASSEN_PFADE = ["data/"]; // Datenbank + Uploads (bis auf .gitkeep)
const AUSLASSEN_DATEIEN = [/^\.env/, /\.tsbuildinfo$/, /^\.DS_Store$/, /^next-env\.d\.ts$/];

function sammeln(dir, liste = []) {
  for (const name of readdirSync(dir)) {
    const voll = path.join(dir, name);
    const rel = path.relative(ROOT, voll).split(path.sep).join("/");
    const st = statSync(voll);
    if (st.isDirectory()) {
      if (AUSLASSEN_ORDNER.has(name)) continue;
      sammeln(voll, liste);
    } else {
      if (AUSLASSEN_DATEIEN.some((re) => re.test(name))) continue;
      if (AUSLASSEN_PFADE.some((p) => rel.startsWith(p)) && name !== ".gitkeep") continue;
      liste.push({ voll, rel, st });
    }
  }
  return liste;
}

function dosZeit(d) {
  const zeit = (d.getHours() << 11) | (d.getMinutes() << 5) | Math.floor(d.getSeconds() / 2);
  const datum = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
  return { zeit, datum };
}

const pkg = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf8"));
const projekt = pkg.name || path.basename(ROOT);
const heute = new Date().toISOString().slice(0, 10);
const zielOrdner = path.join(ROOT, "abgabe");
const ziel = path.join(zielOrdner, `${projekt}_${heute}.zip`);

const dateien = sammeln(ROOT);
const teile = [];
const zentral = [];
let offset = 0;

for (const f of dateien) {
  const daten = readFileSync(f.voll);
  const gepackt = deflateRawSync(daten, { level: 9 });
  const name = Buffer.from(`${projekt}/${f.rel}`, "utf8");
  const crc = crc32(daten) >>> 0;
  const { zeit, datum } = dosZeit(f.st.mtime);

  const lokal = Buffer.alloc(30);
  lokal.writeUInt32LE(0x04034b50, 0);
  lokal.writeUInt16LE(20, 4);
  lokal.writeUInt16LE(0x0800, 6); // UTF-8 Dateinamen
  lokal.writeUInt16LE(8, 8); // deflate
  lokal.writeUInt16LE(zeit, 10);
  lokal.writeUInt16LE(datum, 12);
  lokal.writeUInt32LE(crc, 14);
  lokal.writeUInt32LE(gepackt.length, 18);
  lokal.writeUInt32LE(daten.length, 22);
  lokal.writeUInt16LE(name.length, 26);
  lokal.writeUInt16LE(0, 28);
  teile.push(lokal, name, gepackt);

  const z = Buffer.alloc(46);
  z.writeUInt32LE(0x02014b50, 0);
  z.writeUInt16LE(20, 4);
  z.writeUInt16LE(20, 6);
  z.writeUInt16LE(0x0800, 8);
  z.writeUInt16LE(8, 10);
  z.writeUInt16LE(zeit, 12);
  z.writeUInt16LE(datum, 14);
  z.writeUInt32LE(crc, 16);
  z.writeUInt32LE(gepackt.length, 20);
  z.writeUInt32LE(daten.length, 24);
  z.writeUInt16LE(name.length, 28);
  z.writeUInt32LE(offset, 42);
  zentral.push(z, name);

  offset += lokal.length + name.length + gepackt.length;
}

const zentralBuf = Buffer.concat(zentral);
const ende = Buffer.alloc(22);
ende.writeUInt32LE(0x06054b50, 0);
ende.writeUInt16LE(dateien.length, 8);
ende.writeUInt16LE(dateien.length, 10);
ende.writeUInt32LE(zentralBuf.length, 12);
ende.writeUInt32LE(offset, 16);

mkdirSync(zielOrdner, { recursive: true });
const zip = Buffer.concat([...teile, zentralBuf, ende]);
writeFileSync(ziel, zip);

const mb = (zip.length / 1024 / 1024).toFixed(2);
console.log(`Fertig: ${path.relative(ROOT, ziel)} (${dateien.length} Dateien, ${mb} MB)`);
console.log("Ohne node_modules, .next, Datenbank und .env – kann per Mail verschickt werden.");
if (zip.length > 20 * 1024 * 1024) {
  console.log("Achtung: größer als 20 MB. Prüfen, ob große Dateien (Fotos, Videos) drin sind.");
}
