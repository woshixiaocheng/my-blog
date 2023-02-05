//对操作不同表的sql语句进行封装
let article={
    queryAll:"select * from articles order by article_date desc",
    queryBySortId:"select * from articlesort where sort_id=?",
    queryByLabelId:"select * from label where label_id=?",
    queryById:"select * from articles where article_id=?"

}
let sort={
    queryAll:"select * from sorts",
    queryByArticleId:"select * from articlesort where article_id=?"
}
let label={
    queryAll:"select * from labels",
    queryByArticleId:"select * from articlelabel where article_id=?"
}
let daily={
    queryAll:"select * from dailys"
}
module.exports={
    article,
    sort,
    label,
    daily
}
export{}