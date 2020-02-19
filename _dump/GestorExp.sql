-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Gestorexp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Gestorexp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Gestorexp` DEFAULT CHARACTER SET utf8 ;
USE `Gestorexp` ;

-- -----------------------------------------------------
-- Table `Gestorexp`.`perfil_prodep`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Gestorexp`.`perfil_prodep` (
  `codigo` INT NOT NULL,
  `anio` DATE NOT NULL,
  `vigencia` DATE NOT NULL,
  `duracion` VARCHAR(10) NOT NULL,
  `ruta_dictamen` BLOB NOT NULL,
  `ruta_exp` BLOB NOT NULL,
  `apoyo` INT NOT NULL,
  PRIMARY KEY (`codigo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Gestorexp`.`profesor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Gestorexp`.`profesor` (
  `codigo` VARCHAR(10) NOT NULL,
  `areadedicacion` VARCHAR(40) NOT NULL,
  `disciplinadedicacion` VARCHAR(40) NOT NULL,
  `id_perfil` INT NULL,
  PRIMARY KEY (`codigo`),
  INDEX `FK_perfil_profesor_idx` (`id_perfil` ASC),
  CONSTRAINT `FK_perfil_profesor`
    FOREIGN KEY (`id_perfil`)
    REFERENCES `Gestorexp`.`perfil_prodep` (`codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Gestorexp`.`cuerpo_academico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Gestorexp`.`cuerpo_academico` (
  `clave_cuerpo` VARCHAR(10) NOT NULL,
  `anio` DATE NOT NULL,
  `nivel` VARCHAR(30) NOT NULL,
  `nombre_cuerpo` VARCHAR(30) NOT NULL,
  `ruta_dictamen` BLOB NOT NULL,
  `ruta_exp` BLOB NOT NULL,
  PRIMARY KEY (`clave_cuerpo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Gestorexp`.`integrantes_cuerpo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Gestorexp`.`integrantes_cuerpo` (
  `id` INT NOT NULL,
  `tipo` VARCHAR(40) NOT NULL,
  `clave_cuerpo` VARCHAR(10) NOT NULL,
  `codigo_profesor` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_integrante_profesor_idx` (`codigo_profesor` ASC),
  INDEX `FK_cuerpo_integrante_idx` (`clave_cuerpo` ASC),
  CONSTRAINT `FK_integrante_profesor`
    FOREIGN KEY (`codigo_profesor`)
    REFERENCES `Gestorexp`.`profesor` (`codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_cuerpo_integrante`
    FOREIGN KEY (`clave_cuerpo`)
    REFERENCES `Gestorexp`.`cuerpo_academico` (`clave_cuerpo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
