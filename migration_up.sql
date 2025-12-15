CREATE TABLE themes (
    id SERIAL PRIMARY KEY,
    theme TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TYPE resources_types AS ENUM (
    'guide',
    'video',
    'exercice',
    'projet',
    'fiche'
);

CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL, 
    url TEXT NOT NULL, 
    description TEXT NOT NULL, 
    theme_id INT REFERENCES themes(id),
    type resources_types,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_ada BOOLEAN
);

CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE resources_skills (
    id SERIAL PRIMARY KEY, 
    resource_id INT REFERENCES resources (id), 
    skill_id INT REFERENCES skills (id)
);

