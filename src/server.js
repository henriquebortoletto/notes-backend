import "express-async-errors";
import express from "express";

import { AppError } from "./utils/AppError.js";
import { routes } from "./routes/index.js";

const app = express();

app.use(express.json());
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

app.listen(process.env.PORT || 3001, () =>
  console.log(`> [application] running!`)
);
