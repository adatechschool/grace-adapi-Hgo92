--  Récupérer la liste des thèmes

SELECT theme FROM themes;

-- Récupérer toutes les ressources triées par date de mise à jour

SELECT * FROM resources ORDER BY update_date;

-- Récupérer uniquement le nom et l'url des ressources de type exercice

SELECT title, url FROM resources WHERE type = 'exercice';

-- Récupérer le titre et la description des ressources d'Ada uniquement

SELECT title, description FROM resources WHERE is_ada = 'true';

-- Récupérer les ressources qui ont la compétence JavaScript associée

SELECT * FROM resources 
JOIN resources_skills ON resources.id = resources_skills.resource_id
WHERE resources_skills.skill_id = 1;

-- Récupérer les ressources dont le titre contient le mot "react" (avec ou sans majuscules)

SELECT * from resources WHERE title LIKE '%React%' OR title LIKE '%react%';

-- BONUS 

-- Récupérer la liste des thèmes avec le nombre de ressources par thème

SELECT
  theme,
  COUNT(resources.theme_id) AS Total
FROM themes
JOIN resources ON themes.id = resources.theme_id
GROUP BY theme;

-- Récupérer le nom et l'url de toutes les ressources avec un tableau/liste contenant l'ensemble de leurs skills associés

SELECT 
resources.title, 
resources.url, 
STRING_AGG(skills.name, ', ') AS skills_list
FROM resources 
JOIN resources_skills ON resources.id = resources_skills.resource_id
JOIN skills ON skills.id = resources_skills.skill_id
GROUP BY resources.title, resources.url;

-- Récupérer les 5 ressources les plus récentes avec leur thème

SELECT * FROM resources 
JOIN themes ON themes.id = resources.theme_id 
ORDER BY creation_date 
LIMIT 5;

-- Récupérer toutes les compétences qui ne sont associées à aucune ressource

SELECT * FROM skills 
FULL JOIN resources_skills ON skills.id = resources_skills.skill_id
WHERE resources_skills.resource_id IS NULL;