import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";

import AppError from "./utils/AppError.js";
import routes from "./routes/index.js";
import config from "./configs/upload.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(config.FILE_STORAGE));
app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`> [application] running! ${port}`);
});
