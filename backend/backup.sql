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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (33,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-19','10:45:00','12:15:00','LAB1D','cancelled',NULL,'weekly','Math Lecture','2024-11-30'),(34,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-11','15:11:00','20:19:00','LAB1D','confirmed',NULL,'none','Event 307','2024-11-01'),(35,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-26','14:57:00','20:39:00','LT1A','pending',NULL,'none','Event 112',NULL),(36,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-09-25','13:54:00','22:31:00','LT2B','cancelled','Another Reason','weekly','Event 288','2024-12-12'),(37,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-06','11:15:00','21:25:00','MTG1E','cancelled','User cancelled','none','Event 139',NULL),(38,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-20','12:27:00','20:01:00','LAB1D','confirmed','User cancelled','weekly','Event 849','2024-11-06'),(39,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-02','13:34:00','19:28:00','TUT1C','cancelled','User cancelled','monthly','Event 506',NULL),(40,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-15','13:57:00','20:33:00','LT2B','cancelled',NULL,'none','Event 866',NULL),(41,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-17','11:51:00','20:26:00','LT1A','confirmed',NULL,'weekly','Event 350',NULL),(42,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','2024-10-02','14:20:00','21:24:00','MTG1E','confirmed',NULL,'monthly','Event 969',NULL),(43,'user_2lWYrZYgd0rrYcBy8Pw64HMJtkB','2024-09-27','13:01:00','15:01:00','LAB1D','cancelled','Unknown Reason','none','Test',NULL);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_booking_status_update` AFTER UPDATE ON `bookings` FOR EACH ROW BEGIN
    
    IF OLD.status <> NEW.status THEN
        
        INSERT INTO notifications (user_id, message, date, is_read, route)
        VALUES (NEW.user_id, 
                CONCAT('Your booking for "', NEW.event_name, '" at Venue ', NEW.venue_id, ' has been ', NEW.status), 
                NOW(), 
                0, 
                '/bookings/'); 
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `maintenance`
--

DROP TABLE IF EXISTS `maintenance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maintenance` (
  `issue_id` int NOT NULL AUTO_INCREMENT,
  `venue_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `reported_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `issue_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `reported_date` datetime NOT NULL,
  `resolved_date` datetime DEFAULT NULL,
  `resolution_log` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `image_url` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` enum('Reported','In Progress','Resolved') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`issue_id`),
  KEY `idx_status_reported_date` (`reported_date`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maintenance`
--

