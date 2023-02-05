//创建统一的返回报文对象
//状态码
export class ResultCode {
    //状态码
    code:number;
    //说明
    desc:string;
    constructor(code:number, desc:string) {
        this.code = code;
        this.desc = desc;
    }
    //是静态成员，智能用类名直接调用，这里其实是调用构造函数
    static SUCCESS = new ResultCode(200, '成功');
    static FAILED = new ResultCode(500, '失败');
    static VALIDATE_FAILED = new ResultCode(400, '参数校验失败');
    static API_NOT_FOUNT = new ResultCode(404, '接口不存在');
    static API_BUSY = new ResultCode(700, '操作过于频繁')

}

class Response{
    msg:string
    code:number
    data:Object
    //constructor是类的构造函数，通过new命令创建对象实例时会自动调用该方法
    constructor(code:number,msg:string,data:Object){
        this.msg=msg
        this.code=code
        this.data=data
    }
    //注意传入的顺序不要搞混
    //成功
    static success(data:Object) {
        return new Response(ResultCode.SUCCESS.code, ResultCode.SUCCESS.desc, data);
    }
    //失败
    static fail(errData:Object) {
        return new Response(ResultCode.FAILED.code, ResultCode.FAILED.desc, errData);
    }
    //参数校验失败
    static validateFailed(param:Object) {
        return new Response(ResultCode.VALIDATE_FAILED.code, ResultCode.VALIDATE_FAILED.desc, param);
    }
}
//外界用require方法导入自定义模块中module,exports所指向的对象
module.exports=Response
export{}