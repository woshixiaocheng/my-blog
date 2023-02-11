"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//配置对应路由
let express = require('express');
let router = express.Router();
//引入接口
let user = require('./api/user');
let article = require('./api/article');
let sort = require('./api/sort');
let label = require('./api/label');
let daily = require('./api/daily');
//给接口设置路由路径,这里的路径是接口路径
/*查找系列*/
//用户
router.post('/login', user.login); //登录
router.post('/register', user.register); //注册
router.get('/user', user.getUser); //获取用户基本资料
router.get('/userinfo', user.getUserInfo); //根据id获取用户基本信息
//文章
router.get('/article', article.getAll); //获取所有文章
router.get('/article/assign', article.getAssignArticle); //根据特定id获取文章
router.get('/sort/article', article.getSortArticle); //根据分类id获取指定文章
router.get('/label/article', article.getLabelArticle); //根据标签id获取指定文章
router.post('/article/page', article.getArticleByPage); //通过分页获取文章
router.post('/article/sortByPage', article.getSortArticleByPage); //通过分页获取某分类的文章
router.post('/article/labelByPage', article.getLabelArticleByPage); //通过分页获取某标签的文章
router.post('/article/SLByPage', article.getSLArticleByPage);
//分类
router.get('/sort', sort.getSorts); //获取文章分类
router.get('/sort/assign', sort.getAssignSort); //通过分类id获取分类详情
router.post('/article/sort', sort.getArticleSort); //获取某文章的所有分类
router.get('/sort/page', sort.getSortsByPage); //通过分页获取文章分类
//标签
router.get('/label', label.getLabels); //获取文章标签
router.post('/article/label', label.getArticleLabel); //获取某文章的所有标签
router.get('/label/page', label.getLabelsByPage); //通过分页获取文章标签
// 日记
router.get('/daily', daily.getDaily); //获取日记列表
router.get('/daily/page', daily.getDailyByPage); //按照分页获取日记列表
router.get('/daily/assign', daily.getAssignDaily); //根据id获取日记
// router.post('/article/user',article.getArticleUser)//获取文章的用户信息
//删除系列
router.get('/del/article', article.delArticle);
router.get('/del/sort', sort.delSort);
router.get('/del/label', label.delLabel);
router.get('/del/daily', daily.delDaily);
//增加系列
router.get('/add/article', article.addArticle);
router.get('/add/sort', sort.addSort);
router.get('/add/label', label.addLabel);
router.get('/add/daily', daily.addDaily);
// //修改系列
router.get('/edit/article', article.editArticle); //修改某文章
router.get('/edit/sort', sort.editSort); //修改某分类
router.get('/edit/label', label.editLabel);
router.get('/edit/articleLabel', label.editArticleLabel); //修改某文章的标签
router.get('/edit/articleSort', sort.editArticleSort); //修改某文章的分类
router.get('/edit/daily', daily.editDaily);
module.exports = router;
