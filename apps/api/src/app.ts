// Express
import express, { Request, Response } from "express";

// Routes
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";

// Utils
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 4322;

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
