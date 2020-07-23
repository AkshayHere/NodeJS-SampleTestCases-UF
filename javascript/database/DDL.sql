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
CREATE TABLE IF NOT EXISTS `school-administration-system`.`subject` (
  `subject_code` VARCHAR(20) NOT NULL,
  `subject_name` VARCHAR(225) NOT NULL,
  PRIMARY KEY (`subject_code`));

-- Create Class Table
CREATE TABLE IF NOT EXISTS `school-administration-system`.`classes` (
  `class_code` VARCHAR(20) NOT NULL,
  `class_name` VARCHAR(225) NOT NULL,
  PRIMARY KEY (`class_code`));

-- Create Teacher - Subject Mapping Table
CREATE TABLE IF NOT EXISTS `school-administration-system`.`map_teacher_subject` (
  `id` INT NOT NULL,
  `teacher_email` VARCHAR(100) NOT NULL,
  `subject_code` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`));

-- Create Class - Teacher - Student Mapping Table
CREATE TABLE IF NOT EXISTS `school-administration-system`.`map_class_teacher_student` (
  `id` INT NOT NULL,
  `class_code` VARCHAR(20) NOT NULL,
  `teacher_email` VARCHAR(100) NOT NULL,
  `student_email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`));