 drop database if exists loginNotes;
drop user if exists 'loginManger Notes Website'@'localhost';

create database loginNotes ;
use loginNotes;
create table users (
	id int auto_increment unique primary key,
    name varchar(200) unique not null,
    password varchar(200) not null
);

create table data (
	id int auto_increment unique primary key not null,
    user varchar(200) not null,
    title text not null,
    description varchar(15000) not null,
    constraint datavsuser foreign key (user) references users(name) on delete cascade
);

create user 'loginManger Notes Website'@'localhost' IDENTIFIED WITH mysql_native_password by 'KrishanKantMehra';
grant all privileges on loginNotes.* to 'loginManger Notes Website'@'localhost';
flush privileges;
