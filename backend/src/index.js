import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import authMiddleware from "./middleware/auth.js";
import notesRoutes from "./routes/notes.js";

const PORT = 5000 || process.env.PORT

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Protected route accessed!", user: req.user });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})


