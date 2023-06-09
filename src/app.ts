import cors from "cors";
import express from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import taskRoutes from "./routes/tasks.routes";
import { options } from "./swagger-options";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const specs = swaggerJSDoc(options);

app.use("/api/tasks", taskRoutes);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs));

export const start = () => {
  app.listen(3000);
};
