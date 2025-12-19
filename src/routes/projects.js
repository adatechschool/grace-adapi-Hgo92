import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Bonus 
// Ajouter une table projects et la remplir

router.post("/UP", async function (req, res) {
    await pool.query("CREATE TABLE projects (id SERIAL PRIMARY KEY, title TEXT NOT NULL, description TEXT NOT NULL)");
    await pool.query("CREATE TABLE project_skills (project_id INT REFERENCES projects (id), skill_id INT REFERENCES skills (id));");
    await pool.query("CREATE TABLE project_themes (project_id INT REFERENCES projects (id), theme_id INT REFERENCES themes (id));");
    res.json('La table projects a été créée');
});

router.post("/fill", async function (req, res) {
    await pool.query("INSERT INTO projects (title, description) VALUES ('Adatabase', 'Projet autour de SQL'),('Adapi', 'Mise en place d''une API REST'), ('Adataviz', 'Mise en forme d''une API exploitable par les utilisateurs')");
    await pool.query("INSERT INTO project_skills (project_id, skill_id) VALUES (1, 3), (1,4), (2,3), (2,4), (3,1), (3,3), (3,4), (3,5)");
    await pool.query("INSERT INTO project_themes (project_id, theme_id) VALUES (1,2), (1,3), (2,2), (2,3), (3,1), (3,2), (3,3)");
    res.json('Les tables projects, project_skills et project_themes ont été remplies');
})

// Ajouter les routes correspondantes à la table projets

router.get("/", async function (req, res) {
  const { rows } = await pool.query("SELECT * FROM projects");
res.json(rows);});

router.get("/:id", async function (req, res) {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM projects WHERE id=$1", [id]);
res.json(rows);});

router.post("/add-adaquiz", async function (req, res) {
    await pool.query("INSERT INTO projects (title, description) VALUES ('Adaquiz', 'Création d''un quiz')");
    await pool.query("INSERT INTO project_skills (project_id, skill_id) VALUES (4,4)");
    await pool.query("INSERT INTO project_themes (project_id, theme_id) VALUES (4,1)");
res.json('Le projet Adaquiz a été ajouté à la table projects');});

router.put("/put/:id", async function (req, res) {
    const { id } = req.params;
    const { title } = req.body;
    await pool.query("UPDATE resources SET title = $1 WHERE id=$2", [title, id]);
res.json(`Le titre du projet ${id} est maintenant ${title}`);
})

router.delete("/delete/:id", async function (req, res) {
    const { id } = req.params;
    await pool.query("DELETE FROM projects WHERE id=$1", [id]);
res.json(`Le projet ${id} a été supprimé de la table projects`)
})

export default router;