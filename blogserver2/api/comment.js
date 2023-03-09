"use strict";
exports.__esModule = true;
var db = require('../db/api'); //数据库处理封装
//按照文章id获取特定文章
exports.getCommentByArtId = function (req, res) {
    console.log(req.query.id);
    db.dbQueryById('comment', 'queryByArticleId', res, [req.query.id]);
};
exports.getCommentByParId = function (req, res) {
    db.dbQueryById('comment', 'queryByParentId', res, [req.query.id]);
};
exports.addComment = function (req, res) {
    db.dbInsertAll('comment', res, [req.query.date, req.query.content, req.query.pid, req.query.userId, req.query.articleId, req.query.parentName]);
};
