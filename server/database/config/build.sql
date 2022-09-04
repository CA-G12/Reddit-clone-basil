BEGIN;

DROP TABLE IF EXISTS users, posts, comments, likes CASCADE;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(250) NOT NULL,
  img_url TEXT,
  password TEXT NOT NULL
);

CREATE TABLE posts(
  id SERIAL PRIMARY KEY,
  post TEXT,
  post_date VARCHAR(200),
  user_id INT,
  foreign key (user_id) references users(id)
);

CREATE TABLE comments(
  id SERIAL PRIMARY KEY,
  content TEXT,
  user_id INT,
  post_id INT,
  foreign key (user_id) references users(id),
  constraint fk_post_id foreign key(post_id) references posts(id)
);

CREATE TABLE likes(
  id SERIAL PRIMARY KEY,
  user_id INT,
  post_id INT,
  foreign key (user_id) references users(id),
  constraint fk_post_id foreign key(post_id) references posts(id)
);

COMMIT;