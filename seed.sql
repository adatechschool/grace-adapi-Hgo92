INSERT INTO themes (theme, description) 
    VALUES 
        ('Frontend','Le terme frontend fait référence à l''interface utilisateur graphique (GUI) avec laquelle vos utilisateurs peuvent interagir directement, telle que les menus de navigation, les éléments de conception, les boutons, les images et les graphiques.'),
        ('Backend','Terme désignant une couche logicielle accédant à des données mais, à l''inverse du frontend, ne gère pas d''interface utilisateur'),
        ('Base de données','Une base de données permet de stocker et de retrouver des données structurées, semi-structurées ou des données brutes ou de l''information, souvent en rapport avec un thème ou une activité ; celles-ci peuvent être de natures différentes et plus ou moins reliées entre elles.'),
        ('DevOps','Le devops est un mouvement en ingénierie informatique et une pratique technique visant à l''unification du développement logiciel et de l''administration des infrastructures informatiques, notamment l''administration système.')
;

INSERT INTO resources (title, url, description, theme_id, type, is_ada)
    VALUES 
        ('Introduction à React', 'https://react.dev', 'Guide pour apprendre React', 1, 'guide', false),
        ('SQL pour débutants','https://example.com/sql','Cours SQL complet', 3, 'video', false),
        ('Exercices JavaScript', 'https://example.com/js', 'Pratique JS', 1, 'exercice', false),
        ('Créer une API en node', 'https://example.com/node', 'Projet node', 2, 'projet', false),
        ('Les Foreign Key sur Postgresql','https://www.postgresql.org/docs/current/tutorial-fk.html', 'Tuto sur les FK de SQL', 3, 'guide', false),
        ('How to Connect to MySQL in VS Code and Run SQL','https://discord.com/channels/1419616123040567377/1428367410486054972/1440282509496684626', 'Comment connecter MySQL à VS Code', 3, 'video', false),
        ('asynchroneFetch','https://discord.com/channels/1419616123040567377/1428367410486054972/1438085624656826458','Fiche sur les fonctions asynchrones', 1, 'fiche', true),
        ('Protocoles HTTP','https://cdn.discordapp.com/attachments/1428367410486054972/1438085564275494986/protocolesHTTP.pdf', 'Les protocoles en HTTP', 4, 'fiche', true)
;

INSERT INTO skills (name)
    VALUES 
    ('JavaScript'),
    ('React'),
    ('SQL'),
    ('PostgreSQL'),
    ('Node.js'),
    ('Java'),
    ('Protocoles Web'),
    ('Python'),
    ('Ruby')
;

INSERT INTO resources_skills (resource_id, skill_id)
    VALUES 
    (1, 1),
    (1, 2), 
    (2, 3),
    (2, 4),
    (3, 1),
    (4, 5),
    (5, 3),
    (5, 4),
    (6, 3),
    (7, 1),
    (7, 5),
    (8, 7)
;
