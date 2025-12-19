import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Créer une route GET pour les ressources

router.get("/", async function (req, res) {
  const { rows } = await pool.query("SELECT * FROM resources");
res.json(rows);});

// Créer une route GET pour une ressource

router.get("/:id", async function (req, res) {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM resources WHERE id = $1", [id]);
res.json(rows);});

// Créer une route POST pour les ressources

router.post("/ajout", async function (req, res) {
    await pool.query("INSERT INTO resources (title, url, description, theme_id, type, is_ada) VALUES ('Introduction à ADA', 'https://ada.dev', 'Guide pour apprendre Ada', 1, 'guide', false)");
res.json('Ajout effectué !')
})

// Créer une route PUT pour les ressources

router.put("/put", async function (req, res) {
   await  pool.query("UPDATE resources SET title = 'Intro Ada' WHERE id=9");
res.json('Modification effectuée !')
})

// Créer une route DELETE pour les ressources

router.delete("/delete/:id", async function (req, res) {
    const { id } = req.params;
    await pool.query("DELETE FROM resources_skills WHERE resource_id = $1", [id]);
    await pool.query("DELETE FROM resources WHERE id=$1", [id])
res.json(`L'élément ${id[0]} a été supprimé de resources`)
})

export default router;
