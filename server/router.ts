//配置对应路由
let express=require('express')
let router=express.Router()
//引入接口
// let user=require('./api/user')
let article=require('./api/article')
let sort=require('./api/sort')
let label=require('./api/label')
let daily=require('./api/daily')
//给接口设置路由路径,这里的路径是接口路径
//用户
// router.post('/login',user.login)//登录
// router.post('/register',user.register)//注册
// router.get('/user',user.getUser)
//文章
router.get('/article',article.getAll)//获取所有文章
router.get('/article/assign',article.getAssignArticle)//根据特定id获取文章
router.get('/sort/article',article.getSortArticle)//根据分类id获取指定文章
router.get('/label/article',article.getLabelArticle)//根据标签id获取指定文章
// router.post('/article/page',article.getArticleByPage)//通过分页获取文章
//分类
router.get('/sort',sort.getSorts)//获取文章分类
router.post('/article/sort',sort.getArticleSort)//获取某文章的所有分类
// router.get('/sort/page',article.getSortsByPage)//通过分页获取文章分类
//标签
router.get('/label',label.getLabels)//获取文章标签
router.post('/article/label',label.getArticleLabel)//获取某文章的所有标签
// router.get('/label/page',article.getLabelsByPage)//通过分页获取文章标签
// 日记
router.get('/daily',daily.getDaily)//获取日记列表

// router.post('/article/sortByPage',article.getSortArticleByPage)//通过分页获取某分类的文章
// router.post('/article/labelByPage',article.getLabelArticleByPage)//通过分页获取某分类的文章


// router.post('/article/user',article.getArticleUser)//获取文章的用户信息

// //删除系列
// router.get('/del/article',article.delArticle)
// router.get('/del/sort',article.delSort)
// router.get('del/label',article.delLabel)
// //增加系列
// router.get('/add/article',article.addArticle)
// router.get('/add/sort',article.addSort)
// router.get('/add/label',article.addLabel)

// //修改系列
// router.get('/edit/article',article.editArticle)
// router.get('/edit/sort',article.editSort)
// router.get('/edit/label',article.editLabel)
// router.get('/edit/articleLabel',article.editArticleLabel)
// router.get('/edit/articleSort',article.editArticleSort)



module.exports=router
export{}