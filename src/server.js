
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

app.get("/res1", async function (req, res) {
  const { rows } = await pool.query("SELECT * FROM resources WHERE id = 1");
res.json(rows);});

// Créer une route POST pour les ressources

app.post("/ajout", (req, res) => {
    pool.query("INSERT INTO resources (title, url, description, theme_id, type, is_ada) VALUES ('Introduction à Ruby', 'https://ruby.dev', 'Guide pour apprendre Ruby', 1, 'guide', false)");
res.json('Ajout effectué !')
})

// Créer une route PUT pour les ressources

app.put("/put", (req, res) => {
    pool.query("INSERT INTO resources (title, url, description, theme_id, type, is_ada) VALUES ('Introduction à Cobol', 'https://cobol.dev', 'Guide pour apprendre Cobol', 1, 'guide', false)");
res.json('Ajout (put) effectué !')
})

// Créer une route DELETE pour les ressources


app.delete("/deleteRes", (req, res) => {
    pool.query("DROP TABLE resources CASCADE")
res.json('La table "resources" a été supprimée')
})

// Créer les mêmes routes DELETE pour thèmes / skills / resources_skills

app.delete("/deleteThemes", (req, res) => {
    pool.query("DROP TABLE themes CASCADE")
res.json('La table "themes" a été supprimée')
})

app.delete("/deleteSkills", (req, res) => {
    pool.query("DROP TABLE skills CASCADE")
res.json('La table "skills" a été supprimée')
})

app.delete("/deleteResSkils", (req, res) => {
    pool.query("DROP TABLE resources_skills CASCADE")
res.json('La table "resources_skills" a été supprimée')
})

