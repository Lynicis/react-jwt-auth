CREATE DATABASE reactJwt;
USE reactJwt;
CREATE TABLE users(
	id int AUTO_INCREMENT,
	email varchar(20),
	username varchar(8),
	password varchar(255)
	PRIMARY KEY(id)
);
