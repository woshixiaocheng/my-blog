"use strict";
exports.__esModule = true;
var commonRes_1 = require("../../server/utils/commonRes");
var db = require('../../server/db/api'); //数据库处理封装
/*查找系列*/
//获取文章分类
exports.getSorts = function (req, res) {
    db.dbQueryAll("sort", res);
};
//根据分类id获取分类详情
exports.getAssignSort = function (req, res) {
    db.dbQueryById('sort', 'queryById', res, [req.query.id]);
};
// //获取某文章下的所有分类
exports.getArticleSort = function (req, res) {
    db.dbQueryById('sort', 'queryByArticleId', res, [req.body.id]);
};
//通过分页获取文章分类
exports.getSortsByPage = function (req, res) {
    db.dbQueryByPage("sort", "queryByPage", "queryCount", req, res);
};
/*修改系列*/
//修改文章的分类
exports.editArticleSort = function (req, res) {
    [req.query.sortId, req.query.articleId, req.query.articleId];
    db.dbUpdateById('sort', 'updateByArticleId', res, [req.query.sortId, req.query.articleId, req.query.articleId]);
};
//删除指定分类
exports.delSort = function (req, res) {
    var id = Number(req.query.id);
    if (id === 1 || id === 2) {
        console.log(typeof (id), id);
        commonRes_1["default"].error(res, 'serverError');
    }
    else {
        db.dbDelById('sort', res, [req.query.id]);
    }
};
//增加分类
exports.addSort = function (req, res) {
    db.dbInsertAll('sort', res, [req.query.name, req.query.description]);
};
//修改分类
exports.editSort = function (req, res) {
    db.dbUpdateById('sort', 'updateAll', res, [req.query.name, req.query.description, req.query.id]);
};
