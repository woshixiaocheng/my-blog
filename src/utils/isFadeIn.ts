//显示动画封装成公共函数,item传入要添加动画的元素，scrollChange传入外部计算的scroll改变值
export function isFadeIn(item:any,scrollChange:number,addNum:number){
    if(item.offsetTop-document.documentElement.scrollTop-document.body.clientHeight+addNum<0&&scrollChange >=0){
            if(getComputedStyle(item).opacity!=='1'){
                item.style.setProperty('animation','fadeIn 1s')
                item.style.setProperty('animation-fill-mode','forwards')
            }
        }else if(scrollChange < 0){//页面不是向下滚的就没有动画,并且透明度为1
            item.style.setProperty('opacity','1')
            item.style.setProperty('animation','none')
        }else{//页面距离远的opacity再次设为0
            item.style.setProperty('animation','none')
            item.style.setProperty('opacity','0')
        }
}
export default isFadeIn