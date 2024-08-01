import fs from "fs";
import path from "path";

import config from "../configs/upload.js";

export default class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(config.TEMP_STORAGE, file),
      path.resolve(config.FILE_STORAGE, file)
    );
    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(config.FILE_STORAGE, file);
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    await fs.promises.unlink(filePath);
  }
}
