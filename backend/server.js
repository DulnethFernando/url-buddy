import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectMongoDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.route.js";
import urlRoutes from "./routes/url.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(authRoutes);
app.use(urlRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    connectMongoDB();
});