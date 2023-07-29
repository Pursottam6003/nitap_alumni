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
    admin BOOLEAN DEFAULT false,
    primary key(id) 
);

CREATE TABLE profile (
    profile_Id varchar(50),
    title varchar(5) NOT NULL,
    firstName varchar(64) NOT NULL,
    lastName varchar(64),
    email varchar(50) NOT NULL,
    phone varchar(15),
    PRIMARY KEY(profile_Id)
);

CREATE TABLE alumnilist (
    user_id varchar(50) NOT NULL,
    nationality varchar(15) NOT NULL,
    category  varchar(10),
    religion varchar(16),
    linkedin varchar(50),
    github varchar(50),
    address varchar(128) NOT NULL,
    pincode varchar(10) NOT NULL,
    state  varchar(64) NOT NULL,
    city varchar(64) NOT NULL,
    country  varchar(64) NOT NULL,
    altPhone varchar(14),
    dob varchar(10) NOT NULL,
    altEmail varchar(255),
    courseCompleted  varchar(255) NOT NULL,
    registrationNo varchar(20) NOT NULL,
    rollNo varchar(16),
    discipline  varchar(30),
    gradYear varchar(10),
    sign  varchar(255) DEFAULT NULL,
    passport varchar(255) DEFAULT NULL,
    currentStatus SET('working', 'higher-education', 'preparing') DEFAULT 'preparing',
    isApproved  SET('0', '-1', '1') DEFAULT '0'
);

CREATE TABLE higherEducationDetails (
    user_id varchar(50) NOT NULL,
    ongoingCourseDetails varchar(40),
    ongoingDiscipline varchar(40) ,
    ongoingGradYear varchar(10),
    currentOrganisation varchar(50)
);

CREATE TABLE workingDetails (
    user_id varchar(50) NOT NULL,
    occupation varchar(30),
    ctc decimal(10,2),
    currentOrganisation varchar(50),
    jobtitle varchar(64)
);

CREATE TABLE preparing (
    user_id varchar(50) NOT NULL,
    preparing varchar(100) NOT NULL
);

CREATE TABLE organisationDetails 
(
    organisation  varchar(100) 
);