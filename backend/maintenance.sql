-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2024 at 01:53 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wiman`
--

-- --------------------------------------------------------

--
-- Table structure for table `maintenance`
--

CREATE TABLE `maintenance` (
  `issue_id` int(11) NOT NULL,
  `room_id` varchar(255) DEFAULT NULL,
  `reported_by` int(11) DEFAULT NULL,
  `issue_description` text NOT NULL,
  `status` enum('Reported','In Progress','Resolved') NOT NULL,
  `reported_date` datetime NOT NULL,
  `resolved_date` datetime DEFAULT NULL,
  `resolution_log` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `maintenance`
--

INSERT INTO `maintenance` (`issue_id`, `room_id`, `reported_by`, `issue_description`, `status`, `reported_date`, `resolved_date`, `resolution_log`, `image_url`) VALUES
(1, '101A', 1, 'Leaking faucet in the bathroom', 'Reported', '2024-09-01 09:00:00', NULL, '{\"Problem Class\":\"Major Issue\",\"Requirements To Fix\":\"It needs money!\",\"Set Back\":\"\"}', 'https://example.com/image1.jpg'),
(2, '202B', 2, 'Air conditioning not working', 'In Progress', '2024-09-02 11:15:00', NULL, '{\"Problem Class\":\"Security\",\"Requirements To Fix\":\"New Door\",\"Set Back\":\"Door cannot hold a door lock anymore\"}', 'https://example.com/image2.jpg'),
(3, '303C', 3, 'Broken window in the living room', 'Resolved', '2024-08-25 14:30:00', '2024-08-26 09:00:00', '{\n        \"Problem Class\": \"Structural\",\n        \"Requirements To Fix\": \"Window replacement\",\n        \"Set Back\": \"Delivery of new window delayed\"\n    }', 'https://example.com/image3.jpg'),
(4, '404D', 4, 'Clogged kitchen sink', 'Reported', '2024-09-03 16:45:00', NULL, NULL, 'https://example.com/image4.jpg'),
(5, '505E', 5, 'Noisy air vent', 'In Progress', '2024-09-04 10:00:00', NULL, NULL, 'https://example.com/image5.jpg'),
(6, '606F', 6, 'Malfunctioning door lock', 'Resolved', '2024-08-29 12:00:00', '2024-08-30 08:30:00', '{\n        \"Problem Class\": \"Security\",\n        \"Requirements To Fix\": \"Replace door lock\",\n        \"Set Back\": \"None\"\n    }', 'https://example.com/image6.jpg'),
(7, '707G', 7, 'Water leakage from ceiling', 'Reported', '2024-09-05 08:15:00', NULL, '{\"Problem Class\":\"Major Issue\",\"Requirements To Fix\":\"Needs money\",\"Set Back\":\"\"}', 'https://example.com/image7.jpg'),
(8, '808H', 8, 'Power outage in room', 'Resolved', '2024-08-24 19:00:00', '2024-08-24 21:00:00', '{\n        \"Problem Class\": \"Electrical\",\n        \"Requirements To Fix\": \"Repair electrical circuit\",\n        \"Set Back\": \"Delayed access to power supply\"\n    }', 'https://example.com/image8.jpg'),
(9, '909I', 9, 'Broken tiles in bathroom', 'Reported', '2024-09-06 13:30:00', NULL, NULL, 'https://example.com/image9.jpg'),
(10, '1001J', 10, 'Heating system not working', 'In Progress', '2024-09-07 10:45:00', NULL, NULL, 'https://example.com/image10.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `maintenance`
--
ALTER TABLE `maintenance`
  ADD PRIMARY KEY (`issue_id`),
  ADD KEY `idx_status_reported_date` (`status`,`reported_date`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `maintenance`
--
ALTER TABLE `maintenance`
  MODIFY `issue_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
