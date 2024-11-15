import mongoose from "mongoose";

const dbURL = process.env.DB_URL;

mongoose.connect(dbURL);

const db = mongoose.connection;

const handleOpen = () => console.log(`✅ Connected to DB: ${dbURL}`);
const handleError = (error) => console.log("❌ DBs Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
