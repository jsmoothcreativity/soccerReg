CREATE TABLE Payment
(
PayeeID int(3),
PayeeName varchar(25) not null,
PayeeEmail varchar(25) not null,
PayeeAddress varchar (25) not null,
PayeePostCode int(5) not null,
PayeeCardType varchar(12) not null,
PayeeCardNum int(12) not null,
PayeeCode int(3) not null,
PayeeExpDate varchar(12),
Primary Key(PayeeID)
);