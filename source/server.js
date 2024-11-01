import "dotenv/config";
import settings from "../settings.json" assert { type: "json" };
import routes from "./routes/index.js";
import { exec } from "child_process";
import "express-async-errors";
import express from "express";

exec("npx knex migrate:latest");
const app = express();

app.use(express.json());
app.use(routes);

app.listen(settings.server.port, () => {
	console.log(`Server is running on http://localhost:${settings.server.port}`);
});
