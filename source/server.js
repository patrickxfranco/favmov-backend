import "dotenv/config";
import settings from "../settings.js";
import routes from "./routes/index.js";
import { exec } from "child_process";
import "express-async-errors";
import express from "express";
import cors from "cors";

exec("npx knex migrate:latest");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(settings.server.port, () => {
	console.log(`Server is running on http://localhost:${settings.server.port}`);
});
