-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 25, 2021 at 07:27 PM
-- Server version: 5.7.34-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `freedbtech_covidDB`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`freedbtech_covidDB`@`%` PROCEDURE `userAddOrEdit` (IN `_id` INT, IN `_username` VARCHAR(25), IN `_name` VARCHAR(25), IN `_lastname` VARCHAR(25), IN `_age` INT, IN `_temperature` DECIMAL(3,1))  BEGIN 
  IF _id = 0 THEN
    INSERT INTO users (username, name, lastname, age, temperature)
    VALUES (_username, _name, _lastname, _age, _temperature);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE users
    SET
    temperature = _temperature
    WHERE username = _username;
  END IF;

  SELECT _id AS 'id';
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `name` varchar(25) NOT NULL,
  `lastname` varchar(25) NOT NULL,
  `age` int(3) NOT NULL,
  `temperature` decimal(3,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `lastname`, `age`, `temperature`) VALUES
(1, 'deras101', 'deras202', 'Deras', 21, '36.5'),
(2, 'beto20', 'Jose', 'Roberto', 21, '50.0'),
(43, '0zy121061', 'Oswaldo', 'Deras', 60, '39.8'),
(44, 'e.aldana', 'Elisa', 'Aldana', 39, '35.8'),
(45, 'chamba30', 'Salvador', 'Fernandez', 25, '37.8'),
(46, 'juanita1000', 'Juana', 'Deras', 40, '99.9');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD UNIQUE KEY `username_3` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
