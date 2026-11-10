// Minimaler ZIP-Leser ohne Zusatzpakete (für GitHub-Downloads).
import { inflateRawSync } from "node:zlib";

/** Liefert [{ name, daten: Buffer }] für alle Dateien im ZIP. */
export function zipLesen(buf) {
  let ende = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { ende = i; break; }
  }
  if (ende < 0) throw new Error("Keine gültige ZIP-Datei");

  const anzahl = buf.readUInt16LE(ende + 10);
  let pos = buf.readUInt32LE(ende + 16);
  const dateien = [];

  for (let n = 0; n < anzahl; n++) {
    if (buf.readUInt32LE(pos) !== 0x02014b50) throw new Error("ZIP-Verzeichnis beschädigt");
    const methode = buf.readUInt16LE(pos + 10);
    const gepackt = buf.readUInt32LE(pos + 20);
    const nameLen = buf.readUInt16LE(pos + 28);
    const extraLen = buf.readUInt16LE(pos + 30);
    const kommentarLen = buf.readUInt16LE(pos + 32);
    const lokal = buf.readUInt32LE(pos + 42);
    const name = buf.toString("utf8", pos + 46, pos + 46 + nameLen);
    pos += 46 + nameLen + extraLen + kommentarLen;

    if (name.endsWith("/")) continue;
    const lNameLen = buf.readUInt16LE(lokal + 26);
    const lExtraLen = buf.readUInt16LE(lokal + 28);
    const start = lokal + 30 + lNameLen + lExtraLen;
    const roh = buf.subarray(start, start + gepackt);
    const daten = methode === 0 ? Buffer.from(roh) : inflateRawSync(roh);
    dateien.push({ name, daten });
  }
  return dateien;
}
