"use strict";
exports.__esModule = true;
var mysql = require('mysql');
var db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'blog',
    charset: 'utf8mb4'
});
module.exports = db;
