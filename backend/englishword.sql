use sys;

create table if not exists users (
	id varchar(100) primary key comment "사용자 로그인 아이디",
    name varchar(100) not null comment "사용자 이름",
    birthday date not null comment "사용자 생년월일",
    password varchar(300) not null comment "로그인 암호, 패스워드"
);

AlTER TABLE users
ADD COLUMN profile_image varchar(300) comment "프로필 이미지 URL";

AlTER TABLE users
ADD COLUMN test 