"use strict";
exports.__esModule = true;
var db = require('../db/api'); //数据库处理封装
// //获取日记
exports.getDaily = function (req, res) {
    db.dbQueryAll("daily", res);
};
//根据id获取日记内容
exports.getAssignDaily = function (req, res) {
    db.dbQueryById('daily', 'queryById', res, [req.query.id]);
};
//根据分页获取日记信息
exports.getDailyByPage = function (req, res) {
    db.dbQueryByPage("daily", "queryByPage", "queryCount", req, res);
};
//修改日记
exports.editDaily = function (req, res) {
    db.dbUpdateById('daily', 'updateAll', res, [req.query.content, req.query.date, req.query.id]);
};
//增加日记
exports.addDaily = function (req, res) {
    db.dbInsertAll('daily', res, [req.query.content, req.query.date]);
};
//删除指定日记
exports.delDaily = function (req, res) {
    db.dbDelById('daily', res, [req.query.id]);
};
