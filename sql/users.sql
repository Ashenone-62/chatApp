/*
 Navicat Premium Data Transfer

 Source Server         : BLOG
 Source Server Type    : MySQL
 Source Server Version : 80017
 Source Host           : localhost:3306
 Source Schema         : chatapp

 Target Server Type    : MySQL
 Target Server Version : 80017
 File Encoding         : 65001

 Date: 11/02/2021 19:41:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `uid` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `socket_token` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `online_state` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `group` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'test01', 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4056566989,4250840928&fm=111&gp=0.jpg', NULL, NULL, NULL);
INSERT INTO `users` VALUES (2, 'test02', 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1429175118,2649084526&fm=111&gp=0.jpg', NULL, NULL, NULL);
INSERT INTO `users` VALUES (3, 'test03', 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=433364479,2130205375&fm=111&gp=0.jpg', NULL, NULL, NULL);
INSERT INTO `users` VALUES (4, 'test04', 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1735133713,3822132866&fm=111&gp=0.jpg', NULL, NULL, NULL);
INSERT INTO `users` VALUES (5, 'test05', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3869515018,2735128030&fm=26&gp=0.jpg', NULL, NULL, NULL);
INSERT INTO `users` VALUES (6, 'test06', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2871119264,233376496&fm=26&gp=0.jpg', NULL, NULL, NULL);
INSERT INTO `users` VALUES (7, 'test07', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1589620053,2046679525&fm=26&gp=0.jpg', NULL, NULL, NULL);
INSERT INTO `users` VALUES (8, 'test08', 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2535775280,2559855875&fm=111&gp=0.jpg', NULL, NULL, NULL);
INSERT INTO `users` VALUES (9, 'test09', 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1200678983,2021774119&fm=111&gp=0.jpg', NULL, NULL, NULL);
INSERT INTO `users` VALUES (10, 'group1', 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2654213747,366067445&fm=26&gp=0.jpg', 'group1', 'true', 'true');
INSERT INTO `users` VALUES (11, 'group2', 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1086862890,358373002&fm=115&gp=0.jpg', 'group2', 'true', 'true');
INSERT INTO `users` VALUES (12, 'group3', 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2924018449,323206121&fm=26&gp=0.jpg', 'group3', 'true', 'true');

SET FOREIGN_KEY_CHECKS = 1;
