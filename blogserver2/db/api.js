"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var commonRes_1 = require("../utils/commonRes");
var db = require('./index');
var sql = require("./sql");
/**
 * @description 查找全部数据
 * @param {str} table 数据库表的名称
 * @param {obj} req 插入的数据
 * @param {Response} res 接口函数中的res对象
 * @param {obj} option 接口函数中的返回对象(不知道是什么)
 */
var dbQueryAll = function (table, res, req, option) {
    db.getConnection(function (err, conn) {
        conn.query(sql[table].queryAll, function (err, data) {
            option ? (0, commonRes_1["default"])(res, data, option) : (0, commonRes_1["default"])(res, data);
            conn.release();
        });
    });
};
//通过自定义条件查找数据
var dbQueryById = function (table, key, res, req, option, other) {
    db.getConnection(function (err, conn) {
        conn.query(sql[table][key], req, function (err, data) {
            if (other !== undefined) {
                option ? (0, commonRes_1["default"])(res, __assign({ rows: data }, other), option) : (0, commonRes_1["default"])(res, __assign({ rows: data }, other));
            }
            else {
                option ? (0, commonRes_1["default"])(res, data, option) : (0, commonRes_1["default"])(res, data);
            }
            conn.release();
        });
    });
};
//封装page类型
var dbQueryByPage = function (table, key, count, req, res) {
    var page = req.body.page || 1;
    var size = req.body.size || 8;
    var first = (page - 1) * size;
    var total;
    if (req.body.id) {
        db.query(sql[table][count], [req.body.id], function (err, data) {
            total = JSON.parse(JSON.stringify(data))[0];
            dbQueryById(table, key, res, [req.body.id, first, size], undefined, total);
        });
        //分类和标签都取的情况
    }
    else if (req.body.sortId && req.body.labelId) {
        db.query(sql[table][count], [req.body.sortId, req.body.labelId], function (err, data) {
            total = JSON.parse(JSON.stringify(data))[0];
            dbQueryById(table, key, res, [req.body.sortId, req.body.labelId, first, size], undefined, total);
        });
    }
    else {
        db.query(sql[table][count], function (err, data) {
            total = JSON.parse(JSON.stringify(data))[0];
            dbQueryById(table, key, res, [first, size], undefined, total);
        });
    }
};
/*删除指定数据*/
var dbDelById = function (table, res, req) {
    db.getConnection(function (err, conn) {
        conn.query(sql[table].delById, req, function (err, data) {
            (0, commonRes_1["default"])(res, data);
            conn.release();
        });
    });
};
//修改某条件下的某些内容
var dbUpdateById = function (table, key, res, req) {
    db.getConnection(function (err, conn) {
        conn.query(sql[table][key], req, function (err, data) {
            (0, commonRes_1["default"])(res, __assign(__assign({}, data), { message: '修改成功！' }));
            conn.release();
        });
    });
};
/*增加数据*/
var dbInsertAll = function (table, res, req) {
    db.getConnection(function (err, conn) {
        conn.query(sql[table].insertAll, req, function (err, data) {
            (0, commonRes_1["default"])(res, __assign(__assign({}, data), { message: '增加成功！' }));
            conn.release();
        });
    });
};
module.exports = {
    dbQueryAll: dbQueryAll,
    dbQueryById: dbQueryById,
    dbQueryByPage: dbQueryByPage,
    dbDelById: dbDelById,
    dbUpdateById: dbUpdateById,
    dbInsertAll: dbInsertAll
    // dbCount
};
