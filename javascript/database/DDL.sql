-- Create Teachers Table
CREATE TABLE IF NOT EXISTS `school-administration-system`.`teachers` (
  `teacher_email` VARCHAR(100) NOT NULL,
  `teacher_name` VARCHAR(225) NOT NULL,
  PRIMARY KEY (`teacher_email`));

-- Create Student Table
CREATE TABLE IF NOT EXISTS `school-administration-system`.`students` (
  `student_email` VARCHAR(100) NOT NULL,
  `student_name` VARCHAR(225) NOT NULL,
  PRIMARY KEY (`student_email`));

-- Create Subject Table
CREATE TABLE IF NOT EXISTS `school-administration-system`.`subjects` (
  `subject_code` VARCHAR(20) NOT NULL,
  `subject_name` VARCHAR(225) NOT NULL,
  PRIMARY KEY (`subject_code`));

-- Create Class Table
CREATE TABLE IF NOT EXISTS `school-administration-system`.`classes` (
  `class_code` VARCHAR(20) NOT NULL,
  `class_name` VARCHAR(225) NOT NULL,
  PRIMARY KEY (`class_code`));

--  Create Mapping Table
CREATE TABLE `school-administration-system`.`mappingTables` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `class_code` VARCHAR(45) NOT NULL,
  `teacher_email` VARCHAR(100) NOT NULL,
  `student_email` VARCHAR(100) NOT NULL,
  `subject_code` VARCHAR(45) NOT NULL,
  `to_delete` INT NOT NULL,
  PRIMARY KEY (`id`));