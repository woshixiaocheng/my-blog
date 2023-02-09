import request from '@/utils/request'

export function getDaily(){
    return request({
        method:'GET',
        url:'/daily'
    })
}
export function getDailyByPage(params:any){
    return request({
        method:'GET',
        url:'/daily/page',
        params
    })
}
export function getAssignDaily(params:any){
    return request({
        method:'GET',
        url:'/daily/assign',
        params
    })
}

//删除指定日记
export function delDaily(params:Object){
    return request({
        method:'GET',
        url:'/del/daily',
        params
    })
}

export function editDaily(params:Object){
    return request({
        method:'GET',
        url:'/edit/daily',
        params
    })
}
//添加日记
export function addDaily(params:Object){
    return request({
        method:'GET',
        url:'/add/daily',
        params
    })
}