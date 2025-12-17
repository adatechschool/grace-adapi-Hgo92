
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
    await pool.query("DELETE FROM skills WHERE id=$1", [id]);
res.json(`L'élément ${id[0]} a été supprimé de skills`)
});

app.delete("/deleteResSkils/:id", async function (req, res) {
    const { id } = req.params;
    await pool.query("DELETE FROM resources_skills WHERE id=$1", [id])
res.json(`L'élément ${id[0]} a été supprimé de resources_skills`)
});

// Bonus 
// Ajouter une table projects et la remplir

app.post("/projectsUP", async function (req, res) {
    await pool.query("CREATE TABLE projects (id SERIAL PRIMARY KEY, title TEXT NOT NULL, description TEXT NOT NULL)");
    await pool.query("CREATE TABLE project_skills (project_id INT REFERENCES projects (id), skill_id INT REFERENCES skills (id));");
    await pool.query("CREATE TABLE project_themes (project_id INT REFERENCES projects (id), theme_id INT REFERENCES themes (id));");
    res.json('La table projects a été créée');
});

app.post("/fillProjects", async function (req, res) {
    await pool.query("INSERT INTO projects (title, description) VALUES ('Adatabase', 'Projet autour de SQL'),('Adapi', 'Mise en place d''une API REST'), ('Adataviz', 'Mise en forme d''une API exploitable par les utilisateurs')");
    await pool.query("INSERT INTO project_skills (project_id, skill_id) VALUES (1, 3), (1,4), (2,3), (2,4), (3,1), (3,3), (3,4), (3,5)");
    await pool.query("INSERT INTO project_themes (project_id, theme_id) VALUES (1,2), (1,3), (2,2), (2,3), (3,1), (3,2), (3,3)");
    res.json('Les tables projects, project_skills et project_themes ont été remplies');
})

app.get("/projects", async function (req, res) {
  const { rows } = await pool.query("SELECT * FROM projects");
res.json(rows);});

app.get("/projects/:id", async function (req, res) {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM projects WHERE id=$1", [id]);
res.json(rows);});

app.post("/add-adaquiz", async function (req, res) {
    await pool.query("INSERT INTO projects (title, description) VALUES ('Adaquiz', 'Création d''un quiz')");
    await pool.query("INSERT INTO project_skills (project_id, skill_id) VALUES (4,4)");
    await pool.query("INSERT INTO project_themes (project_id, theme_id) VALUES (4,1)");
res.json('Le projet Adaquiz a été ajouté à la table projects');});

// Ajouter une route GET /skills/:id/resources pour récupérer toutes les ressources associées à une compétence donnée

app.get("/skills/:id/resources", async function (req, res) {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * from resources JOIN resources_skills ON resources.id = resources_skills.resource_id JOIN skills ON skills.id = resources_skills.skill_id WHERE skills.id = $1", [id]);
res.json(rows)
});

// Ajouter une route GET /themes/:id/resources pour récupérer toutes les ressources associées à un thème donné.

app.get("/themes/:id/resources", async function (req, res) {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * from resources WHERE theme_id = $1", [id]);
res.json(rows)
});