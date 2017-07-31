INSERT INTO `user` (`user_name`,`user_password`,`first_name`,`last_name`,`status`, `email`) VALUES ("admin","admin","FirstName1","LastName1",true, "admin@admin");
INSERT INTO `user` (`user_name`,`user_password`,`first_name`,`last_name`,`status`, `email`) VALUES ("user","user","FirstName2","LastName2",true, "user@user");
INSERT INTO `user` (`user_name`,`user_password`,`first_name`,`last_name`,`status`, `email`) VALUES ("pera","para","FirstName3","LastName3",true, "pera@pera");
INSERT INTO `user` (`user_name`,`user_password`,`first_name`,`last_name`,`status`, `email`) VALUES ("zika","zika","FirstName4","LastName4",true, "zika@zika");
INSERT INTO `user` (`user_name`,`user_password`,`first_name`,`last_name`,`status`, `email`) VALUES ("mika","mika","FirstName5","LastName5",true, "mika@mika");

INSERT INTO `role` (`type`) values("ROLE_USER");
INSERT INTO `role` (`type`) values("ROLE_ADMIN");	

INSERT INTO `user_roles` (`user_id`,`role_id`) values (1,1);
INSERT INTO `user_roles` (`user_id`,`role_id`) values (1,2);
INSERT INTO `user_roles` (`user_id`,`role_id`) values (2,1);
INSERT INTO `user_roles` (`user_id`,`role_id`) values (3,1);
INSERT INTO `user_roles` (`user_id`,`role_id`) values (4,1);
INSERT INTO `user_roles` (`user_id`,`role_id`) values (5,1);

INSERT INTO `category`(`name`) values ("Kuvanje");
INSERT INTO `category`(`name`) values ("Sport");
INSERT INTO `category`(`name`) values ("Stream");
INSERT INTO `category`(`name`) values ("Vocarstvo");

INSERT INTO `tag` (`name`) values("Corba");
INSERT INTO `tag` (`name`) values("Supa");
INSERT INTO `tag` (`name`) values("Paprikas");
INSERT INTO `tag` (`name`) values("Sos");

INSERT INTO `tag` (`name`) values("Kosarka");
INSERT INTO `tag` (`name`) values("Fudbal");
INSERT INTO `tag` (`name`) values("Tenis");
INSERT INTO `tag` (`name`) values("Odojka");

INSERT INTO `tag` (`name`) values("LFCTV");
INSERT INTO `tag` (`name`) values("SK1");
INSERT INTO `tag` (`name`) values("Arena");
INSERT INTO `tag` (`name`) values("ES1");

INSERT INTO `tag` (`name`) values("Kruska");
INSERT INTO `tag` (`name`) values("Orezivanje");
INSERT INTO `tag` (`name`) values("Prskanje");
INSERT INTO `tag` (`name`) values("Odrzavanje");

INSERT INTO `bookmark` (`creation_date`,`description`,`title`,`url`,`visible`,`category_id`,`user_id`) VALUES (NOW(),"Sve zivo o kuvanju na nas nacin...","Kulinarstvo","www.kulinarstvo.rs", true,1,2);
INSERT INTO `bookmark` (`creation_date`,`description`,`title`,`url`,`visible`,`category_id`,`user_id`) VALUES (NOW(),"Sve o sportu...","Sport","www.sport.rs", false,2,2);
INSERT INTO `bookmark` (`creation_date`,`description`,`title`,`url`,`visible`,`category_id`,`user_id`) VALUES (NOW(),"TV stream ...","Stream","www.stream.rs", false,3,2);
INSERT INTO `bookmark` (`creation_date`,`description`,`title`,`url`,`visible`,`category_id`,`user_id`) VALUES (NOW(),"Sve o vocarstvu...","Vocarstvo","www.vocarstvo.rs", true,4,1);


INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (1,1);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (1,2);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (1,3);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (1,4);

INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (2,5);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (2,6);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (2,7);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (2,8);

INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (3,9);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (3,10);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (3,11);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (3,12);

INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (4,13);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (4,14);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (4,15);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (4,16);













