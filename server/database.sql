-- created the database 
CREATE DATABASE alumniDatabase;

-- use the database 
USE alumniDatabase;

-- create tables for storing users information 

CREATE TABLE users (
    id int not null auto_increment,
    email varchar(50),
    password varchar(100) not null,
    primary key(id) 
);

-- select all from the table  

SELECT * FROM users;
