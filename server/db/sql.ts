//对操作不同表的sql语句进行封装
let user={
    queryByPhone:"select * from users where user_phone=?",
    queryById:"select * from userpermissions where user_phone=?"
}
let article={
    queryAll:"select * from articles order by article_date desc",
    queryBySortId:"select * from sort where sort_id=?",
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
    queryById:"select * from sorts where sort_id=?",
    queryByArticleId:"select * from articlesort where article_id=?",
    updateByArticleId:"update set_article_sort set sort_id=?,article_id=? where article_id=?",
    queryByPage:"select * from sorts limit ?,?",
    queryCount:"select count(*) as total from sorts",
    delById:"delete from sorts where sort_id=?",
    insertAll:"insert into sorts (sort_name,sort_description) values (?,?)",
    updateAll:"update sorts set sort_name=?,sort_description=? where sort_id=?"
}
let label={
    queryAll:"select * from labels",
    queryByArticleId:"select * from articlelabel where article_id=?",
    updateByArticleId:"update set_article_label set label_id=?,article_id=? where article_id=?",
    queryByPage:"select * from labels limit ?,?",
    queryCount:"select count(*) as total from labels",
    delById:"delete from labels where label_id=?",
    insertAll:"insert into labels (label_name,label_description) values (?,?)",
    updateAll:"update labels set label_name=?,label_description=? where label_id=?"
}
let daily={
    queryAll:"select * from dailys order by daily_date desc",
    queryByPage:"select * from dailys limit ?,?",
    queryCount:"select count(*) as total from dailys",
    delById:"delete from dailys where daily_id=?",
    insertAll:"insert into dailys (daily_content,daily_date) values (?,?)",
    updateAll:"update dailys set daily_content=?,daily_date=? where daily_id=?",
    queryById:"select * from dailys where daily_id=?"
}
module.exports={
    article,
    sort,
    label,
    daily,
    user
}
export{}