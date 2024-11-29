import express from "express";
import authRoutes from "./auth/auth.routes";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 4322;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
