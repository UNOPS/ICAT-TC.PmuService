-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: portelservice
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

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
-- Table structure for table `EmissionReductionDraftData`
--

DROP TABLE IF EXISTS `EmissionReductionDraftData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EmissionReductionDraftData` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2500) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '1',
  `baseYear` varchar(255) NOT NULL,
  `baseYearEmission` int NOT NULL,
  `targetYear` varchar(255) NOT NULL,
  `targetYearEmission` int NOT NULL,
  `unconditionaltco2` int DEFAULT NULL,
  `conditionaltco2` int DEFAULT NULL,
  `countryId` int DEFAULT NULL,
  `sectorId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_903d3bbe21046e31495e9a0ec03` (`countryId`),
  KEY `FK_3aec1cc3c2511fc0edb63dd6b21` (`sectorId`),
  CONSTRAINT `FK_3aec1cc3c2511fc0edb63dd6b21` FOREIGN KEY (`sectorId`) REFERENCES `sector` (`id`),
  CONSTRAINT `FK_903d3bbe21046e31495e9a0ec03` FOREIGN KEY (`countryId`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EmissionReductionDraftData`
--

LOCK TABLES `EmissionReductionDraftData` WRITE;
/*!40000 ALTER TABLE `EmissionReductionDraftData` DISABLE KEYS */;
INSERT INTO `EmissionReductionDraftData` VALUES ('-','2022-02-13 16:26:27','-','2022-02-13 16:26:27',0,1,NULL,NULL,1,'2010',12000,'2030',15000,1000,2000,1,1);
/*!40000 ALTER TABLE `EmissionReductionDraftData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applicability`
--

DROP TABLE IF EXISTS `applicability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applicability` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2500) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '1',
  `assessmentId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e5ad0e8cc607797a5183636e596` (`assessmentId`),
  CONSTRAINT `FK_e5ad0e8cc607797a5183636e596` FOREIGN KEY (`assessmentId`) REFERENCES `assesment` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applicability`
--

LOCK TABLES `applicability` WRITE;
/*!40000 ALTER TABLE `applicability` DISABLE KEYS */;
INSERT INTO `applicability` VALUES (NULL,'2022-02-11 07:11:36',NULL,'2022-02-11 07:11:36',0,1,'Estimates the impact of fuel pricing policies on GHG emissions in the road transport sector',NULL,1,NULL),(NULL,'2022-02-11 07:11:36',NULL,'2022-02-11 07:11:36',0,2,'Reduce traffic congestion','Reduce traffic congestion',2,NULL),(NULL,'2022-02-11 07:11:36',NULL,'2022-02-11 07:11:36',0,3,'Shift passenger from road to rail','Shift passenger from road to rail',3,NULL),(NULL,'2022-02-11 07:11:36',NULL,'2022-02-11 07:11:36',0,4,'Introduce vehicles with lower emissions per kilometer','Introduce vehicles with lower emissions per kilometer',4,NULL);
/*!40000 ALTER TABLE `applicability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assesment`
--

DROP TABLE IF EXISTS `assesment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assesment` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `baseYear` int DEFAULT NULL,
  `projectStartDate` datetime DEFAULT NULL,
  `projectDuration` int DEFAULT NULL,
  `assessmentStage` varchar(255) DEFAULT NULL,
  `assessmentStatus` int NOT NULL DEFAULT '0',
  `assessmentType` varchar(255) DEFAULT NULL,
  `emmisionReductionValue` int DEFAULT NULL,
  `macValue` int DEFAULT NULL,
  `baselineScenario` varchar(255) DEFAULT NULL,
  `projectScenario` varchar(255) DEFAULT NULL,
  `isGuided` tinyint DEFAULT NULL,
  `isProposal` tinyint DEFAULT NULL,
  `lekageScenario` varchar(255) DEFAULT NULL,
  `projectionIndicator` varchar(255) DEFAULT NULL,
  `projectionBaseYear` int DEFAULT NULL,
  `easyOfUseDataCollection` varchar(255) DEFAULT NULL,
  `methodologyCode` varchar(255) DEFAULT NULL,
  `methodologyVersion` varchar(255) DEFAULT NULL,
  `countryId` int DEFAULT NULL,
  `methodologyId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `projectId` int DEFAULT NULL,
  `mitigationActionTypeId` int DEFAULT NULL,
  `ndcId` int DEFAULT NULL,
  `subNdcId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_931a485488275ee306fde6f089c` (`countryId`),
  KEY `FK_6195d7baa268a1a0df1d8890b4d` (`methodologyId`),
  KEY `FK_95c69761e5ad360968c52a4c6af` (`userId`),
  KEY `FK_348255d2c8f960bdbec373dd722` (`projectId`),
  KEY `FK_4ea98d88a3eccb180237b353eb8` (`mitigationActionTypeId`),
  KEY `FK_ba63a30d14e147471a76b8650a1` (`ndcId`),
  KEY `FK_2866c64bc8d4a949fe1953246bc` (`subNdcId`),
  CONSTRAINT `FK_2866c64bc8d4a949fe1953246bc` FOREIGN KEY (`subNdcId`) REFERENCES `sub_ndc` (`id`),
  CONSTRAINT `FK_348255d2c8f960bdbec373dd722` FOREIGN KEY (`projectId`) REFERENCES `climateAction` (`id`),
  CONSTRAINT `FK_4ea98d88a3eccb180237b353eb8` FOREIGN KEY (`mitigationActionTypeId`) REFERENCES `mitigationActionType` (`id`),
  CONSTRAINT `FK_6195d7baa268a1a0df1d8890b4d` FOREIGN KEY (`methodologyId`) REFERENCES `methodology` (`id`),
  CONSTRAINT `FK_931a485488275ee306fde6f089c` FOREIGN KEY (`countryId`) REFERENCES `country` (`id`),
  CONSTRAINT `FK_95c69761e5ad360968c52a4c6af` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_ba63a30d14e147471a76b8650a1` FOREIGN KEY (`ndcId`) REFERENCES `ndc` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assesment`
--

LOCK TABLES `assesment` WRITE;
/*!40000 ALTER TABLE `assesment` DISABLE KEYS */;
INSERT INTO `assesment` VALUES ('','2022-02-11 08:14:22','','2022-02-11 08:14:22',0,1,2020,'2021-11-29 18:30:00',1,NULL,0,NULL,NULL,NULL,'','',0,1,'',NULL,NULL,NULL,'ICAT_TPM_FSR_2020_A','1',NULL,2,NULL,2,NULL,1,1),('','2022-02-13 16:20:42','','2022-02-13 16:20:42',0,2,2020,'2022-02-01 18:30:00',25,NULL,0,NULL,NULL,NULL,'gsvsjewjewkncds nsabhmsabjwbw','32',0,1,'',NULL,NULL,NULL,'cdm_ams_iii_s','1',NULL,1,NULL,3,NULL,1,1),('','2022-02-15 03:44:18','','2022-02-15 03:44:18',0,3,2022,'2021-11-29 18:30:00',1,NULL,0,'Ex post',NULL,NULL,'gvshshjsjsja','test',0,0,'',NULL,NULL,NULL,'cdm_ams_iii_s','1',NULL,1,NULL,2,NULL,1,1),('','2022-02-15 04:04:16','','2022-02-15 04:04:16',0,4,2060,'2022-01-31 18:30:00',99,NULL,0,'Ex post',NULL,NULL,'gsvsjewjewkncds nsabhmsabjwbw','mmfgfgf',0,0,'',NULL,NULL,NULL,'cdm_ams_iii_s','1',NULL,1,NULL,5,NULL,1,1),('','2022-02-15 04:47:49','','2022-02-15 04:47:49',0,5,2020,'2023-10-04 18:30:00',5,NULL,0,'Ex post',NULL,NULL,'Emissions from conventional fuel consumption in transport sector of Sri Lanka without carbon tax','Emissions from conventional fuel consumption in transport sector of Sri Lanka with carbon tax',0,0,'',NULL,NULL,NULL,'ICAT_TPM_FSR_2020_A','1',NULL,2,NULL,7,NULL,1,1),('','2022-02-15 07:36:45','','2022-02-15 07:36:45',0,6,2020,'2025-02-27 18:30:00',5,NULL,0,'Ex anthe',NULL,NULL,'Deisel passsenger bus ','CNG using for Public passenger buses',0,0,'','GDP',2020,NULL,'cdm_ams_iii_s','1',NULL,1,NULL,6,NULL,1,1);
/*!40000 ALTER TABLE `assesment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assesmentObjective`
--

DROP TABLE IF EXISTS `assesmentObjective`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assesmentObjective` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `objective` varchar(255) NOT NULL,
  `assessmentId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assesmentObjective`
--

LOCK TABLES `assesmentObjective` WRITE;
/*!40000 ALTER TABLE `assesmentObjective` DISABLE KEYS */;
INSERT INTO `assesmentObjective` VALUES (NULL,'2022-02-01 18:46:50',NULL,'2022-02-01 18:46:50',0,1,'Prioritize policies',NULL),(NULL,'2022-02-01 18:46:50',NULL,'2022-02-01 18:46:50',0,2,'Mitigation planning',NULL),(NULL,'2022-02-01 18:46:50',NULL,'2022-02-01 18:46:50',0,3,'Report results',NULL),(NULL,'2022-02-01 18:46:50',NULL,'2022-02-01 18:46:50',0,4,'Emission trading',NULL);
/*!40000 ALTER TABLE `assesmentObjective` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assesmentYear`
--

DROP TABLE IF EXISTS `assesmentYear`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assesmentYear` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `assessmentYear` varchar(255) NOT NULL,
  `qaStatus` int DEFAULT NULL,
  `qaDeadline` datetime DEFAULT NULL,
  `qaAssighnDate` datetime DEFAULT NULL,
  `verificationUser` int DEFAULT NULL,
  `verificationStatus` int DEFAULT NULL,
  `verificationAssighnDate` datetime DEFAULT NULL,
  `verificationDeadline` datetime DEFAULT NULL,
  `verifierComment` varchar(255) DEFAULT NULL,
  `assessmentId` int DEFAULT NULL,
  `isVerificationSuccess` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_4ae20ec4ff6ca5b478ac31269a2` (`assessmentId`),
  CONSTRAINT `FK_4ae20ec4ff6ca5b478ac31269a2` FOREIGN KEY (`assessmentId`) REFERENCES `assesment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assesmentYear`
--

LOCK TABLES `assesmentYear` WRITE;
/*!40000 ALTER TABLE `assesmentYear` DISABLE KEYS */;
INSERT INTO `assesmentYear` VALUES (NULL,NULL,NULL,NULL,0,1,'2020',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0),(NULL,NULL,NULL,NULL,0,2,'2022',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,0),(NULL,NULL,NULL,NULL,0,3,'2013',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,0),(NULL,NULL,NULL,NULL,0,4,'2013',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,0),(NULL,NULL,NULL,NULL,0,5,'2023',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,0),(NULL,NULL,NULL,NULL,0,6,'2028',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,0),(NULL,NULL,NULL,NULL,0,7,'2025',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,0);
/*!40000 ALTER TABLE `assesmentYear` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assesment_applicability_applicability`
--

DROP TABLE IF EXISTS `assesment_applicability_applicability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assesment_applicability_applicability` (
  `assesmentId` int NOT NULL,
  `applicabilityId` int NOT NULL,
  PRIMARY KEY (`assesmentId`,`applicabilityId`),
  KEY `IDX_2b1d8641b4ac0095f5c4a1acb8` (`assesmentId`),
  KEY `IDX_899cf5b6ae66de5a2f715f2c98` (`applicabilityId`),
  CONSTRAINT `FK_2b1d8641b4ac0095f5c4a1acb8c` FOREIGN KEY (`assesmentId`) REFERENCES `assesment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_899cf5b6ae66de5a2f715f2c987` FOREIGN KEY (`applicabilityId`) REFERENCES `applicability` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assesment_applicability_applicability`
--

LOCK TABLES `assesment_applicability_applicability` WRITE;
/*!40000 ALTER TABLE `assesment_applicability_applicability` DISABLE KEYS */;
/*!40000 ALTER TABLE `assesment_applicability_applicability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assesment_assessment_objective_assesment_objective`
--

DROP TABLE IF EXISTS `assesment_assessment_objective_assesment_objective`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assesment_assessment_objective_assesment_objective` (
  `assesmentId` int NOT NULL,
  `assesmentObjectiveId` int NOT NULL,
  PRIMARY KEY (`assesmentId`,`assesmentObjectiveId`),
  KEY `IDX_0cf100c4d91809032232bdc555` (`assesmentId`),
  KEY `IDX_77ee65132daa3cd38cfeaba477` (`assesmentObjectiveId`),
  CONSTRAINT `FK_0cf100c4d91809032232bdc555b` FOREIGN KEY (`assesmentId`) REFERENCES `assesment` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_77ee65132daa3cd38cfeaba4771` FOREIGN KEY (`assesmentObjectiveId`) REFERENCES `assesmentObjective` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assesment_assessment_objective_assesment_objective`
--

LOCK TABLES `assesment_assessment_objective_assesment_objective` WRITE;
/*!40000 ALTER TABLE `assesment_assessment_objective_assesment_objective` DISABLE KEYS */;
INSERT INTO `assesment_assessment_objective_assesment_objective` VALUES (1,4),(3,2),(3,4),(4,1),(4,2),(5,2),(6,3);
/*!40000 ALTER TABLE `assesment_assessment_objective_assesment_objective` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assessmentResault`
--

DROP TABLE IF EXISTS `assessmentResault`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assessmentResault` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `baselineResult` int DEFAULT NULL,
  `baselineResultUnit` varchar(255) DEFAULT NULL,
  `projectResult` int DEFAULT NULL,
  `projectResultUnit` varchar(255) DEFAULT NULL,
  `lekageResult` int DEFAULT NULL,
  `lekageResultUnit` varchar(255) DEFAULT NULL,
  `totalEmission` int DEFAULT NULL,
  `totalEmissionUnit` varchar(255) DEFAULT NULL,
  `bsTotalAnnualCost` int DEFAULT NULL,
  `psTotalAnnualCost` int DEFAULT NULL,
  `costDifference` int DEFAULT NULL,
  `macResult` int DEFAULT NULL,
  `qcComment` varchar(255) DEFAULT NULL,
  `qcStatusBaselineResult` int DEFAULT NULL,
  `qcStatuProjectResult` int DEFAULT NULL,
  `qcStatusLekageResult` int DEFAULT NULL,
  `qcStatusTotalEmission` int DEFAULT NULL,
  `assessmentYearId` int DEFAULT NULL,
  `assementId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_2abaf0b68ee7cb1c55a5d51551` (`assessmentYearId`),
  KEY `FK_1df0eedfacc4a46a3811bf3de78` (`assementId`),
  CONSTRAINT `FK_1df0eedfacc4a46a3811bf3de78` FOREIGN KEY (`assementId`) REFERENCES `assesment` (`id`),
  CONSTRAINT `FK_2abaf0b68ee7cb1c55a5d515513` FOREIGN KEY (`assessmentYearId`) REFERENCES `assesmentYear` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessmentResault`
--

LOCK TABLES `assessmentResault` WRITE;
/*!40000 ALTER TABLE `assessmentResault` DISABLE KEYS */;
INSERT INTO `assessmentResault` VALUES ('-','2022-02-11 08:14:26','-','2022-02-11 08:14:26',0,1,1500,NULL,1000,NULL,100,NULL,400,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),('-','2022-02-13 16:20:45','-','2022-02-13 16:20:45',0,2,1500,NULL,1000,NULL,100,NULL,400,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,2);
/*!40000 ALTER TABLE `assessmentResault` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit`
--

DROP TABLE IF EXISTS `audit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `actionStatus` varchar(255) NOT NULL,
  `userType` varchar(255) NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7ae389e858ad6f2c0c63112e387` (`userId`),
  CONSTRAINT `FK_7ae389e858ad6f2c0c63112e387` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit`
--

LOCK TABLES `audit` WRITE;
/*!40000 ALTER TABLE `audit` DISABLE KEYS */;
INSERT INTO `audit` VALUES (NULL,'2022-02-11 07:11:36',NULL,'2022-02-11 07:11:36',0,1,'Test','test action 01','test','sussessfull','user',4);
/*!40000 ALTER TABLE `audit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `climateAction`
--

DROP TABLE IF EXISTS `climateAction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `climateAction` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `climateActionName` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `contactPersoFullName` varchar(50) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `contactPersonDesignation` varchar(30) DEFAULT NULL,
  `telephoneNumber` varchar(255) NOT NULL,
  `mobileNumber` varchar(255) DEFAULT NULL,
  `institution` varchar(50) DEFAULT NULL,
  `projectScope` varchar(255) DEFAULT NULL,
  `acceptedDate` datetime DEFAULT NULL,
  `proposeDateofCommence` datetime NOT NULL,
  `duration` int NOT NULL DEFAULT '0',
  `baseScenarioProjectLife` int NOT NULL DEFAULT '0',
  `projectScenarioTotalInvestment` int NOT NULL DEFAULT '0',
  `baseScenarioTotalInvestment` int NOT NULL DEFAULT '0',
  `objective` varchar(500) DEFAULT NULL,
  `subNationalLevl1` varchar(255) DEFAULT NULL,
  `subNationalLevl2` varchar(255) DEFAULT NULL,
  `subNationalLevl3` varchar(255) DEFAULT NULL,
  `longitude` decimal(10,6) DEFAULT '0.000000',
  `latitude` decimal(10,6) DEFAULT '0.000000',
  `outcome` varchar(500) DEFAULT NULL,
  `currentProgress` varchar(500) DEFAULT NULL,
  `chgEmissions` varchar(255) DEFAULT NULL,
  `adaptationBenefits` varchar(500) DEFAULT NULL,
  `directSDBenefit` varchar(500) DEFAULT NULL,
  `indirectSDBenefit` varchar(500) DEFAULT NULL,
  `implementingEntity` varchar(255) DEFAULT NULL,
  `executingEntity` varchar(255) DEFAULT NULL,
  `partiesInvolved` varchar(300) DEFAULT NULL,
  `beneficiaries` varchar(300) DEFAULT NULL,
  `donors` varchar(100) DEFAULT NULL,
  `investors` varchar(100) DEFAULT NULL,
  `fundingOrganization` varchar(300) DEFAULT NULL,
  `initialInvestment` decimal(10,2) DEFAULT NULL,
  `annualFunding` decimal(10,2) DEFAULT NULL,
  `annualRevenue` decimal(10,2) DEFAULT NULL,
  `expectedRecurrentExpenditure` decimal(10,2) DEFAULT NULL,
  `projectRejectComment` varchar(255) DEFAULT NULL,
  `projectDataRequsetComment` varchar(255) DEFAULT NULL,
  `mappedInstitutionId` int DEFAULT NULL,
  `countryId` int DEFAULT NULL,
  `projectStatusId` int DEFAULT NULL,
  `sectorId` int DEFAULT NULL,
  `ndcId` int DEFAULT NULL,
  `subNdcId` int DEFAULT NULL,
  `projectOwnerId` int DEFAULT NULL,
  `financingSchemeId` int DEFAULT NULL,
  `mitigationActionTypeId` int DEFAULT NULL,
  `projectApprovalStatusId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8c67478ebaf885a17a7f3ba2a2a` (`mappedInstitutionId`),
  KEY `FK_cb90295360fb75053021ca56024` (`countryId`),
  KEY `FK_79d7612e07dc96cd3df4d950edf` (`projectStatusId`),
  KEY `FK_54f6375c9abf2c890c562ac0056` (`sectorId`),
  KEY `FK_36d6f99c9f32370899605512ba0` (`ndcId`),
  KEY `FK_bcd47c9800671dee99ff9126908` (`subNdcId`),
  KEY `FK_f85da9240db0ec0d457ae7d2052` (`projectOwnerId`),
  KEY `FK_33b4c4b6600f96de9b0e5105458` (`financingSchemeId`),
  KEY `FK_ed93c833d58a02fa54d5a28d331` (`mitigationActionTypeId`),
  KEY `FK_ec7b6550d5f7fdac3b35d05d545` (`projectApprovalStatusId`),
  CONSTRAINT `FK_33b4c4b6600f96de9b0e5105458` FOREIGN KEY (`financingSchemeId`) REFERENCES `financing_scheme` (`id`),
  CONSTRAINT `FK_36d6f99c9f32370899605512ba0` FOREIGN KEY (`ndcId`) REFERENCES `ndc` (`id`),
  CONSTRAINT `FK_54f6375c9abf2c890c562ac0056` FOREIGN KEY (`sectorId`) REFERENCES `sector` (`id`),
  CONSTRAINT `FK_79d7612e07dc96cd3df4d950edf` FOREIGN KEY (`projectStatusId`) REFERENCES `projectstatus` (`id`),
  CONSTRAINT `FK_8c67478ebaf885a17a7f3ba2a2a` FOREIGN KEY (`mappedInstitutionId`) REFERENCES `institution` (`id`),
  CONSTRAINT `FK_bcd47c9800671dee99ff9126908` FOREIGN KEY (`subNdcId`) REFERENCES `sub_ndc` (`id`),
  CONSTRAINT `FK_cb90295360fb75053021ca56024` FOREIGN KEY (`countryId`) REFERENCES `country` (`id`),
  CONSTRAINT `FK_ec7b6550d5f7fdac3b35d05d545` FOREIGN KEY (`projectApprovalStatusId`) REFERENCES `project_approval_status` (`id`),
  CONSTRAINT `FK_ed93c833d58a02fa54d5a28d331` FOREIGN KEY (`mitigationActionTypeId`) REFERENCES `mitigationActionType` (`id`),
  CONSTRAINT `FK_f85da9240db0ec0d457ae7d2052` FOREIGN KEY (`projectOwnerId`) REFERENCES `project_owner` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `climateAction`
--

LOCK TABLES `climateAction` WRITE;
/*!40000 ALTER TABLE `climateAction` DISABLE KEYS */;
INSERT INTO `climateAction` VALUES ('','2022-02-15 03:44:18','','2022-02-15 03:44:18',0,2,'Test project new','tes','Test','test@test.com','test','123','123','1','1','2021-11-30 00:00:00','2021-11-29 18:30:00',1,0,0,0,'1','1','1','1',1.000000,1.000000,'1','1','1','1','1','1','1','1','1','1','1','1','1',1.00,1.00,1.00,1.00,'566',NULL,NULL,1,1,1,1,1,1,1,NULL,1),('-','2022-02-13 16:17:38','-','2022-02-13 16:17:38',0,3,'Sri Lanka',NULL,'TEST','pasan@climatesi.com','Pasan Anushanga','0710892190','0710892190','CSI','TEST',NULL,'2022-02-01 18:30:00',25,0,0,0,NULL,NULL,NULL,NULL,0.000000,0.000000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,1,NULL,NULL,NULL,NULL,NULL,1),('-','2022-02-13 17:39:36','-','2022-02-13 17:39:36',0,4,'Introduction of 50 LNG buses',NULL,'Shyamika Shiwanthi','shyamika@climatesi.com','Team lead- MRV','+9471404771565','0714047715','Climate Smart Initiatives (Pvt) Ltd.','Introduction of 50 LNG buses in the colombo city. fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',NULL,'2022-02-02 18:30:00',16,0,0,0,'Objective of the Climate Action is to','Sothern','Galle','Galle',79.937277,6.111755,'1. Outcome 1\n2. Outcome 2','hgsfbxnmbdf bvdbjkd kjdbvfjkb bkfbjkf jbkjfb jbjfbj bjkdfbdjnb bjbfbjdfbj bbjfbjd jbjdbjd bjbnb bjjb nnnnnnnnnnnnnnnnnnnnnnnnnnnnn bfbjdb bvjfabj bjfdb','2151 tCO2e','gfshfn vfhvh bvhbvls bv hsbsb  hvbb hbvbjjfffffffffffffbvh hvblsfb hjvbhsfbsfb bhvhfbsbfsbs hbb bfj bfsbfjsb bljfsjb  nbfhbs sbvfbs','dvmbfj jbfn jbnjnb nbjlsnb mbnbn fjbnkbn mbnmnbmxv mvnbmvnbmz mbnvnblv nbnvbn ','vnfjbnfjn bjnb bjb bjfjbn kkbnnjnbjkd vbnkjdnbjd jbndjbndj kvnbnb nbvjknbjn jbvjnb jnbdjn',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,1,NULL,NULL,3,NULL,NULL,1),('','2022-02-15 04:04:16','','2022-02-15 04:04:16',0,5,'ICAT Climate Action Tool',NULL,'ICAT Climate Action Tool','pasan@climatesi.com','TEST','0710892190',NULL,'CSI','TEST',NULL,'2022-01-31 18:30:00',99,0,0,0,NULL,NULL,NULL,NULL,0.000000,0.000000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,3,1,1,1,NULL,3,NULL,1),('','2022-02-15 07:36:45','','2022-02-15 07:36:45',0,6,'convert the 25% of diesel buses to CNG by 2030',NULL,'Thanuri Nirmani','thanu@ngr.com','Environment Officer ','0715263456','0712536258','Thanu Bus Service','replace diesel buses from CNG buses',NULL,'2025-02-27 18:30:00',5,0,0,0,'Reduce the GHG emissions from transport by 25%','Eastern','Batticaloa','Kaluwanchikudy',81.746826,7.494174,'Reduce the cost of Fuel in Public transport','Proposed action (Feasibility assessment)','2500 tCO2e','Reduce the air pollution','SDG 13- Climate Change','SDG 17- Land ','Thanu Bus Service','Ministry of Transport','Ministry of Environment','Local passengers','Donors Sri Lanka 1','Investor Sri Lanka 1','Funding Organization Sri Lanka 1',200000.00,10000.00,5000.00,200.00,NULL,NULL,NULL,1,1,1,1,1,1,1,NULL,1),('','2022-02-15 04:47:49','','2022-02-15 04:47:49',0,7,'Increasing tax for fuel',NULL,'Hitinayaka Mudiyanselage Kaushalya Samarawickrama','Wasu_Sasha@gamil.com','Climate change officer','+94 112 034 198',NULL,'Climate Change Secretariat','Introducing fuel based carbon tax (increase tax of fuel) for petroleum fuel in Sri Lanka',NULL,'2023-10-04 18:30:00',5,0,0,0,'The mitigation action aims to	reduce the use of conventional fossil fuel in Sri Lanka\'s transport sector and expect to encourage more use of low emissions energy sources. ',NULL,NULL,NULL,0.000000,0.000000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,1,1,1,3,NULL,NULL,1),('-','2022-02-15 12:29:17','-','2022-02-15 12:29:17',0,8,'Increasing tax of petrol by 5% by 2025',NULL,'Ishara Samarawickrama','Ishara.Samare@gmail.com','Officer in charge','+94 113 664 000','+94 779 664 000','Climate Change Secretariat','Introducing carbon tax for Lanka Petrol 92 Octane in Sri Lanka',NULL,'2022-05-13 18:30:00',5,0,0,0,'Reducing emissions from the mobile combustion of Lanka Petrol 92 Octane in Sri Lanka',NULL,NULL,NULL,0.000000,0.000000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,1,NULL,NULL,3,NULL,NULL,1),('-','2022-02-15 14:05:44','-','2022-02-15 14:05:44',0,9,'Introduction of toll to the Kandy road Sri Lanka',NULL,'Kreda','kreda@gmail.com','Officer','+9471404771565','+94714047715682','ClimateSI','Scope of the climate action includes introduction of tax rebatement policy to import electric and hybrid cars.',NULL,'2022-01-31 18:30:00',12,0,0,0,NULL,NULL,NULL,NULL,0.000000,0.000000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'For the testing purpose',NULL,NULL,1,3,1,NULL,NULL,NULL,NULL,NULL,2),('-','2022-02-15 14:12:00','-','2022-02-15 14:12:00',0,10,'Introduction of toll to the Kandy road Sri Lanka',NULL,'Kreda','kreda@gmail.com','Officer','+9471404771565','+94714047715682','ClimateSI','Scope of the climate action includes introduction of tax rebatement policy to import electric and hybrid cars.',NULL,'2022-01-31 18:30:00',12,0,0,0,NULL,NULL,NULL,NULL,0.000000,0.000000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'For the testing perpose','Request additional data',NULL,1,3,1,NULL,NULL,NULL,NULL,NULL,3);
/*!40000 ALTER TABLE `climateAction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `climate_change_data_category`
--

DROP TABLE IF EXISTS `climate_change_data_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `climate_change_data_category` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2500) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `climate_change_data_category`
--

LOCK TABLES `climate_change_data_category` WRITE;
/*!40000 ALTER TABLE `climate_change_data_category` DISABLE KEYS */;
INSERT INTO `climate_change_data_category` VALUES ('1','2021-11-30 00:00:00','1','2021-11-30 00:00:00',1,1,'Test 1','test 1',1);
/*!40000 ALTER TABLE `climate_change_data_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `code_extended` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '1',
  `submissions` varchar(255) NOT NULL,
  `emissionSummary` varchar(255) DEFAULT NULL,
  `ndcDocuments` varchar(255) DEFAULT NULL,
  `isSystemUse` tinyint DEFAULT NULL,
  `flagPath` varchar(255) DEFAULT NULL,
  `registeredDate` datetime DEFAULT NULL,
  `isMember` tinyint DEFAULT NULL,
  `countryStatus` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (NULL,NULL,NULL,NULL,0,1,'SL','LKA','Sri Lanka','Sri lanka',1,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_ce-flag.gif',NULL,1,NULL,'Asia'),(NULL,NULL,NULL,NULL,0,2,'KE','KEN','Kenya','Kenya',2,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_ke-flag.gif',NULL,1,NULL,'Africa'),(NULL,NULL,NULL,NULL,0,3,'KG','KGZ','Kyrgyzstan','Kyrgyzstan',3,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_kg-flag.gif',NULL,1,NULL,'Asia'),(NULL,NULL,NULL,NULL,0,4,'LR','LBR','Liberia','Liberia',4,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_li-flag.gif',NULL,1,NULL,'Africa'),(NULL,NULL,NULL,NULL,0,5,'MV','MDV','Maldives','Maldives',5,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_mv-flag.gif',NULL,1,NULL,'Asia'),(NULL,NULL,NULL,NULL,0,6,'MX','MEX','Mexico','Mexico',6,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_mx-flag.gif',NULL,1,NULL,'Americas'),(NULL,NULL,NULL,NULL,0,7,'MA','MAR','Morocco','Morocco',7,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_mo-flag.gif',NULL,1,NULL,'Africa'),(NULL,NULL,NULL,NULL,0,8,'MZ','MOZ','Mozambique','Mozambique',8,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_mz-flag.gif',NULL,1,NULL,'Africa'),(NULL,NULL,NULL,NULL,0,9,'NG','NGA','Nigeria','Nigeria',9,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_ni-flag.gif',NULL,1,NULL,'Africa'),(NULL,NULL,NULL,NULL,0,10,'PE','PER','Peru','Peru',10,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_pe-flag.gif',NULL,1,NULL,'Americas'),(NULL,NULL,NULL,NULL,0,11,'PH','PHL','Philippines','Philippines',11,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_rp-flag.gif',NULL,1,NULL,'Asia'),(NULL,NULL,NULL,NULL,0,12,'CD','COD','Republic of the Congo','Republic of the Congo',12,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_congo-flag.gif',NULL,1,NULL,'Africa'),(NULL,NULL,NULL,NULL,0,13,'RW','RWA','Rwanda','Rwanda',13,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_rw-flag.gif',NULL,1,NULL,'Africa'),(NULL,NULL,NULL,NULL,0,14,'ST','STP','São Tomé and Príncipe','São Tomé and Príncipe',14,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_tp-flag.gif',NULL,1,NULL,'Africa'),(NULL,NULL,NULL,NULL,0,15,'SN','SEN','Senegal','Senegal',15,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_sg-flag.gif',NULL,1,NULL,'Africa'),(NULL,NULL,NULL,NULL,0,16,'ZA','ZAF','South Africa','South Africa',16,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_sf-flag.gif',NULL,1,NULL,'Africa'),(NULL,NULL,NULL,NULL,0,17,'SD','SDN','Sudan','Sudan',17,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_su-flag.gif',NULL,1,NULL,'Africa'),(NULL,NULL,NULL,NULL,0,18,'TJ','TJK','Tajikistan','Tajikistan',18,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_ti-flag.gif',NULL,1,NULL,'Asia'),(NULL,NULL,NULL,NULL,0,19,'TH','THA','Thailand','Thailand',19,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_th-flag.gif',NULL,1,NULL,'Asia'),(NULL,NULL,NULL,NULL,0,20,'TO','TON','Tonga','Tonga',20,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_tn-flag.gif',NULL,1,NULL,'Oceania'),(NULL,NULL,NULL,NULL,0,21,'TT','TTO','Trinidad and Tobago','Trinidad and Tobago',21,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_td-flag.gif',NULL,1,NULL,'Americas'),(NULL,NULL,NULL,NULL,0,22,'TN','TUN','Tunisia','Tunisia',22,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_ts-flag.gif',NULL,1,NULL,'Africa'),(NULL,NULL,NULL,NULL,0,23,'TM','TKM','Turkmenistan','Turkmenistan',23,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_tx-flag.gif',NULL,1,NULL,'Asia'),(NULL,NULL,NULL,NULL,0,24,'AE','URE','United Arab Emirates','United Arab Emirates',24,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_ae-flag.gif',NULL,1,NULL,'Asia'),(NULL,NULL,NULL,NULL,0,25,'UZ','UZB','Uzbekistan','Uzbekistan',25,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_uz-flag.gif',NULL,1,NULL,'Asia'),(NULL,NULL,NULL,NULL,0,26,'VN','UNM','Viet Nam','Viet Nam',26,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_vm-flag.gif',NULL,1,NULL,'Asia'),(NULL,NULL,NULL,NULL,0,27,'ZW','ZWE','Zimbabwe','Zimbabwe',27,'abc',NULL,NULL,1,'https://www.worldometers.info//img/flags/small/tn_zi-flag.gif',NULL,1,NULL,'Africa');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country_sector`
--

DROP TABLE IF EXISTS `country_sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country_sector` (
  `sectorId` int NOT NULL,
  `countryId` int NOT NULL,
  PRIMARY KEY (`sectorId`,`countryId`),
  KEY `IDX_ac9fae572f4d56580da4c77da0` (`sectorId`),
  KEY `IDX_876a3a24e621b0c8037ca4cf11` (`countryId`),
  CONSTRAINT `FK_876a3a24e621b0c8037ca4cf113` FOREIGN KEY (`countryId`) REFERENCES `country` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ac9fae572f4d56580da4c77da0e` FOREIGN KEY (`sectorId`) REFERENCES `sector` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country_sector`
--

LOCK TABLES `country_sector` WRITE;
/*!40000 ALTER TABLE `country_sector` DISABLE KEYS */;
/*!40000 ALTER TABLE `country_sector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dataRequest`
--

DROP TABLE IF EXISTS `dataRequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dataRequest` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `deadline` datetime DEFAULT NULL,
  `deadlineDataEntry` datetime DEFAULT NULL,
  `reasonForExceedRange` varchar(255) DEFAULT NULL,
  `requestedDate` datetime DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `valueInParameterStandard` varchar(255) DEFAULT NULL,
  `noteDataRequest` varchar(255) DEFAULT NULL,
  `noteDataEntry` varchar(255) DEFAULT NULL,
  `noteDataApprover` varchar(255) DEFAULT NULL,
  `noteCase1` varchar(255) DEFAULT NULL,
  `noteCase2` varchar(255) DEFAULT NULL,
  `noteCase3` varchar(255) DEFAULT NULL,
  `UserDataEntry` int DEFAULT NULL,
  `UserIdFerfyie` int DEFAULT NULL,
  `UserQA` int DEFAULT NULL,
  `dataRequestStatus` int DEFAULT NULL,
  `qaStatus` int DEFAULT NULL,
  `qaStatusUpdatedDate` datetime DEFAULT NULL,
  `qaDeadline` datetime DEFAULT NULL,
  `qaAssighnDate` datetime DEFAULT NULL,
  `qaComment` varchar(255) DEFAULT NULL,
  `ParameterId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_49a33ee0f7fd132bb3bf9f43a8` (`ParameterId`),
  CONSTRAINT `FK_49a33ee0f7fd132bb3bf9f43a8b` FOREIGN KEY (`ParameterId`) REFERENCES `parameter` (`id`) ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dataRequest`
--

LOCK TABLES `dataRequest` WRITE;
/*!40000 ALTER TABLE `dataRequest` DISABLE KEYS */;
INSERT INTO `dataRequest` VALUES ('','2022-02-11 08:14:22','','2022-02-11 08:14:22',0,1,'2022-02-16 18:30:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,7),('','2022-02-15 03:44:18','','2022-02-15 03:44:18',0,4,'2022-02-16 18:30:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,25),('','2022-02-15 03:44:18','','2022-02-15 03:44:18',0,6,'2022-02-16 18:30:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,26),('','2022-02-15 03:44:18','','2022-02-15 03:44:18',0,9,'2022-02-16 18:30:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,27),('','2022-02-15 04:04:16','','2022-02-15 04:04:16',0,17,'2022-02-16 18:30:00','2022-02-27 18:30:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,9,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,39),('','2022-02-15 04:04:16','','2022-02-15 04:04:16',0,19,'2022-02-16 18:30:00','2022-02-27 18:30:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,9,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,40),('','2022-02-15 04:47:49','','2022-02-15 04:47:49',0,30,'2022-05-30 18:30:00','2022-05-30 18:30:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,9,NULL,NULL,9,NULL,NULL,NULL,NULL,NULL,60),('','2022-02-15 07:36:45','','2022-02-15 07:36:45',0,50,'2022-02-27 18:30:00','2022-02-27 18:30:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,9,NULL,NULL,9,NULL,NULL,NULL,NULL,NULL,91);
/*!40000 ALTER TABLE `dataRequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `default_value`
--

DROP TABLE IF EXISTS `default_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `default_value` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `parameterName` varchar(255) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `administrationLevel` varchar(255) NOT NULL,
  `source` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `default_value`
--

LOCK TABLES `default_value` WRITE;
/*!40000 ALTER TABLE `default_value` DISABLE KEYS */;
INSERT INTO `default_value` VALUES (NULL,NULL,NULL,NULL,0,1,'CO2 emission factor of Diesel','t-CO2/TJ','International','IPCC',2020,'640'),(NULL,NULL,NULL,NULL,0,2,'Net calorific value of Diesel ','TJ/t','International','IPCC',2020,'20');
/*!40000 ALTER TABLE `default_value` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `documentOwner` int NOT NULL,
  `documentOwnerId` int NOT NULL,
  `mimeType` varchar(255) NOT NULL,
  `fileName` varchar(255) NOT NULL,
  `relativePath` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES ('-','2022-02-15 13:42:58','-','2022-02-15 13:42:58',0,1,1,3,'image/jpeg','Data management.jpg','Project/3/1aa27b93.jpg'),('-','2022-02-15 13:43:51','-','2022-02-15 13:43:51',0,2,1,3,'application/pdf','420R14014.PDF','Project/3/b7984660.PDF'),('-','2022-02-15 13:44:00','-','2022-02-15 13:44:00',0,3,1,3,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','19R_V1_Ch03_Ad_IPCC_Tool_for_Approach_1_Uncertainty_Analysis.xlsx','Project/3/8ff98107.xlsx'),('-','2022-02-15 13:44:21','-','2022-02-15 13:44:21',0,4,1,3,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','19R_V1_Ch03_Ad_IPCC_Tool_for_Approach_1_Uncertainty_Analysis.xlsx','Project/3/77f54f55.xlsx');
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financing_scheme`
--

DROP TABLE IF EXISTS `financing_scheme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financing_scheme` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2500) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financing_scheme`
--

LOCK TABLES `financing_scheme` WRITE;
/*!40000 ALTER TABLE `financing_scheme` DISABLE KEYS */;
INSERT INTO `financing_scheme` VALUES ('2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00',1,1,'Loan','Loan',1),('2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00',1,2,'Grant','Grant',1),('2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00',1,3,'Equity Only','Equity Only',1);
/*!40000 ALTER TABLE `financing_scheme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institution`
--

DROP TABLE IF EXISTS `institution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institution` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(300) NOT NULL,
  `sortOrder` int NOT NULL,
  `isNational` tinyint DEFAULT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  `canNotDelete` tinyint NOT NULL DEFAULT '0',
  `address` varchar(100) NOT NULL,
  `telephoneNumber` varchar(255) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `typeId` int DEFAULT NULL,
  `parentInstitutionId` int DEFAULT NULL,
  `sectorId` int DEFAULT NULL,
  `countryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d218ad3566afa9e396f184fd7d` (`name`),
  KEY `FK_624b822b4a45197c6f0b88051bc` (`categoryId`),
  KEY `FK_4893e540d687978250eb88fa2dc` (`typeId`),
  KEY `FK_3ca64cf0f964345e07b4c469bbe` (`parentInstitutionId`),
  KEY `FK_f3f21862097ed00c4daee496c71` (`sectorId`),
  KEY `FK_44ff376c15f8ecc9e2290605050` (`countryId`),
  CONSTRAINT `FK_3ca64cf0f964345e07b4c469bbe` FOREIGN KEY (`parentInstitutionId`) REFERENCES `institution` (`id`),
  CONSTRAINT `FK_44ff376c15f8ecc9e2290605050` FOREIGN KEY (`countryId`) REFERENCES `country` (`id`),
  CONSTRAINT `FK_4893e540d687978250eb88fa2dc` FOREIGN KEY (`typeId`) REFERENCES `institution_type` (`id`),
  CONSTRAINT `FK_624b822b4a45197c6f0b88051bc` FOREIGN KEY (`categoryId`) REFERENCES `institution_category` (`id`),
  CONSTRAINT `FK_f3f21862097ed00c4daee496c71` FOREIGN KEY (`sectorId`) REFERENCES `sector` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institution`
--

LOCK TABLES `institution` WRITE;
/*!40000 ALTER TABLE `institution` DISABLE KEYS */;
INSERT INTO `institution` VALUES ('2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00',1,1,'Test ins','test',1,1,NULL,0,'','111111',NULL,1,1,NULL,NULL,NULL),('-','2022-02-14 11:03:24','-','2022-02-14 11:03:24',0,2,'S.M.N.M.Sandeepani','Provide the fuel consumption of the buses and travel distance',0,0,NULL,0,'B/678,\nThanu Bus Service','0712536987','nilnimalsha@gmail.com',3,2,NULL,NULL,NULL),('-','2022-02-14 12:06:11','-','2022-02-14 12:06:11',0,4,'Ministry of Energy','Provide the fuel consumption of road transport',0,0,NULL,0,'NO.80, SIR ERNEST DE SILVA MAWATHA, COLOMBO 07. SRI LANKA.','+941 12564 969',NULL,1,2,NULL,NULL,NULL),('-','2022-02-14 14:34:53','-','2022-02-14 14:34:53',0,5,'Ministry of Environment','Verify the data ',0,0,NULL,0,'Sobadam Piyasa,\n416/C/1, Robert Gunawardana Mawatha,\nBattaramulla.Sri Lanka.','+94 112 034 100','info@env.gov.lk',1,1,NULL,NULL,NULL),('-','2022-02-15 01:53:29','-','2022-02-15 01:53:29',0,6,' Ceylon Petroleum Corporation','Provide the actual fuel price (annual average) in local currency for the assessment year',0,0,NULL,0,'No.609, Dr. Danister de Silva Mawatha, Colombo 09.','+94 11 5455455','secratariat[at]ceypetco.gov.lk',2,2,NULL,NULL,NULL),('-','2022-02-15 02:04:32','-','2022-02-15 02:04:32',0,7,'Central Bank of Sri Lanka','Provide the actual per capita income (annual average) in local currency for the assessment year',0,0,NULL,0,'Central Bank of Sri Lanka, P O Box 590, Colombo 01, Sri Lanka',' +94 11 247 7000','cbslgen@cbsl.lk',1,2,NULL,NULL,NULL),('-','2022-02-15 05:59:57','-','2022-02-15 05:59:57',0,8,'Ministry of Transport','Ministry of Transport',0,0,NULL,0,'Colombo','0115236987','transport@ministry.lk',1,2,NULL,NULL,NULL),('-','2022-02-15 06:02:00','-','2022-02-15 06:02:00',0,9,'Ceylon Petroleum Cooperation','Ceylon Petroleum Cooperation',0,0,NULL,0,'Colombo','0115236980','Ceylonpetroleum@Coop.lk',1,2,NULL,NULL,NULL),('-','2022-02-15 06:03:01','-','2022-02-15 06:03:01',0,10,'Ministry of Transport_NDC unit','Ministry of Transport_NDC unit',0,0,NULL,0,'Colombo','0115236987','ndcunit@transport.lk',1,1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `institution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institution_category`
--

DROP TABLE IF EXISTS `institution_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institution_category` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2500) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institution_category`
--

LOCK TABLES `institution_category` WRITE;
/*!40000 ALTER TABLE `institution_category` DISABLE KEYS */;
INSERT INTO `institution_category` VALUES (NULL,'2022-02-01 09:41:33',NULL,'2022-02-01 09:41:33',0,1,'Government',NULL,1),(NULL,'2022-02-01 09:41:33',NULL,'2022-02-01 09:41:33',0,2,'Semi-Government',NULL,2),(NULL,'2022-02-01 09:41:33',NULL,'2022-02-01 09:41:33',0,3,'Private',NULL,3),(NULL,'2022-02-01 09:41:33',NULL,'2022-02-01 09:41:33',0,4,'Public-privet partnership',NULL,4),(NULL,'2022-02-01 09:41:33',NULL,'2022-02-01 09:41:33',0,5,'NGO',NULL,5),(NULL,'2022-02-01 09:41:33',NULL,'2022-02-01 09:41:33',0,6,'Other',NULL,6);
/*!40000 ALTER TABLE `institution_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institution_type`
--

DROP TABLE IF EXISTS `institution_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institution_type` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2500) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institution_type`
--

LOCK TABLES `institution_type` WRITE;
/*!40000 ALTER TABLE `institution_type` DISABLE KEYS */;
INSERT INTO `institution_type` VALUES (NULL,'2022-02-01 04:16:57',NULL,'2022-02-01 04:16:57',0,1,'NDC unit',NULL,1),(NULL,'2022-02-01 04:16:57',NULL,'2022-02-01 04:16:57',0,2,'Data provider institution',NULL,2),(NULL,'2022-02-01 04:16:57',NULL,'2022-02-01 04:16:57',0,3,'External Institution',NULL,3);
/*!40000 ALTER TABLE `institution_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instype_usertype`
--

DROP TABLE IF EXISTS `instype_usertype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instype_usertype` (
  `institutionTypeId` int NOT NULL,
  `userTypeId` int NOT NULL,
  PRIMARY KEY (`institutionTypeId`,`userTypeId`),
  KEY `IDX_4c03eadc28c1215b41ebae1199` (`institutionTypeId`),
  KEY `IDX_9d5682e2e132e5921fdf9a9b62` (`userTypeId`),
  CONSTRAINT `FK_4c03eadc28c1215b41ebae11990` FOREIGN KEY (`institutionTypeId`) REFERENCES `institution_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_9d5682e2e132e5921fdf9a9b629` FOREIGN KEY (`userTypeId`) REFERENCES `user_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instype_usertype`
--

LOCK TABLES `instype_usertype` WRITE;
/*!40000 ALTER TABLE `instype_usertype` DISABLE KEYS */;
/*!40000 ALTER TABLE `instype_usertype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learning_material`
--

DROP TABLE IF EXISTS `learning_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learning_material` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `documentType` varchar(255) DEFAULT NULL,
  `documentName` varchar(255) DEFAULT NULL,
  `document` varchar(255) DEFAULT NULL,
  `isPublish` int DEFAULT NULL,
  `thumbnail` varchar(255) NOT NULL DEFAULT 'https://www.pngkey.com/png/detail/342-3428680_document-clipart.png',
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learning_material`
--

LOCK TABLES `learning_material` WRITE;
/*!40000 ALTER TABLE `learning_material` DISABLE KEYS */;
INSERT INTO `learning_material` VALUES (NULL,'2022-02-02 12:52:40',NULL,'2022-02-02 12:52:40',0,1,'User Guidance','test document','https://s1.q4cdn.com/806093406/files/doc_downloads/test.pdf',1,'https://www.pngkey.com/png/detail/342-3428680_document-clipart.png',NULL),(NULL,'2022-02-02 12:52:40',NULL,'2022-02-02 12:52:40',0,2,'Learning Material ','test ','https://www.youtube.com/watch?v=X0Kj8dD_X_M',1,'https://www.pngkey.com/png/detail/342-3428680_document-clipart.png',NULL),(NULL,'2022-02-02 12:52:40',NULL,'2022-02-02 12:52:40',0,3,'Learning Material ','test ','https://www.youtube.com/watch?v=X0Kj8dD_X_M',1,'https://www.pngkey.com/png/detail/342-3428680_document-clipart.png',NULL),('1','2021-11-30 00:00:00','1','2021-11-30 00:00:00',1,4,'User Guidence','Good data and research….helps us to focus on what matters and take the right action in our climate battle.','https://www.youtube.com/watch?v=_8SWcuusWFI&list=PL72b4VTONst3uH_PfcsDKxrpVnnXnBT4N',1,'https://www.pngkey.com/png/detail/342-3428680_document-clipart.png',NULL),('1','2021-11-30 00:00:00','1','2021-11-30 00:00:00',1,5,'User Guidence','Strengthening climate action through NDC and enhanced transparency initiative','https://www.youtube.com/watch?v=X8gjtdZOwuM&list=PL72b4VTONst3uH_PfcsDKxrpVnnXnBT4N',1,'https://www.pngkey.com/png/detail/342-3428680_document-clipart.png',NULL),('1','2021-11-30 00:00:00','1','2021-11-30 00:00:00',1,6,'User Guidence','test-01','https://www.youtube.com/watch?v=_8SWcuusWFI&list=PL72b4VTONst3uH_PfcsDKxrpVnnXnBT4N',1,'https://www.pngkey.com/png/detail/342-3428680_document-clipart.png',NULL),('1','2021-11-30 00:00:00','1','2021-11-30 00:00:00',1,7,'User Guidence','test-02','https://www.youtube.com/watch?v=X8gjtdZOwuM&list=PL72b4VTONst3uH_PfcsDKxrpVnnXnBT4N',1,'https://www.pngkey.com/png/detail/342-3428680_document-clipart.png',NULL);
/*!40000 ALTER TABLE `learning_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learning_material_sector`
--

DROP TABLE IF EXISTS `learning_material_sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learning_material_sector` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `learningMaterial2Id` int DEFAULT NULL,
  `sectorId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_896211865857258fb8cae3434d4` (`learningMaterial2Id`),
  KEY `FK_05475f6a338a7a5d6dcc19d3917` (`sectorId`),
  CONSTRAINT `FK_05475f6a338a7a5d6dcc19d3917` FOREIGN KEY (`sectorId`) REFERENCES `sector` (`id`),
  CONSTRAINT `FK_896211865857258fb8cae3434d4` FOREIGN KEY (`learningMaterial2Id`) REFERENCES `learning_material` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learning_material_sector`
--

LOCK TABLES `learning_material_sector` WRITE;
/*!40000 ALTER TABLE `learning_material_sector` DISABLE KEYS */;
/*!40000 ALTER TABLE `learning_material_sector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learning_material_user_type`
--

DROP TABLE IF EXISTS `learning_material_user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learning_material_user_type` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `learningMaterialId` int DEFAULT NULL,
  `userTypeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_79de6299326ccddcfa7ea877019` (`learningMaterialId`),
  KEY `FK_67aeae28f6be57ee476b6b68178` (`userTypeId`),
  CONSTRAINT `FK_67aeae28f6be57ee476b6b68178` FOREIGN KEY (`userTypeId`) REFERENCES `user_type` (`id`),
  CONSTRAINT `FK_79de6299326ccddcfa7ea877019` FOREIGN KEY (`learningMaterialId`) REFERENCES `learning_material` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learning_material_user_type`
--

LOCK TABLES `learning_material_user_type` WRITE;
/*!40000 ALTER TABLE `learning_material_user_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `learning_material_user_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `methodology`
--

DROP TABLE IF EXISTS `methodology`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `methodology` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `version` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `developedBy` varchar(255) DEFAULT NULL,
  `parentId` int DEFAULT NULL,
  `applicableSector` varchar(255) DEFAULT NULL,
  `Documents` varchar(255) DEFAULT NULL,
  `easenessOfDataCollection` varchar(255) DEFAULT NULL,
  `countryId` int DEFAULT NULL,
  `sectorId` int DEFAULT NULL,
  `mitigationActionTypeId` int DEFAULT NULL,
  `applicabilityId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_233d133d9992c1191c613a9b345` (`countryId`),
  KEY `FK_115ce1bdd3f8dbb2e36d49ff71f` (`sectorId`),
  KEY `FK_b9c3f66fd6907e1550008854ecc` (`mitigationActionTypeId`),
  KEY `FK_8db0e9afc027c589d41bea7e56d` (`applicabilityId`),
  CONSTRAINT `FK_115ce1bdd3f8dbb2e36d49ff71f` FOREIGN KEY (`sectorId`) REFERENCES `sector` (`id`),
  CONSTRAINT `FK_233d133d9992c1191c613a9b345` FOREIGN KEY (`countryId`) REFERENCES `country` (`id`),
  CONSTRAINT `FK_8db0e9afc027c589d41bea7e56d` FOREIGN KEY (`applicabilityId`) REFERENCES `applicability` (`id`),
  CONSTRAINT `FK_b9c3f66fd6907e1550008854ecc` FOREIGN KEY (`mitigationActionTypeId`) REFERENCES `mitigationActionType` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `methodology`
--

LOCK TABLES `methodology` WRITE;
/*!40000 ALTER TABLE `methodology` DISABLE KEYS */;
INSERT INTO `methodology` VALUES (NULL,NULL,NULL,NULL,0,1,'AMS-iii-S','AMS_III_S','CDM',NULL,'Transport',NULL,'4',1,1,3,3),(NULL,NULL,NULL,NULL,0,2,'ICAT_TPM_FSR_2020_A','ICAT_TPM_FSR_2020_A','ICAT',NULL,'Transport',NULL,'0',1,1,1,1),(NULL,NULL,NULL,NULL,0,3,'ICAT_TPM_FSR_2020_B','ICAT_TPM_FSR_2020_B','ICAT',NULL,'Transport',NULL,'0',1,1,1,1),(NULL,NULL,NULL,NULL,0,4,'ICAT_TPM_FSR_2020_C','ICAT_TPM_FSR_2020_C','ICAT',NULL,'Transport',NULL,'0',1,1,1,1),(NULL,NULL,NULL,NULL,0,5,'ICAT_TPM_RP_2020_cordon','ICAT_TPM_RP_2020_cordon','ICAT',NULL,'Transport',NULL,'0',1,1,1,1),(NULL,NULL,NULL,NULL,0,6,'ICAT_TPM_RP_2020_Toll_roads','ICAT_TPM_RP_2020_Toll_roads','ICAT',NULL,'Transport',NULL,'0',1,1,1,1),(NULL,NULL,NULL,NULL,0,7,'UNFCCC_AMS_III_BC','UNFCCC_AMS_III_BC','CDM',1,'Transport',NULL,'1',1,1,1,1);
/*!40000 ALTER TABLE `methodology` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `methodology_ndc`
--

DROP TABLE IF EXISTS `methodology_ndc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `methodology_ndc` (
  `ndcId` int NOT NULL,
  `methodologyId` int NOT NULL,
  PRIMARY KEY (`ndcId`,`methodologyId`),
  KEY `IDX_2b2d4660abda99ab9f7d971dc5` (`ndcId`),
  KEY `IDX_2463571bae328e7725bba2af3c` (`methodologyId`),
  CONSTRAINT `FK_2463571bae328e7725bba2af3c3` FOREIGN KEY (`methodologyId`) REFERENCES `methodology` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_2b2d4660abda99ab9f7d971dc5c` FOREIGN KEY (`ndcId`) REFERENCES `ndc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `methodology_ndc`
--

LOCK TABLES `methodology_ndc` WRITE;
/*!40000 ALTER TABLE `methodology_ndc` DISABLE KEYS */;
/*!40000 ALTER TABLE `methodology_ndc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `methodology_subndc`
--

DROP TABLE IF EXISTS `methodology_subndc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `methodology_subndc` (
  `subNdcId` int NOT NULL,
  `methodologyId` int NOT NULL,
  PRIMARY KEY (`subNdcId`,`methodologyId`),
  KEY `IDX_89cf69a71a543fc436e4ca461f` (`subNdcId`),
  KEY `IDX_a92fe16339b57a384579b850d5` (`methodologyId`),
  CONSTRAINT `FK_89cf69a71a543fc436e4ca461fa` FOREIGN KEY (`subNdcId`) REFERENCES `sub_ndc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_a92fe16339b57a384579b850d5d` FOREIGN KEY (`methodologyId`) REFERENCES `methodology` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `methodology_subndc`
--

LOCK TABLES `methodology_subndc` WRITE;
/*!40000 ALTER TABLE `methodology_subndc` DISABLE KEYS */;
/*!40000 ALTER TABLE `methodology_subndc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `methodology_subsection`
--

DROP TABLE IF EXISTS `methodology_subsection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `methodology_subsection` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2500) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '1',
  `type` varchar(255) NOT NULL,
  `parentType` varchar(255) NOT NULL,
  `methodologyId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_0ba5a9311f6e858d5ed20af94fa` (`methodologyId`),
  CONSTRAINT `FK_0ba5a9311f6e858d5ed20af94fa` FOREIGN KEY (`methodologyId`) REFERENCES `methodology` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `methodology_subsection`
--

LOCK TABLES `methodology_subsection` WRITE;
/*!40000 ALTER TABLE `methodology_subsection` DISABLE KEYS */;
/*!40000 ALTER TABLE `methodology_subsection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mitigationActionType`
--

DROP TABLE IF EXISTS `mitigationActionType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mitigationActionType` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2500) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mitigationActionType`
--

LOCK TABLES `mitigationActionType` WRITE;
/*!40000 ALTER TABLE `mitigationActionType` DISABLE KEYS */;
INSERT INTO `mitigationActionType` VALUES (NULL,'2022-01-31 14:26:47',NULL,'2022-01-31 14:26:47',0,1,'Fuel Pricing Policices ','Inter Urban Rail Infrastructure',1),(NULL,'2022-01-31 14:26:47',NULL,'2022-01-31 14:26:47',0,2,'Inter Urban Rail Infrastructure','Inter Urban Rail Infrastructure',2),(NULL,'2022-01-31 14:26:47',NULL,'2022-01-31 14:26:47',0,3,'Alternative Fuels Incentives,Regulation and Production','Alternative Fuels Incentives,Regulation and Production',3);
/*!40000 ALTER TABLE `mitigationActionType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ndc`
--

DROP TABLE IF EXISTS `ndc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ndc` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2500) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '1',
  `setId` int DEFAULT NULL,
  `countryId` int DEFAULT NULL,
  `sectorId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_92389299b167ac885ba3bec8657` (`setId`),
  KEY `FK_7e561bde5bd1c89bb8a54e13a2f` (`countryId`),
  KEY `FK_654634fb70af569a33c1cdb994c` (`sectorId`),
  CONSTRAINT `FK_654634fb70af569a33c1cdb994c` FOREIGN KEY (`sectorId`) REFERENCES `sector` (`id`),
  CONSTRAINT `FK_7e561bde5bd1c89bb8a54e13a2f` FOREIGN KEY (`countryId`) REFERENCES `country` (`id`),
  CONSTRAINT `FK_92389299b167ac885ba3bec8657` FOREIGN KEY (`setId`) REFERENCES `ndc_set` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ndc`
--

LOCK TABLES `ndc` WRITE;
/*!40000 ALTER TABLE `ndc` DISABLE KEYS */;
INSERT INTO `ndc` VALUES ('2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00',1,1,'Test Ndc','Test Ndc',1,1,NULL,NULL);
/*!40000 ALTER TABLE `ndc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ndc_set`
--

DROP TABLE IF EXISTS `ndc_set`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ndc_set` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2500) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '1',
  `submissionDate` datetime NOT NULL,
  `countryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ca2befaabb1b648bef65426505e` (`countryId`),
  CONSTRAINT `FK_ca2befaabb1b648bef65426505e` FOREIGN KEY (`countryId`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ndc_set`
--

LOCK TABLES `ndc_set` WRITE;
/*!40000 ALTER TABLE `ndc_set` DISABLE KEYS */;
INSERT INTO `ndc_set` VALUES ('2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00',1,1,'Test set','tesyt test',1,'2021-11-30 00:00:00',NULL);
/*!40000 ALTER TABLE `ndc_set` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parameter`
--

DROP TABLE IF EXISTS `parameter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parameter` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `isAlternative` tinyint DEFAULT NULL,
  `ParentParameterId` int DEFAULT NULL,
  `isBaseline` tinyint NOT NULL,
  `isProject` tinyint NOT NULL,
  `isLekage` tinyint NOT NULL,
  `isProjection` tinyint NOT NULL,
  `vehical` varchar(255) DEFAULT NULL,
  `fuelType` varchar(255) DEFAULT NULL,
  `route` varchar(255) DEFAULT NULL,
  `powerPlant` varchar(255) DEFAULT NULL,
  `uomDataRequest` varchar(255) DEFAULT NULL,
  `uomDataEntry` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `conversionValue` varchar(255) DEFAULT NULL,
  `baseYear` int DEFAULT NULL,
  `projectionBaseYear` int DEFAULT NULL,
  `useDefaultValue` tinyint DEFAULT NULL,
  `AssessmentYear` int DEFAULT NULL,
  `projectionYear` int DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `methodologyCode` varchar(255) DEFAULT NULL,
  `methodologyVersion` varchar(255) DEFAULT NULL,
  `institutionId` int DEFAULT NULL,
  `assessmentId` int DEFAULT NULL,
  `defaultValueId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c584a0d5a74c7cfb5bcc3ecf9f0` (`institutionId`),
  KEY `FK_f65f85e073aff8e11ef4f5c3d8a` (`assessmentId`),
  KEY `FK_86eff4c77820b616bf6ac0c19b2` (`defaultValueId`),
  CONSTRAINT `FK_86eff4c77820b616bf6ac0c19b2` FOREIGN KEY (`defaultValueId`) REFERENCES `default_value` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_c584a0d5a74c7cfb5bcc3ecf9f0` FOREIGN KEY (`institutionId`) REFERENCES `institution` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_f65f85e073aff8e11ef4f5c3d8a` FOREIGN KEY (`assessmentId`) REFERENCES `assesment` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parameter`
--

LOCK TABLES `parameter` WRITE;
/*!40000 ALTER TABLE `parameter` DISABLE KEYS */;
INSERT INTO `parameter` VALUES (NULL,NULL,NULL,NULL,0,1,'Actual fuel mix price in local currency for the assessment year',1,NULL,0,1,0,0,'','ALL','','','','',NULL,NULL,2020,NULL,0,2020,NULL,'mixFuelPrice','ICAT_TPM_FSR_2020_A','1',NULL,1,NULL),(NULL,NULL,NULL,NULL,0,2,'Total fuel used for ground transport(Fuel mix)',0,NULL,1,0,0,0,'','ALL','','','TJ','TJ','1000','1000',2020,NULL,0,2020,NULL,'fuelUsed','ICAT_TPM_FSR_2020_A','1',NULL,1,NULL),(NULL,NULL,NULL,NULL,0,3,'Share of fuel type Diesel',0,NULL,1,0,0,0,'','Diesel','','','%','%','100','100',2020,NULL,0,2020,NULL,'fuelShare','ICAT_TPM_FSR_2020_A','1',NULL,1,NULL),(NULL,NULL,NULL,NULL,0,4,'CO2 emission factor of Diesel',0,NULL,1,0,0,0,'','Diesel','','','t-CO2/TJ','t-CO2/TJ','10','10',2020,NULL,0,2020,NULL,'ef','ICAT_TPM_FSR_2020_A','1',NULL,1,NULL),(NULL,NULL,NULL,NULL,0,5,'Fuel mix own - price elasticity',0,NULL,0,1,0,0,'','ALL','','','','','150','150',2020,NULL,0,2020,NULL,'fuelMixPriceElasticity','ICAT_TPM_FSR_2020_A','1',NULL,1,NULL),(NULL,NULL,NULL,NULL,0,6,'Country Code',1,NULL,0,1,0,0,'','ALL','','','','',NULL,NULL,2020,NULL,0,2020,NULL,'countryCode','ICAT_TPM_FSR_2020_A','1',NULL,1,NULL),(NULL,NULL,NULL,NULL,0,7,'Actual per capita income in local currency for the assessment year',1,NULL,0,1,0,0,'','ALL','','','','',NULL,NULL,2020,NULL,0,2020,NULL,'capitalIncome','ICAT_TPM_FSR_2020_A','1',NULL,1,NULL),(NULL,NULL,NULL,NULL,0,8,'Relative fuel mix price increase',0,NULL,0,1,0,0,'','ALL','','','%','%','150','150',2020,NULL,0,2020,NULL,'fuelMixPriceIncrease','ICAT_TPM_FSR_2020_A','1',NULL,1,NULL),(NULL,NULL,NULL,NULL,0,9,'CO2 emission factor of Diesel',0,NULL,1,0,0,0,'','Diesel','','','t-CO2/TJ','t-CO2/TJ','66','66',2020,NULL,0,2022,NULL,'ef','cdm_ams_iii_s','1',NULL,2,NULL),(NULL,NULL,NULL,NULL,0,10,'The annual average distance',0,NULL,1,0,0,0,'car','Diesel','525','','km','km','22','22',2020,NULL,0,2022,NULL,'dp','cdm_ams_iii_s','1',NULL,2,NULL),(NULL,NULL,NULL,NULL,0,11,'Total annual passengers',1,NULL,1,0,0,0,'car','Diesel','525','','km','km','22','22',2020,NULL,0,2022,NULL,'p','cdm_ams_iii_s','1',NULL,2,NULL),(NULL,NULL,NULL,NULL,0,12,'Total annual distance',1,NULL,1,0,0,0,'car','Diesel','525','','km','km','44','44',2020,NULL,0,2022,NULL,'d','cdm_ams_iii_s','1',NULL,2,NULL),(NULL,NULL,NULL,NULL,0,13,'Fuel efficiency',0,NULL,1,0,0,0,'car','Diesel','525','','fuel/km','fuel/km','55','55',2020,NULL,0,2022,NULL,'n','cdm_ams_iii_s','1',NULL,2,NULL),(NULL,NULL,NULL,NULL,0,14,'Net calorific value of Diesel ',0,NULL,1,0,0,0,'','Diesel','','','TJ/t','TJ/t','55','55',2020,NULL,0,2022,NULL,'ncv','cdm_ams_iii_s','1',NULL,2,NULL),(NULL,NULL,NULL,NULL,0,15,'Total annual distance',0,NULL,0,1,0,0,'train','Diesel','route 1','','km',NULL,NULL,NULL,2022,NULL,0,2013,NULL,'d','cdm_ams_iii_s','1',2,3,NULL),(NULL,NULL,NULL,NULL,0,16,'The annual average distance',0,NULL,1,0,0,0,'car','Diesel','route 1','','km',NULL,NULL,NULL,2022,NULL,0,2013,NULL,'dp','cdm_ams_iii_s','1',2,3,NULL),(NULL,NULL,NULL,NULL,0,17,'Total annual passengers',1,NULL,1,0,0,0,'car','Diesel','route 1','','km',NULL,NULL,NULL,2022,NULL,0,2013,NULL,'p','cdm_ams_iii_s','1',2,3,NULL),(NULL,NULL,NULL,NULL,0,18,'Fuel efficiency',0,NULL,1,0,0,0,'car','Diesel','route 1','','fuel/km',NULL,NULL,NULL,2022,NULL,0,2013,NULL,'n','cdm_ams_iii_s','1',2,3,NULL),(NULL,NULL,NULL,NULL,0,19,'Net calorific value of Diesel ',0,NULL,1,0,0,0,'','Diesel','','','TJ/t',NULL,NULL,NULL,2022,NULL,0,2013,NULL,'ncv','cdm_ams_iii_s','1',2,3,NULL),(NULL,NULL,NULL,NULL,0,20,'Total annual distance',1,NULL,1,0,0,0,'car','Diesel','route 1','','km',NULL,NULL,NULL,2022,NULL,0,2013,NULL,'d','cdm_ams_iii_s','1',2,3,NULL),(NULL,NULL,NULL,NULL,0,21,'CO2 emission factor of Diesel',0,NULL,1,0,0,0,'','Diesel','','','t-CO2/TJ',NULL,NULL,NULL,2022,NULL,0,2013,NULL,'ef','cdm_ams_iii_s','1',2,3,NULL),(NULL,NULL,NULL,NULL,0,22,'Consumption of fuel',0,NULL,0,1,0,0,'train','Diesel','route 1','','t/y',NULL,NULL,NULL,2022,NULL,0,2013,NULL,'fc','cdm_ams_iii_s','1',2,3,NULL),(NULL,NULL,NULL,NULL,0,23,'Total annual average distance',1,NULL,0,1,0,0,'train','Diesel','route 1','','km',NULL,NULL,NULL,2022,NULL,0,2013,NULL,'dp','cdm_ams_iii_s','1',2,3,NULL),(NULL,NULL,NULL,NULL,0,24,'Total annual passengers',0,NULL,0,1,0,0,'train','Diesel','route 1','','passengers or tons',NULL,NULL,NULL,2022,NULL,0,2013,NULL,'p','cdm_ams_iii_s','1',2,3,NULL),(NULL,NULL,NULL,NULL,0,25,'Fuel efficiency',1,NULL,0,1,0,0,'train','Diesel','route 1','','t/y',NULL,NULL,NULL,2022,NULL,0,2013,NULL,'n','cdm_ams_iii_s','1',2,3,NULL),(NULL,NULL,NULL,NULL,0,26,'Net calorific value of Diesel',0,NULL,0,1,0,0,'','Diesel','','','TJ/t',NULL,NULL,NULL,2022,NULL,0,2013,NULL,'ncv','cdm_ams_iii_s','1',2,3,NULL),(NULL,NULL,NULL,NULL,0,27,'CO2 emission factor of Diesel',0,NULL,0,1,0,0,'','Diesel','','','t-CO2/TJ',NULL,NULL,NULL,2022,NULL,0,2013,NULL,'ef','cdm_ams_iii_s','1',2,3,NULL),(NULL,NULL,NULL,NULL,0,28,'Consumption of fuel',0,NULL,0,1,0,0,'Other','Diesel','route1','','t/y',NULL,NULL,NULL,2060,NULL,0,2013,NULL,'fc','cdm_ams_iii_s','1',2,4,NULL),(NULL,NULL,NULL,NULL,0,29,'The annual average distance',0,NULL,1,0,0,0,'car','Diesel','route1','','km',NULL,NULL,NULL,2060,NULL,0,2013,NULL,'dp','cdm_ams_iii_s','1',2,4,NULL),(NULL,NULL,NULL,NULL,0,30,'Total annual passengers',1,NULL,1,0,0,0,'car','Diesel','route1','','km',NULL,NULL,NULL,2060,NULL,0,2013,NULL,'p','cdm_ams_iii_s','1',2,4,NULL),(NULL,NULL,NULL,NULL,0,31,'Fuel efficiency',0,NULL,1,0,0,0,'car','Diesel','route1','','fuel/km',NULL,NULL,NULL,2060,NULL,0,2013,NULL,'n','cdm_ams_iii_s','1',2,4,NULL),(NULL,NULL,NULL,NULL,0,32,'Total annual distance',1,NULL,1,0,0,0,'car','Diesel','route1','','km',NULL,NULL,NULL,2060,NULL,0,2013,NULL,'d','cdm_ams_iii_s','1',2,4,NULL),(NULL,NULL,NULL,NULL,0,33,'Net calorific value of Diesel ',0,NULL,1,0,0,0,'','Diesel','','','TJ/t',NULL,NULL,NULL,2060,NULL,0,2013,NULL,'ncv','cdm_ams_iii_s','1',2,4,NULL),(NULL,NULL,NULL,NULL,0,34,'CO2 emission factor of Diesel',0,NULL,1,0,0,0,'','Diesel','','','t-CO2/TJ',NULL,NULL,NULL,2060,NULL,0,2013,NULL,'ef','cdm_ams_iii_s','1',2,4,NULL),(NULL,NULL,NULL,NULL,0,35,'Total annual distance',0,NULL,0,1,0,0,'Other','Diesel','route1','','km',NULL,NULL,NULL,2060,NULL,0,2013,NULL,'d','cdm_ams_iii_s','1',2,4,NULL),(NULL,NULL,NULL,NULL,0,36,'Total annual average distance',1,NULL,0,1,0,0,'Other','Diesel','route1','','km',NULL,NULL,NULL,2060,NULL,0,2013,NULL,'dp','cdm_ams_iii_s','1',2,4,NULL),(NULL,NULL,NULL,NULL,0,37,'Total annual passengers',0,NULL,0,1,0,0,'Other','Diesel','route1','','passengers or tons',NULL,NULL,NULL,2060,NULL,0,2013,NULL,'p','cdm_ams_iii_s','1',2,4,NULL),(NULL,NULL,NULL,NULL,0,38,'Fuel efficiency',1,NULL,0,1,0,0,'Other','Diesel','route1','','t/y',NULL,NULL,NULL,2060,NULL,0,2013,NULL,'n','cdm_ams_iii_s','1',2,4,NULL),(NULL,NULL,NULL,NULL,0,39,'CO2 emission factor of Diesel',0,NULL,0,1,0,0,'','Diesel','','','t-CO2/TJ',NULL,NULL,NULL,2060,NULL,0,2013,NULL,'ef','cdm_ams_iii_s','1',2,4,NULL),(NULL,NULL,NULL,NULL,0,40,'Net calorific value of Diesel',0,NULL,0,1,0,0,'','Diesel','','','TJ/t',NULL,NULL,NULL,2060,NULL,0,2013,NULL,'ncv','cdm_ams_iii_s','1',2,4,NULL),(NULL,NULL,NULL,NULL,0,41,'Relative fuel mix price increase',0,NULL,0,1,0,0,'','ALL','','','%',NULL,NULL,NULL,2020,NULL,0,2023,NULL,'fuelMixPriceIncrease','ICAT_TPM_FSR_2020_A','1',6,5,NULL),(NULL,NULL,NULL,NULL,0,42,'Total fuel used for ground transport(Fuel mix)',0,NULL,1,0,0,0,'','ALL','','','TJ',NULL,NULL,NULL,2020,NULL,0,2023,NULL,'fuelUsed','ICAT_TPM_FSR_2020_A','1',4,5,NULL),(NULL,NULL,NULL,NULL,0,43,'Share of fuel type Diesel',0,NULL,1,0,0,0,'','Diesel','','','%',NULL,NULL,NULL,2020,NULL,0,2023,NULL,'fuelShare','ICAT_TPM_FSR_2020_A','1',4,5,NULL),(NULL,NULL,NULL,NULL,0,44,'CO2 emission factor of Diesel',0,NULL,1,0,0,0,'','Diesel','','','t-CO2/TJ',NULL,NULL,NULL,2020,NULL,0,2023,NULL,'ef','ICAT_TPM_FSR_2020_A','1',4,5,NULL),(NULL,NULL,NULL,NULL,0,45,'Share of fuel type Petrol',0,NULL,1,0,0,0,'','Petrol','','','%',NULL,NULL,NULL,2020,NULL,0,2023,NULL,'fuelShare','ICAT_TPM_FSR_2020_A','1',4,5,NULL),(NULL,NULL,NULL,NULL,0,46,'CO2 emission factor of Petrol',0,NULL,1,0,0,0,'','Petrol','','','t-CO2/TJ',NULL,NULL,NULL,2020,NULL,0,2023,NULL,'ef','ICAT_TPM_FSR_2020_A','1',4,5,NULL),(NULL,NULL,NULL,NULL,0,47,'Fuel mix own - price elasticity',0,NULL,0,1,0,0,'','ALL','','','',NULL,NULL,NULL,2020,NULL,0,2023,NULL,'fuelMixPriceElasticity','ICAT_TPM_FSR_2020_A','1',6,5,NULL),(NULL,NULL,NULL,NULL,0,48,'Country Code',1,NULL,0,1,0,0,'','ALL','','','',NULL,NULL,NULL,2020,NULL,0,2023,NULL,'countryCode','ICAT_TPM_FSR_2020_A','1',7,5,NULL),(NULL,NULL,NULL,NULL,0,49,'Actual fuel mix price in local currency for the assessment year',1,NULL,0,1,0,0,'','ALL','','','',NULL,NULL,NULL,2020,NULL,0,2023,NULL,'mixFuelPrice','ICAT_TPM_FSR_2020_A','1',6,5,NULL),(NULL,NULL,NULL,NULL,0,50,'Actual per capita income in local currency for the assessment year',1,NULL,0,1,0,0,'','ALL','','','',NULL,NULL,NULL,2020,NULL,0,2023,NULL,'capitalIncome','ICAT_TPM_FSR_2020_A','1',7,5,NULL),(NULL,NULL,NULL,NULL,0,51,'Total fuel used for ground transport(Fuel mix)',0,NULL,1,0,0,0,'','ALL','','','TJ',NULL,NULL,NULL,2020,NULL,0,2028,NULL,'fuelUsed','ICAT_TPM_FSR_2020_A','1',4,5,NULL),(NULL,NULL,NULL,NULL,0,52,'Share of fuel type Diesel',0,NULL,1,0,0,0,'','Diesel','','','%',NULL,NULL,NULL,2020,NULL,0,2028,NULL,'fuelShare','ICAT_TPM_FSR_2020_A','1',4,5,NULL),(NULL,NULL,NULL,NULL,0,53,'CO2 emission factor of Diesel',0,NULL,1,0,0,0,'','Diesel','','','t-CO2/TJ',NULL,NULL,NULL,2020,NULL,0,2028,NULL,'ef','ICAT_TPM_FSR_2020_A','1',4,5,NULL),(NULL,NULL,NULL,NULL,0,54,'Share of fuel type Petrol',0,NULL,1,0,0,0,'','Petrol','','','%',NULL,NULL,NULL,2020,NULL,0,2028,NULL,'fuelShare','ICAT_TPM_FSR_2020_A','1',4,5,NULL),(NULL,NULL,NULL,NULL,0,55,'CO2 emission factor of Petrol',0,NULL,1,0,0,0,'','Petrol','','','t-CO2/TJ',NULL,NULL,NULL,2020,NULL,0,2028,NULL,'ef','ICAT_TPM_FSR_2020_A','1',4,5,NULL),(NULL,NULL,NULL,NULL,0,56,'Fuel mix own - price elasticity',0,NULL,0,1,0,0,'','ALL','','','',NULL,NULL,NULL,2020,NULL,0,2028,NULL,'fuelMixPriceElasticity','ICAT_TPM_FSR_2020_A','1',6,5,NULL),(NULL,NULL,NULL,NULL,0,57,'Country Code',1,NULL,0,1,0,0,'','ALL','','','',NULL,NULL,NULL,2020,NULL,0,2028,NULL,'countryCode','ICAT_TPM_FSR_2020_A','1',7,5,NULL),(NULL,NULL,NULL,NULL,0,58,'Actual fuel mix price in local currency for the assessment year',1,NULL,0,1,0,0,'','ALL','','','',NULL,NULL,NULL,2020,NULL,0,2028,NULL,'mixFuelPrice','ICAT_TPM_FSR_2020_A','1',6,5,NULL),(NULL,NULL,NULL,NULL,0,59,'Actual per capita income in local currency for the assessment year',1,NULL,0,1,0,0,'','ALL','','','',NULL,NULL,NULL,2020,NULL,0,2028,NULL,'capitalIncome','ICAT_TPM_FSR_2020_A','1',7,5,NULL),(NULL,NULL,NULL,NULL,0,60,'Relative fuel mix price increase',0,NULL,0,1,0,0,'','ALL','','','%',NULL,'10%',NULL,2020,NULL,0,2028,NULL,'fuelMixPriceIncrease','ICAT_TPM_FSR_2020_A','1',6,5,NULL),(NULL,NULL,NULL,NULL,0,61,'Total annual passengers',1,NULL,1,0,0,0,'XX0003','Diesel','Colombo- Jaffna','','km',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'p','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,62,'The annual average distance',0,NULL,1,0,0,0,'XX0001','Diesel','Colombo- Kalmunei','','km',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'dp','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,63,'Total annual passengers',1,NULL,1,0,0,0,'XX0001','Diesel','Colombo- Kalmunei','','km',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'p','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,64,'Total annual distance',1,NULL,1,0,0,0,'XX0001','Diesel','Colombo- Kalmunei','','km',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'d','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,65,'Fuel efficiency',0,NULL,1,0,0,0,'XX0001','Diesel','Colombo- Kalmunei','','fuel/km',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'n','cdm_ams_iii_s','1',4,6,NULL),(NULL,NULL,NULL,NULL,0,66,'The annual average distance',0,NULL,1,0,0,0,'XX0002','Diesel','Colombo- Trincomalee','','km',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'dp','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,67,'Total annual passengers',1,NULL,1,0,0,0,'XX0002','Diesel','Colombo- Trincomalee','','km',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'p','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,68,'Total annual distance',1,NULL,1,0,0,0,'XX0002','Diesel','Colombo- Trincomalee','','km',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'d','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,69,'Fuel efficiency',0,NULL,1,0,0,0,'XX0002','Diesel','Colombo- Trincomalee','','fuel/km',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'n','cdm_ams_iii_s','1',4,6,NULL),(NULL,NULL,NULL,NULL,0,70,'The annual average distance',0,NULL,1,0,0,0,'XX0003','Diesel','Colombo- Jaffna','','km',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'dp','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,71,'Total annual distance',1,NULL,1,0,0,0,'XX0003','Diesel','Colombo- Jaffna','','km',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'d','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,72,'Fuel efficiency',0,NULL,1,0,0,0,'XX0003','Diesel','Colombo- Jaffna','','fuel/km',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'n','cdm_ams_iii_s','1',4,6,NULL),(NULL,NULL,NULL,NULL,0,73,'Net calorific value of Diesel ',0,NULL,1,0,0,0,'','Diesel','','','TJ/t',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'ncv','cdm_ams_iii_s','1',6,6,NULL),(NULL,NULL,NULL,NULL,0,74,'CO2 emission factor of Diesel',0,NULL,1,0,0,0,'','Diesel','','','t-CO2/TJ',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'ef','cdm_ams_iii_s','1',6,6,NULL),(NULL,NULL,NULL,NULL,0,75,'Total annual distance',0,NULL,0,1,0,0,NULL,'CNG','Colombo- Kalmunei','','km',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'d','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,76,'Total annual average distance',1,NULL,0,1,0,0,NULL,'CNG','Colombo- Kalmunei','','km',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'dp','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,77,'Total annual passengers',0,NULL,0,1,0,0,NULL,'CNG','Colombo- Kalmunei','','passengers or tons',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'p','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,78,'Consumption of fuel',0,NULL,0,1,0,0,NULL,'CNG','Colombo- Kalmunei','','t/y',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'fc','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,79,'Fuel efficiency',1,NULL,0,1,0,0,NULL,'CNG','Colombo- Kalmunei','','t/y',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'n','cdm_ams_iii_s','1',4,6,NULL),(NULL,NULL,NULL,NULL,0,80,'Total annual distance',0,NULL,0,1,0,0,NULL,'CNG','Colombo- Trincomalee','','km',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'d','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,81,'Total annual average distance',1,NULL,0,1,0,0,NULL,'CNG','Colombo- Trincomalee','','km',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'dp','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,82,'Total annual passengers',0,NULL,0,1,0,0,NULL,'CNG','Colombo- Trincomalee','','passengers or tons',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'p','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,83,'Consumption of fuel',0,NULL,0,1,0,0,NULL,'CNG','Colombo- Trincomalee','','t/y',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'fc','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,84,'Fuel efficiency',1,NULL,0,1,0,0,NULL,'CNG','Colombo- Trincomalee','','t/y',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'n','cdm_ams_iii_s','1',4,6,NULL),(NULL,NULL,NULL,NULL,0,85,'Total annual distance',0,NULL,0,1,0,0,NULL,'CNG','Colombo- Jaffna','','km',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'d','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,86,'Total annual average distance',1,NULL,0,1,0,0,NULL,'CNG','Colombo- Jaffna','','km',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'dp','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,87,'Total annual passengers',0,NULL,0,1,0,0,NULL,'CNG','Colombo- Jaffna','','passengers or tons',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'p','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,88,'Consumption of fuel',0,NULL,0,1,0,0,NULL,'CNG','Colombo- Jaffna','','t/y',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'fc','cdm_ams_iii_s','1',8,6,NULL),(NULL,NULL,NULL,NULL,0,89,'Fuel efficiency',1,NULL,0,1,0,0,NULL,'CNG','Colombo- Jaffna','','t/y',NULL,NULL,NULL,2020,NULL,0,2025,NULL,'n','cdm_ams_iii_s','1',4,6,NULL),(NULL,NULL,NULL,NULL,0,90,'Projection Base Year 2020',NULL,NULL,0,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2020,2020,0,NULL,NULL,NULL,NULL,NULL,7,6,NULL),(NULL,NULL,NULL,NULL,0,91,'Projection Year GDP 2030',NULL,NULL,0,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,'6%',NULL,2020,2020,0,NULL,2030,NULL,NULL,NULL,7,6,NULL);
/*!40000 ALTER TABLE `parameter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parameter_history`
--

DROP TABLE IF EXISTS `parameter_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parameter_history` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `parameterName` varchar(255) DEFAULT NULL,
  `Action` int NOT NULL,
  `parameterId` int NOT NULL,
  `parameterStatus` varchar(255) NOT NULL,
  `parameterStatusPrevious` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parameter_history`
--

LOCK TABLES `parameter_history` WRITE;
/*!40000 ALTER TABLE `parameter_history` DISABLE KEYS */;
INSERT INTO `parameter_history` VALUES ('','2022-02-15 04:13:43','','2022-02-15 04:13:43',0,1,'Net calorific value of Diesel ',2,19,'2','-1','','DataRequest'),('','2022-02-15 04:13:43','','2022-02-15 04:13:43',0,2,'Total annual passengers',2,17,'2','-1','','DataRequest'),('','2022-02-15 04:13:43','','2022-02-15 04:13:43',0,3,'CO2 emission factor of Diesel',2,4,'2','-1','','DataRequest'),('','2022-02-15 04:13:43','','2022-02-15 04:13:43',0,4,'CO2 emission factor of Diesel',2,9,'2','-1','','DataRequest'),('','2022-02-15 04:13:43','','2022-02-15 04:13:43',0,5,'Country Code',2,6,'2','-1','','DataRequest'),('','2022-02-15 04:13:43','','2022-02-15 04:13:43',0,6,'Actual fuel mix price in local currency for the assessment year',2,1,'2','-1','','DataRequest'),('','2022-02-15 04:50:56','','2022-02-15 04:50:56',0,7,'Total annual passengers',2,30,'2','-1','','DataRequest'),('','2022-02-15 07:39:15','','2022-02-15 07:39:15',0,8,'Actual per capita income in local currency for the assessment year',2,50,'1','-1','','DataRequest'),('','2022-02-15 07:47:27','','2022-02-15 07:47:27',0,9,'Actual per capita income in local currency for the assessment year',2,50,'1','1','','DataRequest'),('','2022-02-15 08:07:07','','2022-02-15 08:07:07',0,10,'Actual per capita income in local currency for the assessment year',2,50,'1','1','','DataRequest'),('','2022-02-15 08:08:28','','2022-02-15 08:08:28',0,11,'Actual per capita income in local currency for the assessment year',2,50,'1','1','','DataRequest'),('','2022-02-15 08:09:58','','2022-02-15 08:09:58',0,12,'Actual per capita income in local currency for the assessment year',2,50,'2','1','','DataRequest'),('','2022-02-15 08:11:21','','2022-02-15 08:11:21',0,13,'Actual per capita income in local currency for the assessment year',3,50,'3','2','','AssignDataRequest'),('','2022-02-15 08:11:50','','2022-02-15 08:11:50',0,14,'Total annual passengers',3,30,'4','2','','AssignDataRequest'),('','2022-02-15 08:12:36','','2022-02-15 08:12:36',0,15,'Actual per capita income in local currency for the assessment year',3,50,'4','3','','AssignDataRequest'),('','2022-02-15 08:13:19','','2022-02-15 08:13:19',0,16,'Total annual passengers',4,30,'5','4','','EnterData'),('','2022-02-15 08:13:26','','2022-02-15 08:13:26',0,17,'Actual per capita income in local currency for the assessment year',4,50,'5','4','','EnterData'),('','2022-02-15 08:13:27','','2022-02-15 08:13:27',0,18,'Actual per capita income in local currency for the assessment year',4,50,'6','5','','EnterData'),('','2022-02-15 08:13:29','','2022-02-15 08:13:29',0,19,'Total annual passengers',4,30,'6','5','','EnterData'),('','2022-02-15 08:13:38','','2022-02-15 08:13:38',0,20,'Total annual passengers',4,30,'6','6','','EnterData'),('','2022-02-15 08:14:17','','2022-02-15 08:14:17',0,21,'Actual per capita income in local currency for the assessment year',4,50,'9','6','','EnterData'),('','2022-02-15 08:15:04','','2022-02-15 08:15:04',0,22,'Total annual passengers',4,30,'9','6','','EnterData'),('','2022-02-15 08:30:59','','2022-02-15 08:30:59',0,23,'Total annual passengers',3,17,'4','2','','AssignDataRequest'),('','2022-02-15 08:31:17','','2022-02-15 08:31:17',0,24,'Net calorific value of Diesel ',3,19,'3','2','','AssignDataRequest'),('','2022-02-15 08:31:47','','2022-02-15 08:31:47',0,25,'Net calorific value of Diesel ',3,19,'4','3','','AssignDataRequest');
/*!40000 ALTER TABLE `parameter_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_approval_status`
--

DROP TABLE IF EXISTS `project_approval_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_approval_status` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2500) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_approval_status`
--

LOCK TABLES `project_approval_status` WRITE;
/*!40000 ALTER TABLE `project_approval_status` DISABLE KEYS */;
INSERT INTO `project_approval_status` VALUES ('test','2021-11-30 00:00:00','test','2021-11-30 00:00:00',1,1,'Accept','Accept',1),('test','2021-11-30 00:00:00','test','2021-11-30 00:00:00',1,2,'Reject','Reject',2),('test','2021-11-30 00:00:00','test','2021-11-30 00:00:00',1,3,'Data Request','Request',3),('test','2021-11-30 00:00:00','test','2021-11-30 00:00:00',1,4,'Propose','Propose',4),('test','2021-11-30 00:00:00','test','2021-11-30 00:00:00',1,5,'Active','Active',5);
/*!40000 ALTER TABLE `project_approval_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_owner`
--

DROP TABLE IF EXISTS `project_owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_owner` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2500) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_owner`
--

LOCK TABLES `project_owner` WRITE;
/*!40000 ALTER TABLE `project_owner` DISABLE KEYS */;
INSERT INTO `project_owner` VALUES ('1','2021-11-30 00:00:00','1','2021-11-30 00:00:00',1,1,'Private Project','Private Project',1),('1','2021-11-30 00:00:00','1','2021-11-30 00:00:00',1,3,'Government Project','Government Project',2),('1','2021-11-30 00:00:00','1','2021-11-30 00:00:00',1,4,'Public Privet Partnership','Public Privet Partnership',3),('1','2021-11-30 00:00:00','1','2021-11-30 00:00:00',1,5,' NGO Project','NGO Project',4),('1','2021-11-30 00:00:00','1','2021-11-30 00:00:00',1,6,'International Project','International Project',5);
/*!40000 ALTER TABLE `project_owner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectionResualt`
--

DROP TABLE IF EXISTS `projectionResualt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projectionResualt` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `projectionYear` int NOT NULL,
  `baselineResult` int DEFAULT NULL,
  `baselineResultUnit` varchar(255) DEFAULT NULL,
  `projectResult` int DEFAULT NULL,
  `projectResultUnit` varchar(255) DEFAULT NULL,
  `leakageResult` int DEFAULT NULL,
  `leakageResultUnit` varchar(255) DEFAULT NULL,
  `emissionReduction` int DEFAULT NULL,
  `emissionReductionUnit` varchar(255) DEFAULT NULL,
  `qcStatus` int DEFAULT NULL,
  `qcComment` varchar(255) DEFAULT NULL,
  `projectionResualt` int NOT NULL,
  `assementResultId` int DEFAULT NULL,
  `assementId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_5365358a3ff956ef2aa1a3f5cbc` (`assementResultId`),
  KEY `FK_b405923865f5ae43237538e0c0d` (`assementId`),
  CONSTRAINT `FK_5365358a3ff956ef2aa1a3f5cbc` FOREIGN KEY (`assementResultId`) REFERENCES `assesment` (`id`),
  CONSTRAINT `FK_b405923865f5ae43237538e0c0d` FOREIGN KEY (`assementId`) REFERENCES `assesment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectionResualt`
--

LOCK TABLES `projectionResualt` WRITE;
/*!40000 ALTER TABLE `projectionResualt` DISABLE KEYS */;
INSERT INTO `projectionResualt` VALUES ('','2022-02-11 08:14:26','','2022-02-11 08:14:26',0,1,2022,15001,NULL,10001,NULL,20000,NULL,25000,NULL,NULL,NULL,0,NULL,1),('','2022-02-11 08:14:26','','2022-02-11 08:14:26',0,2,2023,15501,NULL,10501,NULL,20500,NULL,25050,NULL,NULL,NULL,0,NULL,1),('','2022-02-11 08:14:26','','2022-02-11 08:14:26',0,3,2024,15551,NULL,15501,NULL,25500,NULL,25550,NULL,NULL,NULL,0,NULL,1),('','2022-02-13 16:20:45','','2022-02-13 16:20:45',0,4,2022,15001,NULL,10001,NULL,20000,NULL,25000,NULL,NULL,NULL,0,NULL,2),('','2022-02-13 16:20:45','','2022-02-13 16:20:45',0,5,2024,15551,NULL,15501,NULL,25500,NULL,25550,NULL,NULL,NULL,0,NULL,2),('','2022-02-13 16:20:45','','2022-02-13 16:20:45',0,6,2023,15501,NULL,10501,NULL,20500,NULL,25050,NULL,NULL,NULL,0,NULL,2);
/*!40000 ALTER TABLE `projectionResualt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectionYear`
--

DROP TABLE IF EXISTS `projectionYear`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projectionYear` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `year` int NOT NULL,
  `assessmentId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e958cca2567ef32db2242601100` (`assessmentId`),
  CONSTRAINT `FK_e958cca2567ef32db2242601100` FOREIGN KEY (`assessmentId`) REFERENCES `assesment` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectionYear`
--

LOCK TABLES `projectionYear` WRITE;
/*!40000 ALTER TABLE `projectionYear` DISABLE KEYS */;
INSERT INTO `projectionYear` VALUES (NULL,NULL,NULL,NULL,0,1,2030,6);
/*!40000 ALTER TABLE `projectionYear` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectstatus`
--

DROP TABLE IF EXISTS `projectstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projectstatus` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2500) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectstatus`
--

LOCK TABLES `projectstatus` WRITE;
/*!40000 ALTER TABLE `projectstatus` DISABLE KEYS */;
INSERT INTO `projectstatus` VALUES ('1','2021-11-30 00:00:00','1','2021-11-30 00:00:00',1,1,'Proposed','Proposed',1),('1','2021-11-30 00:00:00','1','2021-11-30 00:00:00',1,2,'Under construction','Under construction',1),('1','2021-11-30 00:00:00','1','2021-11-30 00:00:00',1,3,'Operational','Operational',1);
/*!40000 ALTER TABLE `projectstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `reportName` varchar(255) NOT NULL,
  `savedLocation` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isPublish` int DEFAULT NULL,
  `thumbnail` varchar(255) NOT NULL DEFAULT 'https://act.campaign.gov.uk/wp-content/uploads/sites/25/2017/02/form_icon-1.jpg',
  `countryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4573f1195dcb7fce0638e5ec239` (`countryId`),
  CONSTRAINT `FK_4573f1195dcb7fce0638e5ec239` FOREIGN KEY (`countryId`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES ('1','2021-11-30 00:00:00','1','2021-11-30 00:00:00',1,1,'Test-01','Location-01','this is a sample document',1,'https://png.pngitem.com/pimgs/s/207-2071564_transparent-arts-png-documents-icon-png-download.png',1),('1','2021-11-30 00:00:00','1','2021-11-30 00:00:00',1,2,'test-02','Location-01','this is a sample document',1,'https://www.pngkey.com/png/full/522-5222613_yellow-document-icon-computer-file.png',1),('1','2021-11-30 00:00:00','1','2021-11-30 00:00:00',1,3,'Test-03','Location-01','this is a sample document',1,'https://www.pngkey.com/png/full/522-5222613_yellow-document-icon-computer-file.png',1),('1','2021-11-30 00:00:00','1','2021-11-30 00:00:00',1,4,'Test-04','Location-01','this is a sample document',1,'https://www.pngkey.com/png/full/522-5222613_yellow-document-icon-computer-file.png',1),('1','2021-11-30 00:00:00','1','2021-11-30 00:00:00',1,5,'Test-05','Location-01','this is a sample document',1,'https://www.pngkey.com/png/full/522-5222613_yellow-document-icon-computer-file.png',1),('1','2021-11-30 00:00:00','1','2021-11-30 00:00:00',1,6,'Test-06','Location-01','this is a sample document',1,'https://www.pngkey.com/png/full/522-5222613_yellow-document-icon-computer-file.png',1);
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportNdc`
--

DROP TABLE IF EXISTS `reportNdc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportNdc` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `reportId` int DEFAULT NULL,
  `ndcId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_43ce546ecc5241d8c38d41aec5a` (`reportId`),
  KEY `FK_02b2a43c28a22e3b351587301a6` (`ndcId`),
  CONSTRAINT `FK_02b2a43c28a22e3b351587301a6` FOREIGN KEY (`ndcId`) REFERENCES `ndc` (`id`),
  CONSTRAINT `FK_43ce546ecc5241d8c38d41aec5a` FOREIGN KEY (`reportId`) REFERENCES `report` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportNdc`
--

LOCK TABLES `reportNdc` WRITE;
/*!40000 ALTER TABLE `reportNdc` DISABLE KEYS */;
/*!40000 ALTER TABLE `reportNdc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportProject`
--

DROP TABLE IF EXISTS `reportProject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportProject` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `reportId` int DEFAULT NULL,
  `projectId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1615ee91999fd44da5cb1610142` (`reportId`),
  KEY `FK_3761f44e3888c5dd5b1ccabf3a1` (`projectId`),
  CONSTRAINT `FK_1615ee91999fd44da5cb1610142` FOREIGN KEY (`reportId`) REFERENCES `report` (`id`),
  CONSTRAINT `FK_3761f44e3888c5dd5b1ccabf3a1` FOREIGN KEY (`projectId`) REFERENCES `climateAction` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportProject`
--

LOCK TABLES `reportProject` WRITE;
/*!40000 ALTER TABLE `reportProject` DISABLE KEYS */;
/*!40000 ALTER TABLE `reportProject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportSector`
--

DROP TABLE IF EXISTS `reportSector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportSector` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `reportId` int DEFAULT NULL,
  `sectorId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_87154fc20105ab308522047e9dc` (`reportId`),
  KEY `FK_ab294ea2344b51c8195d0264bab` (`sectorId`),
  CONSTRAINT `FK_87154fc20105ab308522047e9dc` FOREIGN KEY (`reportId`) REFERENCES `report` (`id`),
  CONSTRAINT `FK_ab294ea2344b51c8195d0264bab` FOREIGN KEY (`sectorId`) REFERENCES `sector` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportSector`
--

LOCK TABLES `reportSector` WRITE;
/*!40000 ALTER TABLE `reportSector` DISABLE KEYS */;
/*!40000 ALTER TABLE `reportSector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_assessment`
--

DROP TABLE IF EXISTS `report_assessment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_assessment` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `reportId` int DEFAULT NULL,
  `assessmentId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_21bf6ee02e608c1ee1705683833` (`reportId`),
  KEY `FK_c444bfdcc0cd5177ac741a3c5e5` (`assessmentId`),
  CONSTRAINT `FK_21bf6ee02e608c1ee1705683833` FOREIGN KEY (`reportId`) REFERENCES `report` (`id`),
  CONSTRAINT `FK_c444bfdcc0cd5177ac741a3c5e5` FOREIGN KEY (`assessmentId`) REFERENCES `assesment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_assessment`
--

LOCK TABLES `report_assessment` WRITE;
/*!40000 ALTER TABLE `report_assessment` DISABLE KEYS */;
/*!40000 ALTER TABLE `report_assessment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sector`
--

DROP TABLE IF EXISTS `sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sector` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '1',
  `emissionSummary` varchar(255) NOT NULL,
  `ndcDocuments` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sector`
--

LOCK TABLES `sector` WRITE;
/*!40000 ALTER TABLE `sector` DISABLE KEYS */;
INSERT INTO `sector` VALUES (NULL,'2022-02-11 07:09:28',NULL,'2022-02-11 07:09:28',0,1,'Transport','Transport',1,'','');
/*!40000 ALTER TABLE `sector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub-sector`
--

DROP TABLE IF EXISTS `sub-sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub-sector` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '1',
  `sectorId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ac74d5f5215ab743bc498899c2c` (`sectorId`),
  CONSTRAINT `FK_ac74d5f5215ab743bc498899c2c` FOREIGN KEY (`sectorId`) REFERENCES `sector` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub-sector`
--

LOCK TABLES `sub-sector` WRITE;
/*!40000 ALTER TABLE `sub-sector` DISABLE KEYS */;
/*!40000 ALTER TABLE `sub-sector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_ndc`
--

DROP TABLE IF EXISTS `sub_ndc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_ndc` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2500) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '1',
  `ndcId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_743d909fa9717fcd224725adc85` (`ndcId`),
  CONSTRAINT `FK_743d909fa9717fcd224725adc85` FOREIGN KEY (`ndcId`) REFERENCES `ndc` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_ndc`
--

LOCK TABLES `sub_ndc` WRITE;
/*!40000 ALTER TABLE `sub_ndc` DISABLE KEYS */;
INSERT INTO `sub_ndc` VALUES ('2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00',1,1,'sub ndc','sub ndc',1,1);
/*!40000 ALTER TABLE `sub_ndc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_sector`
--

DROP TABLE IF EXISTS `sub_sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_sector` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2500) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '1',
  `sectorId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_db2ad95adf971aec99e1159acd5` (`sectorId`),
  CONSTRAINT `FK_db2ad95adf971aec99e1159acd5` FOREIGN KEY (`sectorId`) REFERENCES `sector` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_sector`
--

LOCK TABLES `sub_sector` WRITE;
/*!40000 ALTER TABLE `sub_sector` DISABLE KEYS */;
/*!40000 ALTER TABLE `sub_sector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trackClimateAction`
--

DROP TABLE IF EXISTS `trackClimateAction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trackClimateAction` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `climateActionName` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `objective` varchar(500) DEFAULT NULL,
  `trackcaStatus` varchar(255) DEFAULT NULL,
  `sector` varchar(255) DEFAULT NULL,
  `gassesAffected` varchar(255) DEFAULT NULL,
  `startYearImplementation` int DEFAULT NULL,
  `achieved` int DEFAULT NULL,
  `expected` int DEFAULT NULL,
  `years` varchar(255) DEFAULT NULL,
  `instrument` varchar(255) DEFAULT NULL,
  `implementingEntities` varchar(255) DEFAULT NULL,
  `climateActionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_6baac9e88dcf6baf3a0e39c8c0` (`climateActionId`),
  CONSTRAINT `FK_6baac9e88dcf6baf3a0e39c8c0d` FOREIGN KEY (`climateActionId`) REFERENCES `climateAction` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trackClimateAction`
--

LOCK TABLES `trackClimateAction` WRITE;
/*!40000 ALTER TABLE `trackClimateAction` DISABLE KEYS */;
INSERT INTO `trackClimateAction` VALUES ('','2022-02-17 10:03:14','','2022-02-17 10:03:14',0,1,'Test project new','tes','1','','Transport','CO2',2020,0,0,'2020,2022,2013,2013,2023,2028,2025','','-',2),('','2022-02-17 10:03:14','','2022-02-17 10:03:14',0,2,'ICAT Climate Action Tool',NULL,NULL,'','Transport','CO2',2020,0,0,'2020,2022,2013,2013,2023,2028,2025','','-',5),('','2022-02-17 10:03:14','','2022-02-17 10:03:14',0,3,'Sri Lanka',NULL,NULL,'','Transport','CO2',2020,0,0,'2020,2022,2013,2013,2023,2028,2025','','-',3),('','2022-02-17 10:03:14','','2022-02-17 10:03:14',0,4,'Increasing tax for fuel',NULL,'The mitigation action aims to	reduce the use of conventional fossil fuel in Sri Lanka\'s transport sector and expect to encourage more use of low emissions energy sources. ','','Transport','CO2',2020,0,0,'2020,2022,2013,2013,2023,2028,2025','','-',7),('','2022-02-17 10:03:14','','2022-02-17 10:03:14',0,5,'convert the 25% of diesel buses to CNG by 2030',NULL,'Reduce the GHG emissions from transport by 25%','','Transport','CO2',2020,0,0,'2020,2022,2013,2013,2023,2028,2025','','-',6);
/*!40000 ALTER TABLE `trackClimateAction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unit_conversion`
--

DROP TABLE IF EXISTS `unit_conversion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unit_conversion` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `fromUnit` varchar(255) NOT NULL,
  `toUnit` varchar(255) NOT NULL,
  `conversionFactor` decimal(10,6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit_conversion`
--

LOCK TABLES `unit_conversion` WRITE;
/*!40000 ALTER TABLE `unit_conversion` DISABLE KEYS */;
INSERT INTO `unit_conversion` VALUES (NULL,NULL,NULL,NULL,0,1,'km','m',1000.000000),(NULL,NULL,NULL,NULL,0,2,'kg','Gg',0.001000),(NULL,NULL,NULL,NULL,0,3,'mils','km',1.609340),(NULL,NULL,NULL,NULL,0,4,'J','TJ',0.001000);
/*!40000 ALTER TABLE `unit_conversion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `salt` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `resetToken` varchar(255) NOT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  `canNotDelete` tinyint NOT NULL DEFAULT '0',
  `userTypeId` int DEFAULT NULL,
  `institutionId` int DEFAULT NULL,
  `countryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  KEY `FK_29f29dffce2845a1abc901d4e85` (`userTypeId`),
  KEY `FK_ca0de218397aed2409d865d1580` (`institutionId`),
  KEY `FK_4aaf6d02199282eb8d3931bff31` (`countryId`),
  CONSTRAINT `FK_29f29dffce2845a1abc901d4e85` FOREIGN KEY (`userTypeId`) REFERENCES `user_type` (`id`),
  CONSTRAINT `FK_4aaf6d02199282eb8d3931bff31` FOREIGN KEY (`countryId`) REFERENCES `country` (`id`),
  CONSTRAINT `FK_ca0de218397aed2409d865d1580` FOREIGN KEY (`institutionId`) REFERENCES `institution` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('-','2022-02-14 10:53:58','-','2022-02-14 10:53:58',0,1,'TEST','Anushanga','pasan@climatesi.com','pasan@climatesi.com','+07 10-892-190_','+07 10-892-190_',NULL,'$2b$10$.Pv/CEdz9n.oh8CeegkEiu','$2b$10$.Pv/CEdz9n.oh8CeegkEiuYYNnnqa4GbAuVa33VUWQK4nudPNv626','',NULL,0,5,1,1),('-','2022-02-14 11:18:28','-','2022-02-14 11:18:28',0,2,'Pasan','Anushanga','AnushangaPasan@gmail.com','AnushangaPasan@gmail.com','+07 10-892-190_','+07 10-892-190_',NULL,'$2b$10$rHRg5X14bFL8OCJm0GSesu','$2b$10$rHRg5X14bFL8OCJm0GSesuukimAe4sUh.8SQ/4vKL9bc2nveatl7y','',NULL,0,4,2,1),('-','2022-02-15 03:49:52','-','2022-02-15 03:49:52',0,4,'Herath','Samarawickarama','herath@gamil.com','herath@gamil.com','+94 11-290-9999','+94 11-300-8888',NULL,'$2b$10$hXxfQFnt9/A3rb.xyA7YZ.','$2b$10$hXxfQFnt9/A3rb.xyA7YZ.K6EaS4wmtB693TRPT0YjaW6vObeSRk2','',NULL,0,3,4,1),('-','2022-02-15 03:52:21','-','2022-02-15 03:52:21',0,5,'Kanishka','Indrajith','K.Indra@gmail.com','K.Indra@gmail.com','+94 11-300-9988','+94 77-148-0300',NULL,'$2b$10$hPU2Ay3G7xhia4rdKroepe','$2b$10$hPU2Ay3G7xhia4rdKroepeODWtrb7UxM5NnUeCRN/qAsw.0EvEsUq','',NULL,0,3,5,1),('-','2022-02-15 04:14:53','-','2022-02-15 04:14:53',0,6,'TEST','test','pan@climatesi.com','pan@climatesi.com','+07 10-892-190_','+07 10-892-190_',NULL,'$2b$10$OWAlQT1XgpzCIpbldON9ku','$2b$10$OWAlQT1XgpzCIpbldON9ku7UqLpKVSFfENYM/L2knuDnSXXYI9R46','',NULL,0,5,6,1),('-','2022-02-15 04:19:41','-','2022-02-15 04:19:41',0,7,'Nilni','Paranawidhana','Ni_Par@gmail.com','Ni_Par@gmail.com','+94 11-121-2234','+94 71-121-2234',NULL,'$2b$10$/sztwgy/ghCZNwO.d2inx.','$2b$10$/sztwgy/ghCZNwO.d2inx.RNoSc6Js/EWYQOj967Or8FcuxkpdHRe','',NULL,0,3,6,1),('-','2022-02-15 04:25:00','-','2022-02-15 04:25:00',0,8,'Sunil','Perera','Sunil.Perera@gmail.com','Sunil.Perera@gmail.com','+94 11-199-3223','+94 77-199-3223',NULL,'$2b$10$20aYRWSYd7cqvYqgUD4yj.','$2b$10$20aYRWSYd7cqvYqgUD4yj.eUhLdnvVyu6qqij3z2BsYH1jBI0WRzS','',NULL,0,3,7,1),('-','2022-02-15 06:09:23','-','2022-02-15 06:09:23',0,9,'Prabha','madushani','Prabha@tns.lk','Prabha@tns.lk','+94 56-235-8963','+12 36-542-5633',NULL,'$2b$10$Zvii4w6arBpwTRJ3sqhC2.','$2b$10$Zvii4w6arBpwTRJ3sqhC2.yx8UGBAYvxT4saMgMkt44LMoRqHAYSO','',NULL,0,1,9,1),('-','2022-02-15 06:10:56','-','2022-02-15 06:10:56',0,10,'Pasan','Anusanga_2','pasan@env.lk','pasan@env.lk','+25 63-486-5232','+89 56-231-4256',NULL,'$2b$10$EfJPIqhhW0oO/hRWdk0HNu','$2b$10$EfJPIqhhW0oO/hRWdk0HNupiBENKHAsmoGHO0hl6fWsHPFPsQ3lia','',NULL,0,5,8,1),('-','2022-02-15 06:12:10','-','2022-02-15 06:12:10',0,11,'Dineshika','Sandamali','Sandamali@cepetco.lk','Sandamali@cepetco.lk','+25 63-486-5235','+89 56-231-4256',NULL,'$2b$10$Ko7c/MUy1ts9BsfoqXIxPe','$2b$10$Ko7c/MUy1ts9BsfoqXIxPeh4sOPz1cQUx80RT9JnO.RgnWo0u/YmG','',NULL,0,4,9,1),('-','2022-02-15 06:14:03','-','2022-02-15 06:14:03',0,12,'Pradeepa','Sandamani','pradeepa@cepetco.lk','pradeepa@cepetco.lk','+89 56-215-2365','+89 56-231-4257',NULL,'$2b$10$hmLCrtProzT7o0Hn2MCzau','$2b$10$hmLCrtProzT7o0Hn2MCzauLee9EVsuQ/nKChTXDc/tlNC38WDSNRm','',NULL,0,5,8,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_type` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2500) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_type`
--

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
INSERT INTO `user_type` VALUES ('2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00',1,1,'Sector Admin',NULL,1),('2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00',2,2,'Admin',NULL,1),('2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00',3,3,'User',NULL,1),('2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00',4,4,'Institutional admin',NULL,1),('2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00','2021-11-30 00:00:00',5,5,'Data Entry operator',NULL,1);
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verificationDetail`
--

DROP TABLE IF EXISTS `verificationDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verificationDetail` (
  `createdBy` varchar(255) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `editedBy` varchar(255) DEFAULT NULL,
  `editedOn` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `id` int NOT NULL AUTO_INCREMENT,
  `year` int NOT NULL,
  `assessmentId` int NOT NULL,
  `assessmentYearId` int DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `userVerifier` int DEFAULT NULL,
  `rootCause` varchar(255) DEFAULT NULL,
  `explanation` varchar(255) DEFAULT NULL,
  `isAccepted` tinyint NOT NULL,
  `isNDC` tinyint NOT NULL DEFAULT '0',
  `isMethodology` tinyint NOT NULL DEFAULT '0',
  `isBaseline` tinyint NOT NULL DEFAULT '0',
  `isProject` tinyint NOT NULL DEFAULT '0',
  `isLekage` tinyint NOT NULL DEFAULT '0',
  `isProjection` tinyint NOT NULL DEFAULT '0',
  `verificationStatus` int DEFAULT NULL,
  `correctiveAction` varchar(255) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `verificationStage` int NOT NULL DEFAULT '1',
  `parameterId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3f44853a3143c25338eac826b20` (`assessmentYearId`),
  KEY `FK_a43b0a788bdea978049ff34837a` (`parameterId`),
  CONSTRAINT `FK_3f44853a3143c25338eac826b20` FOREIGN KEY (`assessmentYearId`) REFERENCES `assesmentYear` (`id`),
  CONSTRAINT `FK_a43b0a788bdea978049ff34837a` FOREIGN KEY (`parameterId`) REFERENCES `parameter` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verificationDetail`
--

LOCK TABLES `verificationDetail` WRITE;
/*!40000 ALTER TABLE `verificationDetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `verificationDetail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-17 15:46:55
