import photos from "./photos.js";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const src = photos.src[os.hostname()];
if (!src) {
  console.error(`No configuration for hostname ${os.hostname()}.`);
  process.exit(-1);
}
photos.src.images.forEach((image) => {
  const s = path.join(src.basedir, image);
  if (!fs.existsSync(s)) {
    return console.log(`Warning! ${image} not found`);
  }

  const d = path.join(photos.src.appsfortracking.basedir, image);
  const ln = `rsync -avz ${s} carltonjoseph.com:${d}`;
  execSync(ln);
  console.log(ln);
});
