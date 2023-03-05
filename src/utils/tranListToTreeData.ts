export function tranListToTreeData(list:any[],rootValue:any){
    let arr:any[]=[]
    list.forEach((item:any)=>{
        if(item.comment_pid===rootValue){
            //找到了它的子节点，然后还要找子节点的子节点
            const children=tranListToTreeData(list,item.comment_id)
            if((children as any).length){
                //如果children的长度大于0，说明找到了子节点
                item.children=children
            }
            arr.push(item)
        }
    })
    return arr
}
export default tranListToTreeData