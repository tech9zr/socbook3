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

INSERT INTO `category`(`name`) values ("Home & Garden");
INSERT INTO `category`(`name`) values ("Jobs & Education");
INSERT INTO `category`(`name`) values ("Finace");




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

INSERT INTO `tag` (`name`) values("Green grass");
INSERT INTO `tag` (`name`) values("View");
INSERT INTO `tag` (`name`) values("Perfect place");
INSERT INTO `tag` (`name`) values("Bench");


INSERT INTO `tag` (`name`) values("Best job");
INSERT INTO `tag` (`name`) values("Easy job");
INSERT INTO `tag` (`name`) values("Education");
INSERT INTO `tag` (`name`) values("IT");


INSERT INTO `tag` (`name`) values("Bank");
INSERT INTO `tag` (`name`) values("Credit");
INSERT INTO `tag` (`name`) values("Loan");
INSERT INTO `tag` (`name`) values("Debt");




INSERT INTO `bookmark` (`creation_date`,`description`,`title`,`url`,`visible`,`category_id`,`user_id`) VALUES (NOW(),"Sve zivo o kuvanju na nas nacin...","Kulinarstvo","www.serbiancafe.com", true,1,2);
INSERT INTO `bookmark` (`creation_date`,`description`,`title`,`url`,`visible`,`category_id`,`user_id`) VALUES (NOW(),"Sve o sportu...","Sport","www.sport.com", false,2,2);
INSERT INTO `bookmark` (`creation_date`,`description`,`title`,`url`,`visible`,`category_id`,`user_id`) VALUES (NOW(),"TV stream ...","Stream","www.stream.com", false,3,2);
INSERT INTO `bookmark` (`creation_date`,`description`,`title`,`url`,`visible`,`category_id`,`user_id`) VALUES (NOW(),"Sve o vocarstvu...","Vocarstvo","www.vocarstvo.rs", true,4,1);


INSERT INTO `bookmark` (`creation_date`,`description`,`title`,`url`,`visible`,`category_id`,`user_id`) VALUES (NOW(),"Home & Gardening how to make home nice","Home & Gardening","www.houseandgarden.co.uk/outdoor-spaces", true,5,3);
INSERT INTO `bookmark` (`creation_date`,`description`,`title`,`url`,`visible`,`category_id`,`user_id`) VALUES (NOW(),"Jobs & Education, how to get good educatin and even better job","Jobs & Education","www.freelancer.com", true,6,4);
INSERT INTO `bookmark` (`creation_date`,`description`,`title`,`url`,`visible`,`category_id`,`user_id`) VALUES (NOW(),"Some facts about banks","Finace","www.bancaintesa.rs/pocetna.1.html", true,7,5);



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

INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (5,17);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (5,18);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (5,19);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (5,20);


INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (6,21);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (6,22);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (6,23);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (6,24);


INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (7,25);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (7,26);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (7,27);
INSERT INTO `bookmark_tags` (`bookmark_id`,`tag_id`) values (7,28);


INSERT INTO `comment` (`content`,`creation_date`,`bookmark_id`,`user_id`) values ("Ovo je komentar, bla bla bla",NOW(),1,2);
INSERT INTO `comment` (`content`,`creation_date`,`bookmark_id`,`user_id`) values ("I ovo je komentar, bla bla bla",NOW(),1,3);
INSERT INTO `comment` (`content`,`creation_date`,`bookmark_id`,`user_id`) values ("Ponovo  komentar, bla bla bla",NOW(),1,4);

 



