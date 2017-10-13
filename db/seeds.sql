USE curriculum_db;
INSERT INTO users (userid, name, password ) values ('ankita', 'ankita', "ankita");
INSERT INTO users (userid, name, password ) values ('tara', 'tara', "tara");
INSERT INTO users (userid, name, password ) values ('jose', 'jose', "jpse");
INSERT INTO users (userid, name, password ) values ('julia', 'julia', "julia");
INSERT INTO users (userid, name, password ) values ('ciarra', 'ciarra', "ciarra");


INSERT INTO course (name, description) values ('html5','entry level course');
INSERT INTO course (name, description) values ('C','fundamentals of programming');
INSERT INTO course (name, description) values ('javascript','Async BS');
INSERT into users_to_course (userid, courseid) values ('ankita', 2);

INSERT into steps (name, courseid) values ('pointers in C', 2);
INSERT into steps (name, courseid) values ('STD in and out in C', 2);
INSERT into steps (name, courseid) values ('loops', 2);




