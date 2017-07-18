
INSERT INTO `role` (`type`) values("USER_ROLE");
INSERT INTO `role` (`type`) values("ADMIN_ROLE");	

INSERT INTO `user` (`user_name`,`user_password`,`first_name`,`last_name`,`status`) VALUES ("admin","admin","FirstName1","LastName1",true);
INSERT INTO `user` (`user_name`,`user_password`,`first_name`,`last_name`,`status`) VALUES ("user","user","FirstName2","LastName2",true);

insert into `user_roles`(`user_id`,`role_id`) values (1,1);
insert into `user_roles`(`user_id`,`role_id`) values (2,2);




