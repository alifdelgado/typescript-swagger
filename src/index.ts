import { start } from "./app";
import { createConnection } from "./config/db";

createConnection();
start();
