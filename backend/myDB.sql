-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: wiman
-- ------------------------------------------------------
-- Server version	8.0.36

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
  `user_id` varchar(255) DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  `booking_date` date DEFAULT NULL,
  `start_time` varchar(255) DEFAULT NULL,
  `end_time` varchar(255) DEFAULT NULL,
  `status` enum('Confirmed','Pending','Cancelled') DEFAULT 'Pending',
  `venue_code` varchar(255) DEFAULT NULL,
  `event_name` varchar(255) DEFAULT NULL,
  `category` enum('Lecture','Tutorial','Exam','Meeting','Lab') DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `frequency` varchar(255) DEFAULT NULL,
  `repeat_until` date DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `booking_date` (`booking_date`),
  KEY `user_id` (`user_id`,`room_id`,`booking_date`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (7,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',50,'2024-09-08','02:09:00','02:09:00','Pending','CLM37','name','Lecture','2024-09-08','Once',NULL),(15,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',34,'2024-09-11','04:47','04:48','Pending','B121','Some event','Lecture','2024-09-13','every Wednesday','2024-09-12'),(16,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',35,'2024-09-11','16:34','16:36','Pending','B111','event','Lecture','2024-09-24','every Monday','2024-09-26'),(17,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',46,'2024-09-11','05:06','05:07','Pending','CM2','sss','Lecture','2024-09-06','every Wednesday','2024-09-14'),(18,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',46,'2024-09-11','05:06','05:07','Pending','CM2','sss','Lecture','2024-09-06','once','2024-09-14'),(19,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',45,'2024-09-11','05:06','05:07','Pending','CM1','sss','Lecture','2024-09-06','every Wednesday','2024-09-14'),(20,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',34,'2024-09-11','17:23','17:25','Pending','B121','emmme','Lecture','2024-09-14','every Thursday','2024-09-21'),(21,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',34,'2024-09-11','17:23','17:25','Pending','B121','emmme','Lecture','2024-09-14','every Thursday','2024-09-21'),(22,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',34,'2024-09-11','17:23','17:25','Pending','B121','emmme','Lecture','2024-09-14','every Thursday','2024-09-21'),(23,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',34,'2024-09-11','17:23','17:25','Pending','B121','emmme','Lecture','2024-09-14','every Thursday','2024-09-21'),(24,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',34,'2024-09-11','17:23','17:25','Pending','B121','emmme','Lecture','2024-09-14','every Thursday','2024-09-21'),(25,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',34,'2024-09-11','17:23','17:25','Pending','B121','emmme','Lecture','2024-09-14','every Thursday','2024-09-21'),(26,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',34,'2024-09-11','17:23','17:25','Pending','B121','emmme','Lecture','2024-09-14','every Thursday','2024-09-21'),(27,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',34,'2024-09-11','17:23','17:25','Pending','B121','emmme','Lecture','2024-09-14','once','2024-09-21'),(28,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',34,'2024-09-11','17:33','05:35','Pending','B121','mm','Lecture','2024-10-04','every Monday','2024-09-12'),(29,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',34,'2024-09-11','17:33','05:35','Pending','B121','mm','Lecture','2024-10-04','once','2024-09-12'),(30,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',34,'2024-09-11','17:33','05:35','Pending','B121','mm','Lecture','2024-10-04','once','2024-09-12'),(31,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',34,'2024-09-11','17:37','17:39','Pending','B121','s','Lecture','2024-09-25','once',NULL),(32,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',35,'2024-09-11','16:34','16:36','Pending','B111','event','Lecture','2024-09-24','once',NULL),(33,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',34,'2024-09-11','19:44','19:44','Pending','B121','name ','Lecture','2024-09-18','once',NULL),(34,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',43,'2024-09-11','21:45','17:48','Pending','OS4','','Lecture','2024-10-03','once',NULL),(35,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',43,'2024-09-11','21:45','17:48','Pending','OS4','sss','Lecture','2024-10-03','once',NULL),(36,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',43,'2024-09-11','21:45','17:48','Pending','OS4','sss','Lecture','2024-10-03','once',NULL),(37,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',42,'2024-09-11','20:15','20:19','Pending','OS3','ass','Lecture','2024-09-19','once',NULL),(38,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',42,'2024-09-11','20:15','20:19','Pending','OS3','ass','Lecture','2024-09-19','once',NULL),(39,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',34,'2024-09-11','23:28','20:33','Pending','B121','','Lecture','2024-09-12','once',NULL),(40,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',34,'2024-09-11','23:28','20:33','Pending','B121','','Lecture','2024-09-12','every Monday','2024-09-12'),(41,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',34,'2024-09-11','23:28','20:33','Pending','B121','','Lecture','2024-09-12','every Monday','2024-09-12'),(42,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',42,'2024-09-11','23:28','20:33','Pending','OS3','','Lecture','2024-09-12','every Monday','2024-09-12'),(43,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',45,'2024-09-11','20:51','20:53','Pending','CM1','s','Lecture','2024-09-12','once',NULL),(44,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',28,'2024-09-11','08:53','20:56','Pending','C312','ss','Lecture','2024-09-12','once',NULL),(45,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',28,'2024-09-11','08:53','20:56','Pending','C312','ss','Lecture','2024-09-12','every Tuesday Tuesday','2024-09-25'),(46,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',28,'2024-09-11','08:53','20:56','Pending','C312','ss','Lecture','2024-09-12','every Tuesday','2024-09-25'),(47,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',28,'2024-09-11','08:57','20:03','Pending','C312','sssass','Lecture','2024-09-11','once',NULL),(48,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',28,'2024-09-11','08:57','20:03','Pending','C312','sssass','Lecture','2024-09-11','every Tuesday','2024-10-05'),(49,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',28,'2024-09-11','09:44','11:44','Pending','C312','event','Lecture','2024-09-14','once',NULL),(50,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',50,'2024-09-11','09:59','11:02','Pending','CLM37','ddd','Lecture','2024-09-20','once',NULL),(51,'user_2lWE6B1W7gKhg0qdSnaCzzcMphZ',31,'2024-09-11','10:31','11:31','Pending','P114','nm','Lecture','2024-09-26','once',NULL);
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
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `building_name` varchar(255) DEFAULT NULL,
  `venue_code` varchar(50) DEFAULT NULL,
  `venue_size` int DEFAULT NULL,
  `type` enum('LECTURE','TUTORIAL','LAB','MEETING') DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `amenities` text,
  `pictures` text,
  PRIMARY KEY (`room_id`),
  UNIQUE KEY `venue_code` (`venue_code`),
  KEY `venue_code_2` (`venue_code`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (2,'Humphry Raikes','C6',132,'LECTURE','Ground floor','[\"Projector\", \"Whiteboard\", \"Wi-Fi\", \"Air Conditioning\"]','[\"https://example.com/images/humphry_raikes_c6_1.jpg\", \"https://example.com/images/humphry_raikes_c6_2.jpg\"]'),(28,'Humphry Raikes','C312',144,'LECTURE','3rd floor','[\"Projector\", \"Whiteboard\", \"Wi-Fi\", \"Air Conditioning\"]','[\"https://example.com/images/humphry_raikes_c312_1.jpg\", \"https://example.com/images/humphry_raikes_c312_2.jpg\"]'),(29,'Humphry Raikes','C9',312,'LECTURE','Ground floor','[\"Projector\", \"Whiteboard\", \"Wi-Fi\", \"Air Conditioning\"]','[\"https://example.com/images/humphry_raikes_c9_1.jpg\", \"https://example.com/images/humphry_raikes_c9_2.jpg\"]'),(30,'Physics','P216',76,'TUTORIAL','2nd floor','[\"Projector\", \"Whiteboard\", \"Wi-Fi\"]','[\"https://example.com/images/physics_p216_1.jpg\", \"https://example.com/images/physics_p216_2.jpg\"]'),(31,'Physics','P114',164,'LECTURE','1st floor','[\"Projector\", \"Whiteboard\", \"Wi-Fi\", \"Air Conditioning\"]','[\"https://example.com/images/physics_p114_1.jpg\", \"https://example.com/images/physics_p114_2.jpg\"]'),(32,'Physics','P115',246,'LECTURE','1st floor','[\"Projector\", \"Whiteboard\", \"Wi-Fi\", \"Air Conditioning\"]','[\"https://example.com/images/physics_p115_1.jpg\", \"https://example.com/images/physics_p115_2.jpg\"]'),(33,'Biology','B14',42,'TUTORIAL','Ground Floor','[\"Whiteboard\", \"Wi-Fi\"]','[\"https://example.com/images/biology_b14_1.jpg\", \"https://example.com/images/biology_b14_2.jpg\"]'),(34,'Biology','B121',84,'LECTURE','1st floor','[\"Projector\", \"Whiteboard\", \"Wi-Fi\", \"Air Conditioning\"]','[\"https://example.com/images/biology_b121_1.jpg\", \"https://example.com/images/biology_b121_2.jpg\"]'),(35,'Biology','B111',201,'LECTURE','1st floor','[\"Projector\", \"Whiteboard\", \"Wi-Fi\", \"Air Conditioning\"]','[\"https://example.com/images/biology_b111_1.jpg\", \"https://example.com/images/biology_b111_2.jpg\"]'),(36,'Oppenheimer Life Sciences','OS9',72,'TUTORIAL','Lower Ground','[\"Whiteboard\", \"Wi-Fi\"]','[\"https://example.com/images/oppenheimer_os9_1.jpg\", \"https://example.com/images/oppenheimer_os9_2.jpg\"]'),(37,'Oppenheimer Life Sciences','OS5',72,'TUTORIAL','Lower Ground','[\"Whiteboard\", \"Wi-Fi\"]','[\"https://example.com/images/oppenheimer_os5_1.jpg\", \"https://example.com/images/oppenheimer_os5_2.jpg\"]'),(38,'Oppenheimer Life Sciences','OS6',72,'TUTORIAL','Lower Ground','[\"Whiteboard\", \"Wi-Fi\"]','[\"https://example.com/images/oppenheimer_os6_1.jpg\", \"https://example.com/images/oppenheimer_os6_2.jpg\"]'),(39,'Oppenheimer Life Sciences','OS7',72,'TUTORIAL','Lower Ground','[\"Whiteboard\", \"Wi-Fi\"]','[\"https://example.com/images/oppenheimer_os7_1.jpg\", \"https://example.com/images/oppenheimer_os7_2.jpg\"]'),(40,'Oppenheimer Life Sciences','OS8',72,'TUTORIAL','Lower Ground','[\"Whiteboard\", \"Wi-Fi\"]','[\"https://example.com/images/oppenheimer_os8_1.jpg\", \"https://example.com/images/oppenheimer_os8_2.jpg\"]'),(41,'Oppenheimer Life Sciences','OS2',205,'LECTURE','Lower Ground','[\"Projector\", \"Whiteboard\", \"Wi-Fi\", \"Air Conditioning\"]','[\"https://example.com/images/oppenheimer_os2_1.jpg\", \"https://example.com/images/oppenheimer_os2_2.jpg\"]'),(42,'Oppenheimer Life Sciences','OS3',205,'LECTURE','Lower Ground','[\"Projector\", \"Whiteboard\", \"Wi-Fi\", \"Air Conditioning\"]','[\"https://example.com/images/oppenheimer_os3_1.jpg\", \"https://example.com/images/oppenheimer_os3_2.jpg\"]'),(43,'Oppenheimer Life Sciences','OS4',258,'LECTURE','Lower Ground','[\"Projector\", \"Whiteboard\", \"Wi-Fi\", \"Air Conditioning\"]','[\"https://example.com/images/oppenheimer_os4_1.jpg\", \"https://example.com/images/oppenheimer_os4_2.jpg\"]'),(44,'Oppenheimer Life Sciences','OS1',300,'LECTURE','Lower Ground','[\"Projector\", \"Whiteboard\", \"Wi-Fi\", \"Air Conditioning\"]','[\"https://example.com/images/oppenheimer_os1_1.jpg\", \"https://example.com/images/oppenheimer_os1_2.jpg\"]'),(45,'Chamber of Mines','CM1',128,'LECTURE','Lower Ground','[\"Projector\", \"Whiteboard\", \"Wi-Fi\", \"Air Conditioning\"]','[\"https://example.com/images/chamber_of_mines_cm1_1.jpg\", \"https://example.com/images/chamber_of_mines_cm1_2.jpg\"]'),(46,'Chamber of Mines','CM2',128,'LECTURE','Lower Ground','[\"Projector\", \"Whiteboard\", \"Wi-Fi\", \"Air Conditioning\"]','[\"https://example.com/images/chamber_of_mines_cm2_1.jpg\", \"https://example.com/images/chamber_of_mines_cm2_2.jpg\"]'),(47,'Commerce, Law & Management','CLM24',30,'TUTORIAL','Ground Floor','[\"Whiteboard\", \"Wi-Fi\"]','[\"https://example.com/images/clm24_1.jpg\", \"https://example.com/images/clm24_2.jpg\"]'),(48,'Commerce, Law & Management','CLM25',30,'TUTORIAL','Ground Floor','[\"Whiteboard\", \"Wi-Fi\"]','[\"https://example.com/images/clm25_1.jpg\", \"https://example.com/images/clm25_2.jpg\"]'),(49,'Commerce, Law & Management','CLM26',30,'TUTORIAL','Ground Floor','[\"Whiteboard\", \"Wi-Fi\"]','[\"https://example.com/images/clm26_1.jpg\", \"https://example.com/images/clm26_2.jpg\"]'),(50,'Commerce, Law & Management','CLM37',50,'TUTORIAL','Ground Floor','[\"Projector\", \"Whiteboard\", \"Wi-Fi\", \"Air Conditioning\"]','[\"https://www.wits.ac.za/media/wits-university/news-and-events/images/news/2024-may-aug/The%20Wits%20Flower%20Hall%20Test%20and%20Examination%20Centre%20%20600x300px.jpg\", \"https://example.com/images/clm37_2.jpg\"]'),(51,'Commerce, Law & Management','CLM38',50,'TUTORIAL','Ground Floor','[\"Projector\", \"Whiteboard\", \"Wi-Fi\", \"Air Conditioning\"]','[\"https://example.com/images/clm38_1.jpg\", \"https://example.com/images/clm38_2.jpg\"]'),(52,'Commerce, Law & Management','CLM102',148,'LECTURE','1st Floor','[\"Projector\", \"Whiteboard\", \"Wi-Fi\", \"Air Conditioning\"]','[\"https://example.com/images/clm102_1.jpg\", \"https://example.com/images/clm102_2.jpg\"]');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedules` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `course_description` text,
  `room_id` int DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `event_type` enum('Class','Exam','Meeting','Other') DEFAULT NULL,
  `recurrence` enum('None','Daily','Weekly','Monthly') DEFAULT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `start_time` (`start_time`),
  KEY `room_id` (`room_id`,`start_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedules`
--

LOCK TABLES `schedules` WRITE;
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;
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
  `role` enum('Student','Instructor','Admin') DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('user_2lWE6B1W7gKhg0qdSnaCzzcMphZ','Sisekelo Ngcobo','Student','2024-09-09 00:06:41');
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

-- Dump completed on 2024-09-11 23:04:31