LOCK TABLES `maintenance` WRITE;
/*!40000 ALTER TABLE `maintenance` DISABLE KEYS */;
-- INSERT INTO `maintenance` VALUES (22,'MTG1E','user_2lWYrZYgd0rrYcBy8Pw64HMJtkB','Lighting malfunction in the meeting room','2024-09-27 00:16:57',NULL,NULL,NULL,'Resolved'),(23,'MTG1E','user_2lWYrZYgd0rrYcBy8Pw64HMJtkB','Lighting malfunction in the meeting room','2024-09-27 07:59:07',NULL,'{\"Problem Class\":\"Minor Issue\",\"Requirements To Fix\":\"Testing\",\"Set Back\":\"\"}',NULL,'Resolved'),(24,'LT1A','user_2lWYrZYgd0rrYcBy8Pw64HMJtkB','Test','2024-09-27 11:23:28',NULL,'{\"Problem Class\":\"Major Issue\",\"Requirements To Fix\":\"Relly Expensive\",\"Set Back\":\"New Setback\"}',NULL,'Resolved');
INSERT INTO `maintenance` (`issue_id`, `venue_id`, `reported_by`, `issue_description`, `reported_date`, `resolved_date`, `resolution_log`, `image_url`, `status`) VALUES
(15, 'MSLLab3', '0', 'Failing Test for image', '2024-09-10 12:39:21', NULL, '{\"Problem Class\":\"False Report\",\"Requirements To Fix\":\"lovely car image\",\"Set Back\":\"Car image\"}', '[\"https://sdp2024wiman.blob.core.windows.net/sdp2024wiman-container/1725968898368-2019-Mercedes-AMG-A35-002-1536.jpg\"]', 'In Progress'),
(16, 'FNB33', '0', 'Broken projector', '2024-09-11 00:14:45', NULL, NULL, '[\"https://sdp2024wiman.blob.core.windows.net/sdp2024wiman-container/1726006485206-nmbtibu682n51.jpg\"]', 'Reported'),
(17, 'MSLroom4', '0', 'Broken Door handle of the lecture hall', '2024-09-11 00:38:57', NULL, NULL, '[\"https://sdp2024wiman.blob.core.windows.net/sdp2024wiman-container/1726007937273-broken_door_handle.jpg\"]', 'Reported'),
(20, 'MSLLab3', '0', 'Cracked Glass Door', '2024-09-13 16:10:44', NULL, NULL, '[\"https://sdp2024wiman.blob.core.windows.net/sdp2024wiman-container/1726236642949-images.jpeg\"]', 'Reported'),
(21, 'MSLLab3', '0', 'Broken TV', '2024-09-14 12:47:25', NULL, NULL, '[\"https://sdp2024wiman.blob.core.windows.net/sdp2024wiman-container/1726310844816-broken_tv.png\"]', 'Reported'),
(26, 'lt101', 'user_2lWtLR0KmR5Hham1sJJJURRXrd8', 'TESTING2', '2024-09-28 00:55:22', NULL, '{\"Problem Class\":\"False Report\",\"Requirements To Fix\":\"money\",\"Set Back\":\"there is a problem actualy\"}', '[\"https://sdp2024wiman.blob.core.windows.net/sdp2024wiman-container/1727477107034-1726236642949-images.jpeg\"]', 'In Progress'),
(31, 'FLOWER HALL', 'user_2lWtLR0KmR5Hham1sJJJURRXrd8', '- broken bathroom glass door\r\n- leaking pipe\r\n- hand dryers do no work\r\n- broken mirror\r\n', '2024-09-28 03:46:17', NULL, NULL, '[\"https://sdp2024wiman.blob.core.windows.net/sdp2024wiman-container/1727487976530-hand-dryers.jpeg\",\"https://sdp2024wiman.blob.core.windows.net/sdp2024wiman-container/1727487977003-bathroompipe.jpeg\",\"https://sdp2024wiman.blob.core.windows.net/sdp2024wiman-container/1727487977031-broken-mirror-in-the.jpg\",\"https://sdp2024wiman.blob.core.windows.net/sdp2024wiman-container/1727487977059-broken-glass-wall-in.jpg\"]', 'Reported');
/*!40000 ALTER TABLE `maintenance` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_maintenance_issue_insert` AFTER INSERT ON `maintenance` FOR EACH ROW BEGIN
    
    INSERT INTO notifications (user_id, message, date, is_read, route)
    SELECT user_id, 
           CONCAT('New maintenance issue reported for Venue ID: ', NEW.venue_id, ' - ', NEW.issue_description), 
           NOW(), 
           0, 
           '/maintenance/'
    FROM users
    WHERE role = 'maintenance';
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_maintenance_status_update` AFTER UPDATE ON `maintenance` FOR EACH ROW BEGIN
    
    IF OLD.status != NEW.status THEN

        
        INSERT INTO notifications (user_id, message, date, is_read, route)
        VALUES (
            NEW.reported_by, 
            CONCAT('The status of your maintenance issue (Venue ID: ', NEW.venue_id, ') has been updated to ', NEW.status), 
            NOW(), 
            0, 
            '/maintenance/' 
        );

        
        IF NEW.status = 'In Progress' THEN
            
            UPDATE rooms 
            SET under_maintenance = 1
            WHERE room_id = NEW.venue_id;
        ELSEIF NEW.status = 'Resolved' THEN
            
            UPDATE rooms 
            SET under_maintenance = 0
            WHERE room_id = NEW.venue_id;
        END IF;

    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_read` tinyint(1) DEFAULT '0',
  `route` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (22,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','New maintenance issue reported for Venue ID: MTG1E - Lighting malfunction in the meeting room','2024-09-26 22:16:57',1,'/maintenance/'),(23,'user_2lWYrZYgd0rrYcBy8Pw64HMJtkB','New maintenance issue reported for Venue ID: MTG1E - Lighting malfunction in the meeting room','2024-09-26 22:16:57',1,'/maintenance/'),(29,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','New maintenance issue reported for Venue ID: MTG1E - Lighting malfunction in the meeting room','2024-09-27 05:59:07',1,'/maintenance/'),(30,'user_2lWYrZYgd0rrYcBy8Pw64HMJtkB','New maintenance issue reported for Venue ID: MTG1E - Lighting malfunction in the meeting room','2024-09-27 05:59:07',1,'/maintenance/'),(32,'user_2lWYrZYgd0rrYcBy8Pw64HMJtkB','The status of your maintenance issue (Venue ID: MTG1E) has been updated to Resolved','2024-09-27 07:39:21',1,'/maintenance/'),(33,'user_2lWYrZYgd0rrYcBy8Pw64HMJtkB','The status of your maintenance issue (Venue ID: MTG1E) has been updated to In Progress','2024-09-27 07:45:44',1,'/maintenance/'),(34,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','Your role has been changed from maintenance to admin','2024-09-27 07:47:34',1,'/profile'),(35,'user_2lWc50uyVxUCkCbogUMSltscpCf','Your role has been changed from user to admin','2024-09-27 07:47:34',0,'/profile'),(36,'user_2lWYrZYgd0rrYcBy8Pw64HMJtkB','Your role has been changed from maintenance to admin','2024-09-27 07:47:34',0,'/profile'),(37,'user_2mCVqjQ4tkRitiUoCZH5BSnlFB5','Your role has been changed from user to admin','2024-09-27 07:47:34',0,'/profile'),(38,'user_a1b2c3d4e5f6','Your role has been changed from user to admin','2024-09-27 07:47:34',0,'/profile'),(39,'user_g7h8i9j0k1l2','Your role has been changed from user to admin','2024-09-27 07:47:34',0,'/profile'),(40,'user_m3n4o5p6q7r8','Your role has been changed from user to admin','2024-09-27 07:47:34',0,'/profile'),(41,'user_y5z6a7b8c9d0','Your role has been changed from user to admin','2024-09-27 07:47:34',0,'/profile'),(42,'user_z1y2x3w4v5u6','Your role has been changed from user to admin','2024-09-27 07:47:34',0,'/profile'),(43,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','Your role has been changed from admin to user','2024-09-27 08:13:55',1,'/profile'),(44,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','Your role has been changed from user to maintenance','2024-09-27 09:18:09',1,'/profile'),(45,'user_2lWc50uyVxUCkCbogUMSltscpCf','Your role has been changed from admin to maintenance','2024-09-27 09:18:09',0,'/profile'),(46,'user_2lWYrZYgd0rrYcBy8Pw64HMJtkB','Your role has been changed from admin to maintenance','2024-09-27 09:18:09',0,'/profile'),(47,'user_2mCVqjQ4tkRitiUoCZH5BSnlFB5','Your role has been changed from admin to maintenance','2024-09-27 09:18:09',0,'/profile'),(48,'user_a1b2c3d4e5f6','Your role has been changed from admin to maintenance','2024-09-27 09:18:09',0,'/profile'),(49,'user_g7h8i9j0k1l2','Your role has been changed from admin to maintenance','2024-09-27 09:18:09',0,'/profile'),(50,'user_m3n4o5p6q7r8','Your role has been changed from admin to maintenance','2024-09-27 09:18:09',0,'/profile'),(51,'user_y5z6a7b8c9d0','Your role has been changed from admin to maintenance','2024-09-27 09:18:09',0,'/profile'),(52,'user_z1y2x3w4v5u6','Your role has been changed from admin to maintenance','2024-09-27 09:18:09',0,'/profile'),(53,'user_2lWYrZYgd0rrYcBy8Pw64HMJtkB','The status of your maintenance issue (Venue ID: MTG1E) has been updated to Resolved','2024-09-27 09:18:49',0,'/maintenance/'),(54,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','Your role has been changed from maintenance to admin','2024-09-27 09:20:14',0,'/profile'),(55,'user_2lWc50uyVxUCkCbogUMSltscpCf','Your role has been changed from maintenance to admin','2024-09-27 09:20:14',0,'/profile'),(56,'user_2lWYrZYgd0rrYcBy8Pw64HMJtkB','Your role has been changed from maintenance to admin','2024-09-27 09:20:14',0,'/profile'),(57,'user_2mCVqjQ4tkRitiUoCZH5BSnlFB5','Your role has been changed from maintenance to admin','2024-09-27 09:20:14',0,'/profile'),(58,'user_a1b2c3d4e5f6','Your role has been changed from maintenance to admin','2024-09-27 09:20:14',0,'/profile'),(59,'user_g7h8i9j0k1l2','Your role has been changed from maintenance to admin','2024-09-27 09:20:14',0,'/profile'),(60,'user_m3n4o5p6q7r8','Your role has been changed from maintenance to admin','2024-09-27 09:20:14',0,'/profile'),(61,'user_y5z6a7b8c9d0','Your role has been changed from maintenance to admin','2024-09-27 09:20:14',0,'/profile'),(62,'user_z1y2x3w4v5u6','Your role has been changed from maintenance to admin','2024-09-27 09:20:14',0,'/profile'),(63,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','Your role has been changed from admin to maintenance','2024-09-27 09:21:10',0,'/profile'),(64,'user_2lWc50uyVxUCkCbogUMSltscpCf','Your role has been changed from admin to maintenance','2024-09-27 09:21:10',0,'/profile'),(65,'user_2lWYrZYgd0rrYcBy8Pw64HMJtkB','Your role has been changed from admin to maintenance','2024-09-27 09:21:10',0,'/profile'),(66,'user_2mCVqjQ4tkRitiUoCZH5BSnlFB5','Your role has been changed from admin to maintenance','2024-09-27 09:21:10',0,'/profile'),(67,'user_a1b2c3d4e5f6','Your role has been changed from admin to maintenance','2024-09-27 09:21:10',0,'/profile'),(68,'user_g7h8i9j0k1l2','Your role has been changed from admin to maintenance','2024-09-27 09:21:10',0,'/profile'),(69,'user_m3n4o5p6q7r8','Your role has been changed from admin to maintenance','2024-09-27 09:21:10',0,'/profile'),(70,'user_y5z6a7b8c9d0','Your role has been changed from admin to maintenance','2024-09-27 09:21:10',0,'/profile'),(71,'user_z1y2x3w4v5u6','Your role has been changed from admin to maintenance','2024-09-27 09:21:10',0,'/profile'),(72,'user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','New maintenance issue reported for Venue ID: LT1A - Test','2024-09-27 09:23:28',0,'/maintenance/'),(73,'user_2lWc50uyVxUCkCbogUMSltscpCf','New maintenance issue reported for Venue ID: LT1A - Test','2024-09-27 09:23:28',0,'/maintenance/'),(74,'user_2lWYrZYgd0rrYcBy8Pw64HMJtkB','New maintenance issue reported for Venue ID: LT1A - Test','2024-09-27 09:23:28',0,'/maintenance/'),(75,'user_2mCVqjQ4tkRitiUoCZH5BSnlFB5','New maintenance issue reported for Venue ID: LT1A - Test','2024-09-27 09:23:28',0,'/maintenance/'),(76,'user_a1b2c3d4e5f6','New maintenance issue reported for Venue ID: LT1A - Test','2024-09-27 09:23:28',0,'/maintenance/'),(77,'user_g7h8i9j0k1l2','New maintenance issue reported for Venue ID: LT1A - Test','2024-09-27 09:23:28',0,'/maintenance/'),(78,'user_m3n4o5p6q7r8','New maintenance issue reported for Venue ID: LT1A - Test','2024-09-27 09:23:28',0,'/maintenance/'),(79,'user_y5z6a7b8c9d0','New maintenance issue reported for Venue ID: LT1A - Test','2024-09-27 09:23:28',0,'/maintenance/'),(80,'user_z1y2x3w4v5u6','New maintenance issue reported for Venue ID: LT1A - Test','2024-09-27 09:23:28',0,'/maintenance/'),(87,'user_2lWYrZYgd0rrYcBy8Pw64HMJtkB','The status of your maintenance issue (Venue ID: LT1A) has been updated to In Progress','2024-09-27 09:24:25',0,'/maintenance/'),(88,'user_2lWYrZYgd0rrYcBy8Pw64HMJtkB','The status of your maintenance issue (Venue ID: LT1A) has been updated to Resolved','2024-09-27 09:25:36',0,'/maintenance/');
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
  `image_url` varchar(255) DEFAULT NULL,
  `under_maintenance` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES ('LAB1D',2,20,'LAB','[\"computer\", \"projector\"]','https://wits100.wits.ac.za/media/wits-university/centenary/timeline/timeline%201983_1.JPG',0),('LT1A',1,100,'LECTURE','[\"projector\", \"whiteboard\"]','/venue-images/conferenceRoom.jpg',0),('LT2B',1,80,'LECTURE','[\"projector\"]','/venue-images/conferenceRoom.jpg',0),('MTG1E',3,10,'MEETING','[\"whiteboard\"]','/venue-images/conferenceRoom.jpg',0),('TUT1C',2,40,'TUTORIAL','[\"whiteboard\"]','https://wits100.wits.ac.za/media/wits-university/centenary/timeline/timeline%201983_1.JPG',0);
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
INSERT INTO `users` VALUES ('user_2lMoHCNG7Xg0NnD9ph1eV6aatuP','DANIEL NGOBE','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybE1vSEVWZzY2YnNUamFUekZOTlVBT2E4a0UifQ','maintenance',0,'2024-09-15 15:09:27'),('user_2lWc50uyVxUCkCbogUMSltscpCf','Kharendwe Negota','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybFdjNTBRYVo1ajZSOUtSd2J4YjhMbDRva1EifQ','maintenance',1,'2024-09-19 08:24:05'),('user_2lWYrZYgd0rrYcBy8Pw64HMJtkB','Daniel Ngobe','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybFdZcllTU3ZOU1FFMTI3cWNFSlNmNlVxbmwifQ','maintenance',0,'2024-09-26 09:36:34'),('user_2mCVqjQ4tkRitiUoCZH5BSnlFB5','Kharendwe Negota','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybUNWcWxkS0FCeU42R2REUEVYY05tTTA3TjAifQ','maintenance',1,'2024-09-19 08:24:46'),('user_a1b2c3d4e5f6','Alice Smith','https://example.com/profile/user_a1b2c3d4e5f6','maintenance',1,'2024-09-14 08:50:53'),('user_g7h8i9j0k1l2','Bob Johnson','https://example.com/profile/user_g7h8i9j0k1l2','maintenance',0,'2024-09-14 08:50:53'),('user_m3n4o5p6q7r8','Charlie Brown','https://example.com/profile/user_m3n4o5p6q7r8','maintenance',0,'2024-09-14 08:50:53'),('user_y5z6a7b8c9d0','Eve Davis','https://example.com/profile/user_y5z6a7b8c9d0','maintenance',0,'2024-09-14 08:50:53'),('user_z1y2x3w4v5u6','Frank Maintenance','https://example.com/profile/user_z1y2x3w4v5u6','maintenance',0,'2024-09-14 09:03:35');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_role_update` AFTER UPDATE ON `users` FOR EACH ROW BEGIN
    
    IF OLD.role <> NEW.role THEN
        
        INSERT INTO notifications (user_id, message, date, is_read, route)
        VALUES (NEW.user_id, 
                CONCAT('Your role has been changed from ', OLD.role, ' to ', NEW.role), 
                NOW(), 
                0, 
                '/profile'); 
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-27 12:04:56
