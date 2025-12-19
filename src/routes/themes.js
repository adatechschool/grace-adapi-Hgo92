import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.get("/", async function (req, res) {
  const { rows } = await pool.query("SELECT * FROM themes");
res.json(rows);});

router.get("/:id", async function (req, res) {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM themes WHERE id = $1", [id]);
res.json(rows);});

router.delete("/delete/:id", async function (req, res) {
    const { id } = req.params;
    await pool.query("UPDATE resources SET theme_id = null WHERE theme_id=$1", [id]);
    await pool.query("DELETE FROM themes WHERE id=$1", [id])
res.json(`L'élément ${id[0]} a été supprimé de themes`)
})

// Ajouter une route GET /themes/:id/resources pour récupérer toutes les ressources associées à un thème donné.

router.get("/:id/resources", async function (req, res) {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * from resources WHERE theme_id = $1", [id]);
res.json(rows)
});

export default router;