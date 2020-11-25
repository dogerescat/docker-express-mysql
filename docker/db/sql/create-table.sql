DROP TABLE IF EXISTS `user`;

CREATE TABLE IF NOT EXISTS `user` (
    `id` INT(20) AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`id`)
)DEFAULT CHARSET=utf8 COLLATE=utf8_bin;