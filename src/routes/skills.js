import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.get("/:id", async function (req, res) {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM skills WHERE id = $1", [id]);
res.json(rows);});

router.delete("/:id", async function (req, res) {
    const { id } = req.params;
    await pool.query("DELETE FROM resources_skills WHERE skill_id = $1", [id]);
    await pool.query("DELETE FROM skills WHERE id=$1", [id]);
res.json(`L'élément ${id[0]} a été supprimé de skills`)
});

router.get("/:id/resources", async function (req, res) {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * from resources JOIN resources_skills ON resources.id = resources_skills.resource_id JOIN skills ON skills.id = resources_skills.skill_id WHERE skills.id = $1", [id]);
res.json(rows)
});

export default router;