"use strict";
exports.__esModule = true;
var db = require('../db/api'); //数据库处理封装
var commonRes_1 = require("../utils/commonRes");
//获取文章标签
exports.getLabels = function (req, res) {
    db.dbQueryAll("label", res);
};
// //获取某文章下的所有标签
exports.getArticleLabel = function (req, res) {
    db.dbQueryById('label', 'queryByArticleId', res, [req.body.id]);
};
//通过分页获取文章标签
exports.getLabelsByPage = function (req, res) {
    db.dbQueryByPage("label", "queryByPage", "queryCount", req, res);
};
//修改文章的标签
exports.editArticleLabel = function (req, res) {
    db.dbUpdateById('label', 'updateByArticleId', res, [req.query.labelId, req.query.articleId, req.query.articleId]);
};
//修改标签
exports.editLabel = function (req, res) {
    db.dbUpdateById('label', 'updateAll', res, [req.query.name, req.query.description, req.query.id]);
};
//增加标签
exports.addLabel = function (req, res) {
    db.dbInsertAll('label', res, [req.query.name, req.query.description]);
};
//删除指定标签
exports.delLabel = function (req, res) {
    var id = Number(req.query.id);
    if (id === 1 || id === 2) {
        commonRes_1["default"].error(res, 'serverError');
    }
    else {
        db.dbDelById('label', res, [req.query.id]);
    }
};
