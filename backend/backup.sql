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
  `venue_id` varchar(255) NOT NULL,
  `status` enum('pending','cancelled','confirmed') DEFAULT 'pending',
  `reason_for_cancellation` varchar(255) DEFAULT NULL,
  `repeat_frequency` enum('none','daily','weekly','monthly') DEFAULT 'none',
  `event_name` varchar(255) NOT NULL,
  `repeat_until` date DEFAULT NULL,
  PRIMARY KEY (`booking_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-20','10:00:00','12:00:00','1','confirmed',NULL,'none','Team Meeting',NULL),(2,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-20','14:00:00','16:00:00','2','cancelled','I Dont Like you','none','Project Discussion',NULL),(3,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-20','09:00:00','11:00:00','3','pending',NULL,'weekly','Workshop',NULL),(4,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-20','13:00:00','15:00:00','4','pending','Maintenance issue','none','Event Setup',NULL),(5,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-19','08:00:00','10:00:00','5','pending',NULL,'monthly','Team Planning',NULL),(6,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-20','11:00:00','13:00:00','2','pending',NULL,'daily','Training Session',NULL),(7,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-20','09:00:00','11:00:00','1','pending','admin','none','Conference Meeting',NULL),(8,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-11','13:00:00','15:00:00','2','pending','admin','none','Team Training',NULL),(9,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-22','08:00:00','10:00:00','3','pending','admin','weekly','Project Discussion',NULL),(10,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-11','11:00:00','13:00:00','4','pending',NULL,'none','Workshop',NULL),(11,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-24','15:00:00','17:00:00','5','pending','admin','monthly','Planning Session',NULL),(12,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-25','10:00:00','12:00:00','6','pending','admin','none','Client Meeting',NULL),(13,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-26','14:00:00','16:00:00','7','pending',NULL,'daily','Daily Stand-up',NULL),(14,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-27','09:30:00','11:30:00','8','pending','Technical issues','none','Product Demo',NULL),(15,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-28','13:15:00','15:15:00','9','pending',NULL,'none','Strategy Meeting',NULL),(16,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-29','16:00:00','18:00:00','10','pending',NULL,'weekly','Training Session',NULL),(17,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-30','08:45:00','10:45:00','11','pending','Venue unavailable','monthly','Board Meeting',NULL),(18,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-01','11:00:00','13:00:00','12','pending',NULL,'none','Team Building',NULL),(19,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-02','10:30:00','12:30:00','13','pending',NULL,'none','Review Session',NULL),(20,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-03','14:30:00','16:30:00','14','pending',NULL,'none','Client Presentation',NULL),(21,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-04','09:00:00','11:00:00','15','pending','Personal reasons','none','Interview',NULL),(22,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-05','12:00:00','14:00:00','16','pending',NULL,'monthly','Marketing Workshop',NULL),(23,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-06','15:00:00','17:00:00','17','pending',NULL,'weekly','Sales Training',NULL),(24,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-07','07:30:00','09:30:00','18','pending','Health issues','none','Morning Briefing',NULL),(25,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-08','13:45:00','15:45:00','19','pending',NULL,'none','Budget Planning',NULL),(26,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-09','10:15:00','12:15:00','20','pending',NULL,'none','Product Launch Meeting',NULL),(27,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-16','18:00:00','19:00:00','LAB1D','pending',NULL,'none','Test',NULL),(28,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-16','17:03:00','19:03:00','LT2B','pending',NULL,'none','Testing',NULL),(29,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-16','18:08:00','19:08:00','TUT1C','pending',NULL,'none','Onoth',NULL),(30,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-24','18:11:00','20:11:00','TUT1C','pending',NULL,'none','New',NULL),(31,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-16','18:14:00','18:14:00','LAB1D','pending',NULL,'none','Test Booking',NULL),(32,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-16','19:27:00','19:28:00','LAB1D','pending',NULL,'none','Test Create',NULL);
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
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `room_id` varchar(10) NOT NULL,
  `building_id` int NOT NULL,
  `capacity` int NOT NULL,
  `type` enum('LECTURE','TUTORIAL','LAB','MEETING') NOT NULL,
  `amenities` json NOT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES ('LAB1D',2,20,'LAB','[\"computer\", \"projector\"]'),('LT1A',1,100,'LECTURE','[\"projector\", \"whiteboard\"]'),('LT2B',1,80,'LECTURE','[\"projector\"]'),('MTG1E',3,10,'MEETING','[\"conference phone\", \"whiteboard\"]'),('TUT1C',2,40,'TUTORIAL','[\"whiteboard\"]');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  `role` enum('user','admin','maintenance') DEFAULT 'user',
  `blocked` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','DANIEL NGOBE','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybE1vSEVWZzY2YnNUamFUekZOTlVBT2E4a0UifQ','admin',0,'2024-09-15 15:09:27'),('user_a1b2c3d4e5f6','Alice Smith','https://example.com/profile/user_a1b2c3d4e5f6','admin',1,'2024-09-14 08:50:53'),('user_g7h8i9j0k1l2','Bob Johnson','https://example.com/profile/user_g7h8i9j0k1l2','admin',1,'2024-09-14 08:50:53'),('user_m3n4o5p6q7r8','Charlie Brown','https://example.com/profile/user_m3n4o5p6q7r8','user',0,'2024-09-14 08:50:53'),('user_y5z6a7b8c9d0','Eve Davis','https://example.com/profile/user_y5z6a7b8c9d0','admin',1,'2024-09-14 08:50:53'),('user_z1y2x3w4v5u6','Frank Maintenance','https://example.com/profile/user_z1y2x3w4v5u6','maintenance',1,'2024-09-14 09:03:35');
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

-- Dump completed on 2024-09-15 17:11:32
