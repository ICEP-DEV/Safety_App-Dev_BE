-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 08, 2022 at 08:24 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `GBV`
--

-- --------------------------------------------------------

--
-- Table structure for table `Admin`
--

CREATE TABLE `Admin` (
  `admin_id` int(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `App_user`
--

CREATE TABLE `App_user` (
  `user_id` int(50) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `contact_no` int(11) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `trusted_contact` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Chat_box`
--

CREATE TABLE `Chat_box` (
  `chat_id` int(50) NOT NULL,
  `dateTime` int(6) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `user_id` int(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Incident`
--

CREATE TABLE `Incident` (
  `report_num` int(50) NOT NULL,
  `dateTime` varchar(20) NOT NULL,
  `incidentType` varchar(255) NOT NULL,
  `incident_desc` varchar(500) NOT NULL,
  `location` varchar(50) NOT NULL,
  `user_id` int(50) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Incident`
--

INSERT INTO `Incident` (`report_num`, `dateTime`, `incidentType`, `incident_desc`, `location`, `user_id`, `image`) VALUES
(4, '08/02/2022', 'abuse', 'Thandeka doesnt have code due to abuse', 'pretoria', 12, ''),
(2, '12/02/2022', 'GBV', 'abuse', 'witbank', 15, ''),
(3, '12/02/2022', 'GBV', 'abuse', 'witbank', 2, ''),
(5, '08/02/2021', 'GENDER BASED VIOLENCE', 'My boyfriend abuse me', 'Polokwane', 100, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FImage&psig=AOvVaw0gWqD79TDq6NyQBeJd5kFs&ust=1644433269160000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIjppLnl8PUCFQAAAAAdAAAAABAD');

-- --------------------------------------------------------

--
-- Table structure for table `Incident Portal`
--

CREATE TABLE `Incident Portal` (
  `report_num` int(50) NOT NULL,
  `vec_id` int(50) NOT NULL,
  `feedback_date` datetime(6) NOT NULL,
  `incident_feedback` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `information`
--

CREATE TABLE `information` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `occupation` varchar(256) NOT NULL,
  `gender` varchar(16) DEFAULT NULL,
  `contact_no` varchar(32) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Staff`
--

CREATE TABLE `Staff` (
  `staff_id` int(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Student`
--

CREATE TABLE `Student` (
  `staff_id` int(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `testimonial`
--

CREATE TABLE `testimonial` (
  `testimonial_id` int(11) NOT NULL,
  `testimonial_descr` text NOT NULL,
  `testimonial_date` text NOT NULL,
  `status` text NOT NULL,
  `feedback` text NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `VEC`
--

CREATE TABLE `VEC` (
  `vec_id` int(11) NOT NULL,
  `employee_name` int(11) NOT NULL,
  `contact_num` int(11) NOT NULL,
  `office_num` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `chat_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `App_user`
--
ALTER TABLE `App_user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `Chat_box`
--
ALTER TABLE `Chat_box`
  ADD PRIMARY KEY (`chat_id`);

--
-- Indexes for table `Incident`
--
ALTER TABLE `Incident`
  ADD PRIMARY KEY (`report_num`);

--
-- Indexes for table `Incident Portal`
--
ALTER TABLE `Incident Portal`
  ADD PRIMARY KEY (`report_num`);

--
-- Indexes for table `information`
--
ALTER TABLE `information`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `Staff`
--
ALTER TABLE `Staff`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `Student`
--
ALTER TABLE `Student`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `testimonial`
--
ALTER TABLE `testimonial`
  ADD PRIMARY KEY (`testimonial_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `VEC`
--
ALTER TABLE `VEC`
  ADD PRIMARY KEY (`vec_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Admin`
--
ALTER TABLE `Admin`
  MODIFY `admin_id` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `App_user`
--
ALTER TABLE `App_user`
  MODIFY `user_id` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Chat_box`
--
ALTER TABLE `Chat_box`
  MODIFY `chat_id` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Incident`
--
ALTER TABLE `Incident`
  MODIFY `report_num` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Incident Portal`
--
ALTER TABLE `Incident Portal`
  MODIFY `report_num` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `information`
--
ALTER TABLE `information`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Staff`
--
ALTER TABLE `Staff`
  MODIFY `staff_id` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Student`
--
ALTER TABLE `Student`
  MODIFY `staff_id` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `testimonial`
--
ALTER TABLE `testimonial`
  MODIFY `testimonial_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `VEC`
--
ALTER TABLE `VEC`
  MODIFY `vec_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
