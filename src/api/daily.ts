import request from '@/utils/request'

export function getDaily(){
    return request({
        method:'GET',
        url:'/daily'
    })
}