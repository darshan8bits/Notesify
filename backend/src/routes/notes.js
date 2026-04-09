import express from "express";
import pool from "../config/db.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    try{
        const { title, content } = req.body;
        const userId = req.user.id;

        const result = await pool.query(
            "INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
            [userId, title, content]
        );
        res.json(result.rows[0]);
    } catch(err){
        res.status(500).json({ error: err.message });
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try{
        const userId = req.user.id;

        const result = await pool.query(
            "SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC", 
            [userId]
        );

        res.json(result.rows);
    }catch(err){
        res.send(500).json({ error: err.message });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try{
        const noteId = req.params.id;
        const { title, content } = req.body;
        const userId = req.user.id;

        const result = await pool.query(
            "UPDATE notes SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *", 
            [title, content, noteId, userId]
        );

        if(result.rows.length === 0) {
            return res.status(500).json({ error : "404 not found."});
        }

        res.json(result.rows[0]);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try{
        const noteId = req.params.id;
        const userId = req.user.id;

        const result = await pool.query(
            "DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *", 
            [noteId, userId]
        );

        if(result.rows.length === 0){
            return res.status(404).json({error: "404 not found"});
        }

        res.json({ message: "Note deleted" });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

export default router;