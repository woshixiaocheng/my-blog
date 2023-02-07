import request from '@/utils/request'
//写具体的接口方法

//获取全部文章
export function showArticle(){
    return request({
        method:'GET',
        url:'/article',

    })
}
//通过分页获取全部文章
export function getArticleByPage(data:Object){
    return request({
        method:'POST',
        url:"/article/page",
        data
    })
}
//按照id获取文章
export function getAssignArticle(params:Object){
    return request({
        method:'GET',
        url:'/article/assign',
        params
    })
}


//获取全部文章分类
export function getSorts(){
    return request({
        method:'GET',
        url:'/sort'
    })
}

//根据分页获取文章分类
export function getSortsByPage(params:Object){
    return request({
        method:'GET',
        url:'/sort/page',
        params
    })
}
//获取全部文章标签
export function getLabels(){
    return request({
        method:'GET',
        url:'/label'
    })
}

//根据分页获取文章标签
export function getLabelsByPage(params:Object){
    return request({
        method:'GET',
        url:'/label/page',
        params
    })
}

//根据分类id获取指定文章
export function getSortArticle(params:Object){
    return request({
        method:'GET',
        url:'/sort/article',
       params
    })
}

//根据标签id获取指定文章
export function getLabelArticle(params:Object){
    return request({
        method:'GET',
        url:'/label/article',
        params
    })
}
//通过分页获取分类的文章
export function getSortArticleByPage(data:Object){
    return request({
        method:'POST',
        url:'/article/sortByPage',
        data
    })
}
//通过分页获取分类的文章
export function getLabelArticleByPage(data:Object){
    return request({
        method:'POST',
        url:'/article/labelByPage',
        data
    })
}

//通过分页获取分类标签的文章
export function getSLArticleByPage(data:Object){
    return request({
        method:'POST',
        url:'/article/SLByPage',
        data
    })
}
//获取某文章的所有分类
export function getArticleSort(data:Object){
    return request({
        method:'POST',
        url:'/article/sort',
        data
    })
}

//获取某文章的所有标签
export function getArticleLabel(data:Object){
    return request({
        method:'POST',
        url:'/article/label',
        data
    })
}
//获取某文章的用户信息
export function getArticleUser(data:Object){
    return request({
        method:'POST',
        url:'/article/user',
        data
    })
}

//删除指定文章
export function delArticle(params:Object){
    return request({
        method:'GET',
        url:'/del/article',
        params
    })
}

//删除指定分类
export function delSort(params:Object){
    return request({
        method:'GET',
        url:'/del/sort',
        params
    })
}

//删除指定标签
export function delLabel(params:Object){
    return request({
        method:'GET',
        url:'/del/label',
        params
    })
}

//添加分类
export function addSort(params:Object){
    return request({
        method:'GET',
        url:'/add/sort',
        params
    })
}

export function addLabel(params:Object){
    return request({
        method:'GET',
        url:'/add/label',
        params
    })
}

//修改分类
export function editSort(params:Object){
    return request({
        method:'GET',
        url:'/edit/sort',
        params
    })
}
export function editLabel(params:Object){
    return request({
        method:'GET',
        url:'/edit/label',
        params
    })
}

//添加文章
export function addArticle(params:Object){
    return request({
        method:'GET',
        url:'/add/article',
        params
    })
}

//修改文章
export function editArticle(params:Object){
    return request({
        method:'GET',
        url:'/edit/article',
        params
    })
}

//修改文章的标签
export function editArticleLabel(params:Object){
    return request({
        method:'GET',
        url:'/edit/articleLabel',
        params
    })
}
//修改文章的分类
export function editArticleSort(params:Object){
    return request({
        method:'GET',
        url:'/edit/articleSort',
        params
    })
}