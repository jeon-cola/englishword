-- user Database

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

-- test Database
use sys;

CREATE TABLE test (
  test_id bigint auto_increment primary key
);

CREATE TABLE test_part ( 
	part_id bigint auto_increment primary key,
    test_id bigint not null,
    part_no int not null comment "part number",
    
    constraint fk_test_part
		foreign key (test_id) references test(test_id),
	unique key uk_test_part (test_id, part_no)
);

CREATE TABLE test_part_content (
	content_id bigint auto_increment primary key,
    part_id bigint not null comment "part id",
	content_type enum("TEXT","IMAGE") not null comment "content type",
    content text not null comment "content",
    content_order int default 1 comment "표시 순서",
    
    constraint fk_part_content
		foreign key (part_id) references test_part(part_id)
);

CREATE TABLE test_part_question (
	question_id bigint auto_increment primary key,
    part_id bigint not null comment "part id",
    question_text text not null comment "question content",
    question_order int not null comment "질문 순서",
    
    constraint fk_part_question
		foreign key (part_id) references test_part(part_id)
)

-- test progress DataBase

use sys;

CREATE TABLE user_test_progress (
	user_test_id bigint auto_increment primary key,
    user_id bigint not null comment "user id",
    test_id bigint not null comment "test id",
    status enum("NOT_STARTED", "IN_PROGRESS", "COMPLETED") default "NOT_STARTED",
    started_at datetime null,
    completed_at datetime null,
    
    unique key uk_user_test (user_id, test_id),
    foreign key (test_id) references test(test_id)
);

CREATE TABLE user_test_part_progress (
	user_test_part_id bigint auto_increment primary key,
    user_id bigint not null comment "user id",
    test_id bigint not null comment "test_id",
    part_id bigint not null comment "part id",
    status enum("NOT_STARTED", "IN_PROGRESS", "COMPLETED") default "NOT_STARTED",
    completed_at datetime null,
    
    unique key uk_user_test_part (user_id, test_id, part_id),
    foreign key (test_id) references test(test_id),
    foreign key (part_id) references test_part(part_id)
);