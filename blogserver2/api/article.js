"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var db = require('../db/api'); //?????????????????????
var conn = require('../db/index');
var sql = require('../db/sql');
/*????????????    */
//??????????????????
exports.getAll = function (req, res) {
    db.dbQueryAll("article", res);
};
//????????????id??????????????????
exports.getAssignArticle = function (req, res) {
    db.dbQueryById('article', 'queryById', res, [req.query.id]);
};
//???????????????????????????
exports.getSortArticle = function (req, res) {
    db.dbQueryById('article', 'queryBySortId', res, [req.query.id]);
};
//???????????????????????????
exports.getLabelArticle = function (req, res) {
    db.dbQueryById('article', 'queryByLabelId', res, [req.query.id]);
};
//??????????????????????????????
exports.getArticleByPage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        db.dbQueryByPage("article", "queryByPage", "queryCount", req, res);
        return [2 /*return*/];
    });
}); };
//???????????????????????????????????????
exports.getSortArticleByPage = function (req, res) {
    db.dbQueryByPage("article", "queryByPageSort", "querySortCount", req, res);
};
//???????????????????????????????????????
exports.getLabelArticleByPage = function (req, res) {
    db.dbQueryByPage("article", "queryByPageLabel", "queryLabelCount", req, res);
};
//????????????????????????+??????????????????
exports.getSLArticleByPage = function (req, res) {
    db.dbQueryByPage("article", "queryByPageSL", "querySLCount", req, res);
};
// //????????????id???????????????
// exports.getArticleUser=(req:Request,res)=>{
//     var id=req.body.id
//     var sql=`select * from userarticles where article_id=?`
//     conn.query(sql,[id],(err,results)=>{
//         if(err){
//             throw err
//         }
//         if(results[0]===undefined){
//             const response=new Response(false,'??????????????????',-1)
//             res.send(response)
//         }else{
//             const response=new Response(true,'???????????????????????????',1,results)
//            res.send(response)
//         }
//     })
// }
//????????????
//??????????????????
exports.delArticle = function (req, res) {
    db.dbDelById('article', res, [req.query.id]);
};
//????????????
//????????????
exports.editArticle = function (req, res) {
    db.dbUpdateById('article', 'updateAll', res, [req.query.title, req.query.description, req.query.content, req.query.newDate, req.query.imgUrl, req.query.id]);
};
//?????????????????????
exports.editArticleLike = function (req, res) {
    db.dbUpdateById('article', 'updateLike', res, [req.query.likeCount, req.query.id]);
};
//?????????????????????
exports.editArticleView = function (req, res) {
    db.dbUpdateById('article', 'updateView', res, [req.query.viewCount, req.query.id]);
};
//?????????????????????
exports.editArticleComment = function (req, res) {
    db.dbUpdateById('article', 'updateComment', res, [req.query.commentCount, req.query.id]);
};
// //????????????
// //????????????
exports.addArticle = function (req, res) {
    db.dbInsertAll('article', res, [req.query.title, req.query.description, req.query.content, req.query.userId, req.query.date]);
};
