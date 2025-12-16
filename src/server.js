
import express from "express";
import pool from "./db.js";
const app = express();

app.get("/", function (req, res) {
res.send("Hello Ada!\n");
});

app.listen(3000, () => {
    console.log("🚀 Serveur lancé : http://localhost:3000");
});

// Créer une route GET pour les ressources

app.get("/resources", async function (req, res) {
  const { rows } = await pool.query("SELECT * FROM resources");
res.json(rows);});

// Créer une route GET pour une ressource

app.get("/res/:id", async function (req, res) {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM resources WHERE id = $1", [id]);
res.json(rows);});

// Créer une route POST pour les ressources

app.post("/ajout", async function (req, res) {
    await pool.query("INSERT INTO resources (title, url, description, theme_id, type, is_ada) VALUES ('Introduction à ADA', 'https://ada.dev', 'Guide pour apprendre Ada', 1, 'guide', false)");
res.json('Ajout effectué !')
})

// Créer une route PUT pour les ressources

app.put("/put", async function (req, res) {
   await  pool.query("UPDATE resources SET title = 'Intro Ada' WHERE id=9");
res.json('Modification effectuée !')
})

// Créer une route DELETE pour les ressources

app.delete("/deleteRes/:id", async function (req, res) {
    const { id } = req.params;
    await pool.query("DELETE FROM resources_skills WHERE resource_id = $1", [id]);
    await pool.query("DELETE FROM resources WHERE id=$1", [id])
res.json(`L'élément ${id[0]} a été supprimé de resources`)
})

// Créer les mêmes routes DELETE pour thèmes / skills / resources_skills

app.delete("/deleteThemes/:id", async function (req, res) {
    const { id } = req.params;
    await pool.query("UPDATE resources SET theme_id = null WHERE theme_id=$1", [id]);
    await pool.query("DELETE FROM themes WHERE id=$1", [id])
res.json(`L'élément ${id[0]} a été supprimé de themes`)
})

app.delete("/deleteSkills/:id", async function (req, res) {
    const { id } = req.params;
    await pool.query("DELETE FROM resources_skills WHERE skill_id = $1", [id]);
    await pool.query("DELETE FROM skills WHERE id=$1", [id])
res.json(`L'élément ${id[0]} a été supprimé de skills`)
})

app.delete("/deleteResSkils/:id", async function (req, res) {
    const { id } = req.params;
    await pool.query("DELETE FROM resources_skills WHERE id=$1", [id])
res.json(`L'élément ${id[0]} a été supprimé de resources_skills`)
})

