//对操作不同表的sql语句进行封装
let user={
    queryByPhone:"select * from users where user_phone=?"
}
let article={
    queryAll:"select * from articles order by article_date desc",
    queryBySortId:"select * from articlesort where sort_id=?",
    queryByLabelId:"select * from label where label_id=?",
    queryById:"select * from articles where article_id=?",
    queryByPage:"select * from articlelist limit ?,?",
    queryByPageSort:"select * from articlelist where sort_id=? limit ?,?",
    queryByPageLabel:"select * from articlelist where label_id=? limit ?,?",
    queryByPageSL:"select * from articlelist where sort_id=? and label_id=? limit ?,?",
    queryCount:"select count(*) as total from articles",
    querySortCount:"select count(*) as total from articlelist where sort_id=?",
    queryLabelCount:"select count(*) as total  from articlelist where label_id=?",
    querySLCount:"select count(*) as total  from articlelist where sort_id=? and label_id=?",
    delById:"delete from articles where article_id=?",
    updateAll:"update articles set article_title=?,article_description=?,article_content=?,article_update_date=?  where article_id=?",
    insertAll:"insert into articles (article_title,article_description,article_content,user_id,article_date) values (?,?,?,?,?)"

}
let sort={
    queryAll:"select * from sorts",
    queryByArticleId:"select * from articlesort where article_id=?",
    updateByArticleId:"update set_article_sort set sort_id=?,article_id=? where article_id=?"
}
let label={
    queryAll:"select * from labels",
    queryByArticleId:"select * from articlelabel where article_id=?",
    updateByArticleId:"update set_article_label set label_id=?,article_id=? where article_id=?"
}
let daily={
    queryAll:"select * from dailys"
}
module.exports={
    article,
    sort,
    label,
    daily,
    user
}
export{}