//文章
interface articles{
    article_id:number
    user_id:number
    article_title:Text
    article_content:Text
    article_views:number
    article_date:Date
    article_comment_count:number
    article_like_count:number
    article_description:Text
}
//articleList
interface ArticleList{
    article_id:number
    article_title:string
    user_name:string
    sort_id:number
    label_id:number
    label_name:string
    article_date:Date
    article_like_count:number
    article_comment_count:number
    article_view:number
}
//分类
interface sorts{
    sort_id:number
    sort_name:string
    sort_description:Text
}

//标签
interface labels{
    label_id:number
    label_name:string
    label_description:Text
}

//分类下的文章
interface articleSort{
    sort_id:number
    sort_name:string
    article_id:number
    article_title:Text
}

//标签下的文章
interface articleLabel{
    label_id:number
    label_name:string
    article_id:number
    article_title:Text
}
//banner
interface Banner{
        title:string
        content:string  
}

//daily
interface Daily{
    daily_id:number
    daily_content:Text
    daily_date:Date
}

//login
interface Login{
    phone:string
    password:string
}
//page
interface Page{
    size:number
    page:number
    total:number
}
export type {articles,sorts,labels,articleSort,articleLabel,Banner,Daily,Login,ArticleList,Page}