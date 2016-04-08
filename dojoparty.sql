-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema dojoparty
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dojoparty
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dojoparty` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `dojoparty` ;

-- -----------------------------------------------------
-- Table `dojoparty`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dojoparty`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `first_name` VARCHAR(255) NULL COMMENT '',
  `last_name` VARCHAR(255) NULL COMMENT '',
  `email` VARCHAR(255) NULL COMMENT '',
  `password` VARCHAR(255) NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dojoparty`.`gifsearches`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dojoparty`.`gifsearches` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `search` VARCHAR(255) NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dojoparty`.`musicsearches`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dojoparty`.`musicsearches` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `search` VARCHAR(255) NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dojoparty`.`users_gifs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dojoparty`.`users_gifs` (
  `gifsearch_id` INT NOT NULL COMMENT '',
  `user_id` INT NOT NULL COMMENT '',
  PRIMARY KEY (`gifsearch_id`, `user_id`)  COMMENT '',
  INDEX `fk_gifsearches_has_users_users1_idx` (`user_id` ASC)  COMMENT '',
  INDEX `fk_gifsearches_has_users_gifsearches_idx` (`gifsearch_id` ASC)  COMMENT '',
  CONSTRAINT `fk_gifsearches_has_users_gifsearches`
    FOREIGN KEY (`gifsearch_id`)
    REFERENCES `dojoparty`.`gifsearches` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_gifsearches_has_users_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `dojoparty`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dojoparty`.`users_music`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dojoparty`.`users_music` (
  `musicsearch_id` INT NOT NULL COMMENT '',
  `user_id` INT NOT NULL COMMENT '',
  PRIMARY KEY (`musicsearch_id`, `user_id`)  COMMENT '',
  INDEX `fk_musicsearches_has_users_users1_idx` (`user_id` ASC)  COMMENT '',
  INDEX `fk_musicsearches_has_users_musicsearches1_idx` (`musicsearch_id` ASC)  COMMENT '',
  CONSTRAINT `fk_musicsearches_has_users_musicsearches1`
    FOREIGN KEY (`musicsearch_id`)
    REFERENCES `dojoparty`.`musicsearches` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_musicsearches_has_users_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `dojoparty`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
