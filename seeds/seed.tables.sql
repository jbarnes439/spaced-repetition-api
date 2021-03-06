BEGIN;

TRUNCATE
  "word",
  "language",
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'admin',
    'Dunder Mifflin Admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'Spanish', 1);

INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
  -- (1, 1, 'entraine toi', 'practice', 2),
  -- (2, 1, 'bonjour', 'hello', 3),
  -- (3, 1, 'maison', 'house', 4),
  -- (4, 1, 'développeur', 'developer', 5),
  -- (5, 1, 'traduire', 'translate', 6),
  -- (6, 1, 'incroyable', 'amazing', 7),
  -- (7, 1, 'chien', 'dog', 8),
  -- (8, 1, 'chat', 'cat', null);
  (1, 1, 'practica', 'practice', 2),
  (2, 1, 'hola', 'hello', 3),
  (3, 1, 'casa', 'house', 4),
  (4, 1, 'desarrollador', 'developer', 5),
  (5, 1, 'traducir', 'translate', 6),
  (6, 1, 'asombrosa', 'amazing', 7),
  (7, 1, 'perro', 'dog', 8),
  (8, 1, 'mono', 'monkey', 9),
  (9, 1, 'coche', 'car', 10),
  (10, 1, 'mira', 'look', 11),
  (11, 1, 'gato', 'cat', null);

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
