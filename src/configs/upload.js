import path from "path";
import url from "url";
import crypto from "crypto";
import multer from "multer";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
export const UPLOAD_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const storage = multer.diskStorage({
  destination: TMP_FOLDER,
  filename: (request, file, callback) => {
    const fileHash = crypto.randomBytes(10).toString("hex");
    const fileName = `${fileHash}-${file.originalname}`;

    callback(null, fileName);
  },
});

export const uploadFile = multer({ storage });
