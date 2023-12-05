USE crud

drop table if exists curso
drop table if exists usuarios

CREATE TABLE curso (
  id int NOT NULL AUTO_INCREMENT,
  nomecurso varchar(255) NOT NULL,
  materia varchar(255) NOT NULL,
  professor varchar(255) NOT NULL,
  descricao varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE usuarios (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(255) DEFAULT NULL,
  password varchar(255) DEFAULT NULL
);

insert into usuarios (username, password) values("admin", "$2b$10$0d4CMF2qKlECWXyVrdbmPOXo3SBcsHu/HZvOXjhzj2F.Vzj9ZnCHa")