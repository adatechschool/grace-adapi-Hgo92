import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.delete("/delete/:id", async function (req, res) {
    const { id } = req.params;
    await pool.query("DELETE FROM resources_skills WHERE id=$1", [id])
res.json(`L'élément ${id[0]} a été supprimé de resources_skills`)
});


export default router;