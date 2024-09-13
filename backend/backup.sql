-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: wiman
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `venue_id` int NOT NULL,
  `status` enum('pending','cancelled','confirmed') DEFAULT 'pending',
  `reason_for_cancellation` varchar(255) DEFAULT NULL,
  `repeat_frequency` enum('none','daily','weekly','monthly') DEFAULT 'none',
  `event_name` varchar(255) NOT NULL,
  `repeat_until` date DEFAULT NULL,
  PRIMARY KEY (`booking_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-20','10:00:00','12:00:00',1,'cancelled',NULL,'none','Team Meeting',NULL),(2,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-20','14:00:00','16:00:00',2,'confirmed','User cancelled','none','Project Discussion',NULL),(3,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-20','09:00:00','11:00:00',3,'confirmed',NULL,'weekly','Workshop',NULL),(4,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-20','13:00:00','15:00:00',4,'confirmed','Maintenance issue','none','Event Setup',NULL),(5,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-19','08:00:00','10:00:00',5,'confirmed',NULL,'monthly','Team Planning',NULL),(6,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-20','11:00:00','13:00:00',2,'confirmed',NULL,'daily','Training Session',NULL),(7,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-20','09:00:00','11:00:00',1,'confirmed','admin','none','Conference Meeting',NULL),(8,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-11','13:00:00','15:00:00',2,'confirmed','admin','none','Team Training',NULL),(9,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-22','08:00:00','10:00:00',3,'confirmed','admin','weekly','Project Discussion',NULL),(10,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-11','11:00:00','13:00:00',4,'confirmed',NULL,'none','Workshop',NULL),(11,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-24','15:00:00','17:00:00',5,'confirmed','admin','monthly','Planning Session',NULL),(12,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-25','10:00:00','12:00:00',6,'confirmed','admin','none','Client Meeting',NULL),(13,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-26','14:00:00','16:00:00',7,'confirmed',NULL,'daily','Daily Stand-up',NULL),(14,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-27','09:30:00','11:30:00',8,'confirmed','Technical issues','none','Product Demo',NULL),(15,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-28','13:15:00','15:15:00',9,'confirmed',NULL,'none','Strategy Meeting',NULL),(16,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-29','16:00:00','18:00:00',10,'confirmed',NULL,'weekly','Training Session',NULL),(17,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-30','08:45:00','10:45:00',11,'confirmed','Venue unavailable','monthly','Board Meeting',NULL),(18,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-01','11:00:00','13:00:00',12,'confirmed',NULL,'none','Team Building',NULL),(19,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-02','10:30:00','12:30:00',13,'confirmed',NULL,'none','Review Session',NULL),(20,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-03','14:30:00','16:30:00',14,'confirmed',NULL,'none','Client Presentation',NULL),(21,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-04','09:00:00','11:00:00',15,'confirmed','Personal reasons','none','Interview',NULL),(22,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-05','12:00:00','14:00:00',16,'confirmed',NULL,'monthly','Marketing Workshop',NULL),(23,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-06','15:00:00','17:00:00',17,'confirmed',NULL,'weekly','Sales Training',NULL),(24,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-07','07:30:00','09:30:00',18,'confirmed','Health issues','none','Morning Briefing',NULL),(25,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-08','13:45:00','15:45:00',19,'confirmed',NULL,'none','Budget Planning',NULL),(26,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-09','10:15:00','12:15:00',20,'confirmed',NULL,'none','Product Launch Meeting',NULL);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maintenance`
--

DROP TABLE IF EXISTS `maintenance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maintenance` (
  `issue_id` int NOT NULL AUTO_INCREMENT,
  `room_id` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `reported_by` int DEFAULT NULL,
  `issue_description` text COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('Reported','In Progress','Resolved') COLLATE utf8mb4_general_ci NOT NULL,
  `reported_date` datetime NOT NULL,
  `resolved_date` datetime DEFAULT NULL,
  `resolution_log` text COLLATE utf8mb4_general_ci,
  `image_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`issue_id`),
  KEY `idx_status_reported_date` (`status`,`reported_date`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maintenance`
--

LOCK TABLES `maintenance` WRITE;
/*!40000 ALTER TABLE `maintenance` DISABLE KEYS */;
INSERT INTO `maintenance` VALUES (1,'101A',1,'Leaking faucet in the bathroom','Reported','2024-09-01 09:00:00',NULL,'{\"Problem Class\":\"Major Issue\",\"Requirements To Fix\":\"It needs money!\",\"Set Back\":\"\"}','https://example.com/image1.jpg'),(2,'202B',2,'Air conditioning not working','In Progress','2024-09-02 11:15:00',NULL,'{\"Problem Class\":\"Security\",\"Requirements To Fix\":\"New Door\",\"Set Back\":\"Door cannot hold a door lock anymore\"}','https://example.com/image2.jpg'),(3,'303C',3,'Broken window in the living room','Resolved','2024-08-25 14:30:00','2024-08-26 09:00:00','{\n        \"Problem Class\": \"Structural\",\n        \"Requirements To Fix\": \"Window replacement\",\n        \"Set Back\": \"Delivery of new window delayed\"\n    }','https://example.com/image3.jpg'),(4,'404D',4,'Clogged kitchen sink','Reported','2024-09-03 16:45:00',NULL,NULL,'https://example.com/image4.jpg'),(5,'505E',5,'Noisy air vent','In Progress','2024-09-04 10:00:00',NULL,NULL,'https://example.com/image5.jpg'),(6,'606F',6,'Malfunctioning door lock','Resolved','2024-08-29 12:00:00','2024-08-30 08:30:00','{\n        \"Problem Class\": \"Security\",\n        \"Requirements To Fix\": \"Replace door lock\",\n        \"Set Back\": \"None\"\n    }','https://example.com/image6.jpg'),(7,'707G',7,'Water leakage from ceiling','Reported','2024-09-05 08:15:00',NULL,'{\"Problem Class\":\"Major Issue\",\"Requirements To Fix\":\"Needs money\",\"Set Back\":\"\"}','https://example.com/image7.jpg'),(8,'808H',8,'Power outage in room','Resolved','2024-08-24 19:00:00','2024-08-24 21:00:00','{\n        \"Problem Class\": \"Electrical\",\n        \"Requirements To Fix\": \"Repair electrical circuit\",\n        \"Set Back\": \"Delayed access to power supply\"\n    }','https://example.com/image8.jpg'),(9,'909I',9,'Broken tiles in bathroom','Reported','2024-09-06 13:30:00',NULL,NULL,'https://example.com/image9.jpg'),(10,'1001J',10,'Heating system not working','In Progress','2024-09-07 10:45:00',NULL,NULL,'https://example.com/image10.jpg');
/*!40000 ALTER TABLE `maintenance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `code` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_read` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`notification_id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','booking','Your booking is confirmed for September 17, 2024.','2024-09-10 09:08:58',0),(2,'user2','maintenance','The venue you booked is scheduled for maintenance on the day of your event.','2024-09-10 09:08:58',1),(3,'user3','cancel_booking','Your booking for September 16, 2024 was cancelled.','2024-09-10 09:08:58',0),(4,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','booking','Your booking is confirmed for October 5, 2024.','2024-09-10 09:08:58',0),(5,'user4','maintenance','Your venue has been marked for maintenance on October 12, 2024.','2024-09-10 09:08:58',0);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John Doe','john.doe@example.com'),(2,'Jane Smith','jane.smith@example.com'),(3,'Alice Johnson','alice.johnson@example.com'),(4,'Bob Brown','bob.brown@example.com'),(5,'Charlie Davis','charlie.davis@example.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-13  7:58:30
