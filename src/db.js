import mongoose from "mongoose";
import Video from "./models/Video";

const DB_PORT = 27017;

const dbURL = `mongodb://127.0.0.1:${DB_PORT}/wetube`;

mongoose.connect(dbURL);

const db = mongoose.connection;

const handleOpen = () => console.log(`✅ Connected to DB: ${dbURL}`);
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
