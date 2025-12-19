
import express from "express";
import pool from "./db.js";
import skillsRouter from './routes/skills.js';
import resourcesRouter from './routes/resources.js';
import themesRouter from './routes/themes.js';
import resourcesSkillsRouter from './routes/resources_skills.js';
import projectsRouter from './routes/projects.js';
const app = express();

app.use('/skills', skillsRouter);
app.use('/resources', resourcesRouter);
app.use('/themes', themesRouter);
app.use('/resources-skills', resourcesSkillsRouter);
app.use('/projects', projectsRouter);

app.get("/", function (req, res) {
res.send("Hello Ada!\n");
});

app.listen(3000, () => {
    console.log("🚀 Serveur lancé : http://localhost:3000");
});




