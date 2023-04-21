-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema foodapp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema foodapp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `foodapp` DEFAULT CHARACTER SET utf8 ;
USE `foodapp` ;

-- -----------------------------------------------------
-- Table `foodapp`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodapp`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` BINARY(60) NOT NULL,
  `balance` DOUBLE NOT NULL DEFAULT 0.00,
  `fname` VARCHAR(45) NOT NULL,
  `lname` VARCHAR(45) NOT NULL,
  `user_type` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  UNIQUE INDEX ` email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foodapp`.`restaurants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodapp`.`restaurants` (
  `restaurant_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NULL,
  `address` VARCHAR(255) NOT NULL,
  `image` MEDIUMTEXT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`restaurant_id`),
  UNIQUE INDEX `restaurant_id_UNIQUE` (`restaurant_id` ASC),
  INDEX `FK_users_restaurants_idx` (`user_id` ASC),
  CONSTRAINT `FK_users_restaurants`
    FOREIGN KEY (`user_id`)
    REFERENCES `foodapp`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foodapp`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodapp`.`orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `price` DOUBLE(10,2) NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT 0,
  `restaurant_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE INDEX `order_id_UNIQUE` (`order_id` ASC),
  INDEX `FK_users_orders_idx` (`user_id` ASC),
  INDEX `FK_restaurants_orders_idx` (`restaurant_id` ASC),
  CONSTRAINT `FK_restaurants_orders`
    FOREIGN KEY (`restaurant_id`)
    REFERENCES `foodapp`.`restaurants` (`restaurant_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_users_orders`
    FOREIGN KEY (`user_id`)
    REFERENCES `foodapp`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foodapp`.`menus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodapp`.`menus` (
  `menu_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `price` DOUBLE(10,2) NOT NULL,
  `restaurant_id` INT NOT NULL,
  PRIMARY KEY (`menu_id`),
  UNIQUE INDEX `menu_id_UNIQUE` (`menu_id` ASC),
  INDEX `FK_restaurants_menus_idx` (`restaurant_id` ASC),
  CONSTRAINT `FK_restaurants_menus`
    FOREIGN KEY (`restaurant_id`)
    REFERENCES `foodapp`.`restaurants` (`restaurant_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `foodapp`.`order_menus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodapp`.`order_menus` (
  `order_menu_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `menu_id` INT NOT NULL,
  PRIMARY KEY (`order_menu_id`),
  UNIQUE INDEX `order_menu_id_UNIQUE` (`order_menu_id` ASC),
  INDEX `fk_orders_menus_idx` (`order_id` ASC),
  INDEX `fk_menus_orders_idx` (`menu_id` ASC),
  CONSTRAINT `fk_orders_menus`
    FOREIGN KEY (`order_id`)
    REFERENCES `foodapp`.`orders` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_menus_orders`
    FOREIGN KEY (`menu_id`)
    REFERENCES `foodapp`.`menus` (`menu_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
