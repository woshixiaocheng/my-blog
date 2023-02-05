
//实现时间格式化
function formatDate(value:string | number | Date):string{
    //value需要格式化的数据
    //format指定格式为yyyy-mm-dd hh:mm:ss
    let date:Date=new Date(value)
    let y:number=date.getFullYear()
    let M:string=add(date.getMonth()+1)
    let d:string=add(date.getDate())
    let h:string=add(date.getHours())
    let m:string=add(date.getMinutes())
    let s:string=add(date.getSeconds())
    function add(data:number):string{
        if(data<10){
            return '0'+data
        }else{
            return `${data}`
        }
    }
    return `${y}-${M}-${d} ${h}:${m}:${s}`

}
export default formatDate