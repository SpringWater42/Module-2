-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: moderntech_solutions
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendancerecords`
--

DROP TABLE IF EXISTS `attendancerecords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendancerecords` (
  `employeeId` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`employeeId`),
  CONSTRAINT `attendancerecords_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employeeinformation` (`employeeId`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendancerecords`
--

LOCK TABLES `attendancerecords` WRITE;
/*!40000 ALTER TABLE `attendancerecords` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendancerecords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `position_` varchar(250) DEFAULT NULL,
  `department` varchar(250) DEFAULT NULL,
  `salary` int DEFAULT NULL,
  `employmentHistory` varchar(250) DEFAULT NULL,
  `contact` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=123457 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Sibongile Nkosi','Software Engineer','Development',70000,'Joined in 2015, promoted to Senior in 2018','sibongile.nkosi@moderntech.com'),(2,'Lungile Moyo','HR Manager','HR',80000,'Joined in 2013, promoted to Manager in 2017','lungile.moyo@moderntech.com'),(3,'Thabo Molefe','Quality Analyst','QA',55000,'Joined in 2018','thabo.molefe@moderntech.com'),(4,'Keshav Naidoo','Sales Representative','Sales',60000,'Joined in 2020','keshav.naidoo@moderntech.com'),(5,'Zanele Khumalo','Marketing Specialist','Marketing',58000,'Joined in 2019','zanele.khumalo@moderntech.com'),(6,'Sipho Zulu','UI/UX Designer','Design',65000,'Joined in 2016','sipho.zulu@moderntech.com'),(7,'Naledi Moeketsi','DevOps Engineer','IT',72000,'Joined in 2017','naledi.moeketsi@moderntech.com'),(8,'Farai Gumbo','Content Strategist','Marketing',56000,'Joined in 2021','farai.gumbo@moderntech.com'),(9,'Karabo Dlamini','Accountant','Finance',62000,'Joined in 2018','karabo.dlamini@moderntech.com'),(10,'Fatima Patel','Customer Support Lead','Support',58000,'Joined in 2016','fatima.patel@moderntech.com'),(12,'21','12','12',12,'12','12');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaverequests`
--

DROP TABLE IF EXISTS `leaverequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaverequests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employeeId` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employeeId` (`employeeId`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaverequests`
--

LOCK TABLES `leaverequests` WRITE;
/*!40000 ALTER TABLE `leaverequests` DISABLE KEYS */;
INSERT INTO `leaverequests` VALUES (1,1,'2025-07-22','Sick Leave','Approved'),(2,1,'2024-12-01','Personal','Pending'),(3,2,'2025-07-15','Family Responsibility','Denied'),(4,2,'2024-12-02','Vacation','Approved'),(5,3,'2025-07-10','Medical Appointment','Approved'),(6,3,'2024-12-05','Personal','Pending'),(7,4,'2025-07-20','Bereavement','Approved'),(8,5,'2024-12-01','Childcare','Pending'),(9,6,'2025-07-18','Sick Leave','Approved'),(10,7,'2025-07-22','Vacation','Pending'),(11,8,'2024-12-02','Medical Appointment','Approved'),(12,9,'2025-07-19','Childcare','Denied'),(13,10,'2024-12-03','Vacation','Pending'),(19,11,'2025-07-10','11','Pending');
/*!40000 ALTER TABLE `leaverequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payrolldata`
--

DROP TABLE IF EXISTS `payrolldata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payrolldata` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employeeId` int DEFAULT NULL,
  `hoursWorked` int DEFAULT NULL,
  `leaveDeductions` int DEFAULT NULL,
  `finalSalary` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employeeId` (`employeeId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payrolldata`
--

LOCK TABLES `payrolldata` WRITE;
/*!40000 ALTER TABLE `payrolldata` DISABLE KEYS */;
INSERT INTO `payrolldata` VALUES (1,1,160,8,69500.00),(2,2,150,10,79000.00),(3,3,170,4,54800.00),(4,4,165,6,59700.00),(5,5,158,5,57850.00),(6,6,168,2,64800.00),(7,7,175,3,71800.00),(8,8,160,0,56000.00),(9,9,155,5,61500.00);
/*!40000 ALTER TABLE `payrolldata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `performance`
--

DROP TABLE IF EXISTS `performance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `performance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employeeId` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `description` text,
  `review_month` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `performance`
--

LOCK TABLES `performance` WRITE;
/*!40000 ALTER TABLE `performance` DISABLE KEYS */;
INSERT INTO `performance` VALUES (1,1,5,'Sibongile demonstrated exceptional coding standards and completed key modules ahead of schedule.','2025-07-01'),(2,2,3,'Lungile handled employee onboarding well but had minor delays in policy updates.','2025-07-01'),(3,3,4,'Thabo maintained strong test coverage and identified critical bugs early.','2025-07-01'),(4,4,2,'Keshav met sales targets but needs improvement in follow-ups with key clients.','2025-07-01'),(5,5,5,'Zanele’s marketing campaign significantly boosted engagement this month.','2025-07-01'),(6,6,4,'Sipho produced clean UI/UX prototypes and collaborated well with developers.','2025-07-01'),(7,7,3,'Naledi maintained system uptime efficiently but automation tasks were slightly delayed.','2025-07-01'),(8,8,2,'Farai delivered content on time, but SEO optimization needs improvement.','2025-07-01'),(9,9,4,'Karabo processed reports accurately and reduced month-end closing time.','2025-07-01'),(10,10,3,'Fatima handled support escalations well, but CSAT score slightly dropped.','2025-07-01'),(12,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `performance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,'admin@example.com','$2b$10$VkK/scdVe6UzJzUbOCsWN.myAJ5N9O322nAAVDJjHVldcLcHsJVM.','2025-07-31 10:29:43');
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

-- Dump completed on 2025-07-31 12:38:32
