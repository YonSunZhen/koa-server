/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50621
 Source Host           : localhost:3306
 Source Schema         : storage

 Target Server Type    : MySQL
 Target Server Version : 50621
 File Encoding         : 65001

 Date: 25/02/2020 09:54:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for login
-- ----------------------------
DROP TABLE IF EXISTS `login`;
CREATE TABLE `login`  (
  `appid` varchar(191) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客户端的appId，用于区分哪一个客户端登陆',
  `uid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户uid号',
  `access_token` varchar(2020) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'access_token',
  `refresh_token` varchar(2020) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'refresh_token',
  `login_time` datetime(0) NULL DEFAULT NULL COMMENT '登陆时间',
  `secret_key` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密钥',
  PRIMARY KEY (`appid`, `uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for tech
-- ----------------------------
DROP TABLE IF EXISTS `tech`;
CREATE TABLE `tech`  (
  `no` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '编号(有规则)',
  `parent_no` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '父级编号',
  `text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '技术名：XXX',
  `category` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '类别：\'field\'技术领域，\'tiny\'技术点',
  `tech_type` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '技术类型：\'一般\'、\'通用\'、\'关键\'、\'核心\'',
  `tech_status` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '技术状态：\'未规划\'、\'在研发\'、\'已购买\'',
  `industry_status` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '行业状态：\'国内领先\'、\'行业领先\'、\'国际领先\'',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注：XXXXXX',
  `priority` int(1) NULL DEFAULT NULL COMMENT '优先级：0~9',
  `background` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '背景色：\'红\'、\'橙\'、\'黄\'、\'绿\'、\'蓝\'、\'靛\'、\'紫\'',
  `expand_state` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'collapse' COMMENT '是否展开子节点：\'collapse\'收起',
  `creator` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `owner` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所有人',
  `date` datetime(0) NULL DEFAULT NULL COMMENT '创建/编辑时间',
  `is_tech_cancel` int(1) NULL DEFAULT 0 COMMENT '是否已删除(1删除，0未删除)',
  PRIMARY KEY (`no`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `uid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'uid号',
  `job_number` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '工号',
  `cn_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '中文名',
  `en_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '英文名',
  `mobile` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号码',
  `landline` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '座机号',
  `mail` varchar(191) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `avatar` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '用户头像',
  `is_user_cancel` int(1) NULL DEFAULT 0 COMMENT '是否已删除（1删除，0未删除）',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('uida3476', '', '黄力', '', NULL, NULL, '', NULL, 0);

-- ----------------------------
-- View structure for user_login_view
-- ----------------------------
DROP VIEW IF EXISTS `user_login_view`;
CREATE ALGORITHM = UNDEFINED DEFINER = `root`@`localhost` SQL SECURITY DEFINER VIEW `user_login_view` AS -- "ALGORITHM = MERGE/TEMPTABLE/UNDEFINED"
-- MERGE:当使用视图时，会把查询视图的语句和创建视图的语句合并起来，形成一条语句，最后再从基表中查询
-- TEMPTABLE:当使用视图时，会把创建视图的语句的查询结果当成一张临时表，再从临时表中进行筛选
-- UNDEFINED:未定义，自动，让系统帮你选
    SELECT
			  login.appid AS appid,
        login.uid AS uid,
        login.access_token AS access_token,
        login.refresh_token AS refresh_token,
        login.login_time AS login_time,
        login.secret_key AS secret_key,
				user.job_number AS job_number,
				user.cn_name AS cn_name,
        user.en_name AS en_name,
        user.mobile AS mobile,
        user.landline AS landline,
        user.mail AS mail,
        user.avatar AS avatar,
        user.is_user_cancel
    FROM login
    					LEFT JOIN `user` ON `login`.`uid` = `user`.`uid` ;

SET FOREIGN_KEY_CHECKS = 1;
