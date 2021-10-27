create database Login ;
use login;
create table users (
	id int auto_increment unique primary key,
    name varchar(200) unique not null,
    password varchar(200) not null
);

create table data (
	id int auto_increment unique primary key not null,
    user varchar(200) not null,
    title text not null,
    description mediumtext not null,
    constraint datavsuser foreign key (user) references users(name)
);

create user 'loginManger'@'localhost' IDENTIFIED WITH mysql_native_password by 'asdfghjk';
grant all privileges on login.* to 'loginManger'@'localhost';
flush privileges;