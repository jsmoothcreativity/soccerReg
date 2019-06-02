CREATE TABLE Parents
(
ParentID int, 
Parent1Name varchar(25) not null,
Parent1LName varchar(25) not null,
Parent1Address varchar(25) not null,
Parent1City varchar(17) not null,
Parent1State varchar(3) not null,
Parent1ZipCode int(5) not null,
Parent1Numb int(10) not null,
Parent1Email varchar(30) not null,
Parent2Name varchar(25) not null,
Parent2LName varchar(25) not null,
Parent2Address varchar(25) null,
Parent2City varchar(17) null,
Parent2State varchar(3) null,
Parent2ZipCode int(5) null,
Parent2Numb int(10) not null,
Parent2Email varchar(30) not null,
primary key (ParentID)
);

CREATE TABLE Player
(
PlayerId int,
PlayerName varchar(25) not null,
PlayerLastName varchar(25) not null,
PlayerAge int(2) not null,
PlayerHeightFeet int(2) not null,
PlayerHeightInch int(2) not null,
PlayerWeight int(3) not null,
PlayerDoctor varchar(25) not null,
PlayerTeamName varchar(25) not null,
PlayerNumber int(2) not null,
PlayerExperience varchar(15) not null,
PlayerFieldPostion varchar(15), 
primary key (PlayerId)
);

CREATE TABLE Team 
(
teamid int(2),
teamName varchar(25) not null, 
teamCoachName varchar(25) not null,
PlayerNumber int(2) not null,
PlayerFieldPostion varchar(15) not null,
primary key(teamid)
);







