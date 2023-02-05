//使用枚举

//状态码
export enum Code{
    success=200,//成功
    serverError=500,//失败
    paramError=400,//请求参数有问题
    pesError=401,//没有访问的权限
    apiError=404,//请求接口不存在
}

//状态码描述
export enum CodeMessage{
    success='请求成功',
    serverError='系统异常',
    paramError="请求参数有问题",
    pesError="没有访问权限",
    apiError="接口不存在"
}

//状态类型,只能是code类型中枚举的状态名success等
export type codeType=keyof typeof Code


