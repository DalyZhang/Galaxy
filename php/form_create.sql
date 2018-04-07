-- 建表语句
CREATE TABLE `app_form` (
	`id` smallint(6) NOT NULL AUTO_INCREMENT,
	`name` tinytext COLLATE utf8_bin NOT NULL,
	`gender` tinyint(4) NOT NULL,
	`school` tinyint(4) NOT NULL,
	`dorm` tinytext COLLATE utf8_bin NOT NULL,
	`tele` char(11) COLLATE utf8_bin NOT NULL,
	`first` tinyint(4) NOT NULL,
	`second` tinyint(4) NOT NULL,
	`obey` tinyint(1) NOT NULL,
	`info` varchar(100) COLLATE utf8_bin NOT NULL,
	`time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=0;