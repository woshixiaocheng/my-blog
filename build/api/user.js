"use strict";
exports.__esModule = true;
var conn = require('../../server/db/index');
var db = require('../../server/db/api');
var commonRes_1 = require("../../server/utils/commonRes");
var jwt = require('jsonwebtoken'); //处理token的
var app_1 = require("../../server/app");
//用户登录判断
exports.login = function (req, res) {
    var user = req.body;
    conn.query("select * from users where user_phone=?", [user.phone], function (err, results) {
        if (err) {
            throw err;
        }
        if (results[0] === undefined) {
            //该手机号还没注册，无法登陆，返回传入参数错误
            commonRes_1["default"].error(res, 'paramError');
        }
        else {
            //已经注册的比对一下密码和手机号
            if (results[0].user_phone == user.phone && results[0].user_password == user.password) {
                //用户对象信息
                var rule = { phone: results[0].user_phone };
                //规则 加密名字（签名的任意字符串） 
                //expiresIn加密的时间 
                var tokenStr = jwt.sign(rule, app_1.signStr, { expiresIn: 3600 });
                (0, commonRes_1["default"])(res, { token: tokenStr, phone: user.phone }, { message: '登陆成功！' });
            }
            else {
                commonRes_1["default"].error(res, 'paramError', undefined, "密码或手机号错误！");
            }
        }
    });
};
//用户注册
exports.register = function (req, res) {
    var user = req.body;
    // 要先判断有没有之前已经出现手机号的才能注册吧
    conn.query("select * from users where user_phone=?", [user.phone], function (err, results) {
        if (err) {
            throw err;
        }
        if (results[0] !== undefined) {
            //该手机号已经注册，不能再注册了返回传参错误
            commonRes_1["default"].error(res, 'paramError');
        }
    });
    var sql = "insert into users (user_name,user_phone,user_password,user_registration_time) values (?,?,?,?)";
    conn.query(sql, [user.name, user.phone, user.password, user.createTime], function (err, data) {
        if (err) {
            throw err;
        }
        (0, commonRes_1["default"])(res, data);
    });
};
//获取用户信息列表
exports.getUser = function (req, res) {
    var sql = "select user_id,user_name,user_phone,user_photo,user_registration_time from users";
    conn.query(sql, function (err, data) {
        (0, commonRes_1["default"])(res, data);
    });
};
//根据用户id获取用户信息
exports.getUserInfo = function (req, res) {
    db.dbQueryById('user', 'queryById', res, [req.query.phone]);
};
