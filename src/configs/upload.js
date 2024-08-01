import path from "path";
import url from "url";
import crypto from "crypto";
import multer from "multer";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const TEMP_STORAGE = path.resolve(__dirname, "..", "..", "tmp");
const FILE_STORAGE = path.resolve(TEMP_STORAGE, "uploads");

const storage = multer.diskStorage({
  destination: TEMP_STORAGE,
  filename: (request, file, callback) => {
    const fileHash = crypto.randomBytes(10).toString("hex");
    const fileName = `${fileHash}-${file.originalname}`;

    callback(null, fileName);
  },
});

const config = {
  UPLOAD: multer({ storage }),
  TEMP_STORAGE,
  FILE_STORAGE,
};

export default config;
