import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/product.router.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); // allow us to accept JSON data in req.body

const __dirname = path.resolve();

app.use("/api/products", productRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, async () => {
  await connectDB();
  console.log("Server is running on port 5000 🚀");
});
