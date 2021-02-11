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

 Date: 11/02/2021 19:41:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for chat
-- ----------------------------
DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `fromUser` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `toUser` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `date` bigint(255) NULL DEFAULT NULL,
  `isRead` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 66 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of chat
-- ----------------------------
INSERT INTO `chat` VALUES (52, 'test01', 'test02', '123', 1612959053251, 'true');
INSERT INTO `chat` VALUES (53, 'test02', 'test01', '123', 1612959060619, 'true');
INSERT INTO `chat` VALUES (54, 'test02', 'test01', '456', 1612959069751, 'true');
INSERT INTO `chat` VALUES (55, 'test02', 'test01', '456', 1612959111635, 'true');
INSERT INTO `chat` VALUES (56, 'test01', 'test02', '123', 1612959491579, 'true');
INSERT INTO `chat` VALUES (57, 'test01', 'test02', '123', 1612959499643, 'true');
INSERT INTO `chat` VALUES (58, 'test01', 'group1', '123', 1612961502456, 'false');
INSERT INTO `chat` VALUES (59, 'test01', 'group1', '123', 1612961669410, 'false');
INSERT INTO `chat` VALUES (60, 'test02', 'group1', '123', 1612961676081, 'false');
INSERT INTO `chat` VALUES (61, 'test01', 'group1', '123', 1612961781936, 'false');
INSERT INTO `chat` VALUES (62, 'test02', 'group1', '123', 1612961872120, 'true');
INSERT INTO `chat` VALUES (63, 'test01', 'group1', '666', 1612961877201, 'true');
INSERT INTO `chat` VALUES (64, 'test02', 'group1', '6666', 1612961879929, 'true');
INSERT INTO `chat` VALUES (65, 'test05', 'group1', '666', 1612961936680, 'true');
INSERT INTO `chat` VALUES (66, 'test01', 'group1', '555', 1612962522544, 'true');

SET FOREIGN_KEY_CHECKS = 1;
