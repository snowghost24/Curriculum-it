DROP DATABASE IF EXISTS curriculum_db;
CREATE DATABASE curriculum_db;
USE curriculum_db;

CREATE TABLE users(
  userid VARCHAR(50) NOT NULL,
  name VARCHAR(50),
  password VARCHAR(10),
  PRIMARY KEY (userid)
);

CREATE TABLE course(
  courseid INTEGER(11) AUTO_INCREMENT NOT NULL,
  name VARCHAR(50),
  description VARCHAR(150),
  PRIMARY KEY (courseid)
);

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE users_to_course(
  signups INTEGER(11) AUTO_INCREMENT NOT NULL,
  userid VARCHAR(50),
  courseid INTEGER(11),
  inprogress BOOLEAN DEFAULT false,
  PRIMARY KEY (signups),
  CONSTRAINT fk_course FOREIGN KEY (courseid) REFERENCES course(courseid),
  CONSTRAINT fk_users FOREIGN KEY (userid) REFERENCES users(userid)
);

CREATE TABLE steps(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  name VARCHAR(50),
  courseid INTEGER(11),
  PRIMARY KEY (id),
CONSTRAINT fk_id_course FOREIGN KEY (courseid) REFERENCES course(courseid)
);

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

select u.name, c.name, uc.inprogress from users u, course c, users_to_course uc where (uc.userid = u.userid) and (uc.courseid = c.courseid);