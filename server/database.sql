-- created the database 
CREATE DATABASE alumniDatabase;

-- use the database 
USE alumniDatabase;

-- create tables for storing users information 

CREATE TABLE users (
    id BINARY(16),
    email varchar(50),
    password varchar(100) not null,
    primary key(id) 
);


CREATE TABLE profile (
    username varchar(50),
    email varchar(50),
    phone varchar(12),
    current_address varchar(150),
    batch varchar(20),
    department varchar(30),
    profile_Id varchar(50)
);
-- select all from the table  

SELECT * FROM users;


