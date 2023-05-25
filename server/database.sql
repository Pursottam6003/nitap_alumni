-- created the database 
CREATE DATABASE alumniDatabase;

-- use the database 
USE alumniDatabase;

-- create tables for storing users information 

CREATE TABLE users (
    id BINARY(16),
    id_text varchar(36) generated always as
        (insert(
            insert(
            insert(
                insert(hex(id),9,0,'-'),
                14,0,'-'),
            19,0,'-'),
            24,0,'-')
        ) virtual,
    email varchar(50) NOT NULL,
    password varchar(100) NOT NULL,
    primary key(id) 
);

CREATE TABLE profile (
    firstName varchar(30) NOT NULL,
    middleName varchar(20) ,
    lastName varchar(20) NOT NULL,
    email varchar(50) NOT NULL,
    phone varchar(15),
    batch varchar(20) NOT NULL,
    department varchar(30) NOT NULL,
    profile_Id varchar(50)
);
-- select all from the table  

-- create a alumnilist table for storing the databse while registration 

CREATE TABLE alumnilist (
    title varchar(5) NOT NULL,
    fullname varchar(30) NOT NULL,
    nationality varchar(15) NOT NULL,
    category  varchar(10),
    religion varchar(15),
    linkedin varchar(50),
    github varchar(50),
    address varchar(70) NOT NULL,
    pincode  varchar(10) NOT NULL,
    state  varchar(20),
    city varchar(20),
    country  varchar(20) NOT NULL,
    phone varchar(14) NOT NULL,
    altPhone varchar(14),
    dob varchar(10),
    email varchar(20) NOT NULL,
    altEmail varchar(20),
    courseCompleted  varchar(20) NOT NULL,
    registrationNo varchar(10),
    rollNo varchar(10),
    discipline  varchar(30),
    gradYear varchar(10),
    sign  LONGBLOB NOT NULL,
    passport LONGBLOB NOT NULL, 
    occupation varchar(30),
    ctc decimal(10,2),
    ongoingCourse varchar(40),
    ongoingDiscipline varchar(40) ,
    ongoingGrad varchar(10),
    preparing varchar(30)
)

CREATE TABLE organisationDetails 
{
    organisation  varchar(100) ,
    -- jobtitle varchar(50),
}
SELECT * FROM users;


