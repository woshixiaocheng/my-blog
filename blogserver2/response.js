"use strict";
exports.__esModule = true;
exports.ResultCode = void 0;
//创建统一的返回报文对象
//状态码
var ResultCode = /** @class */ (function () {
    function ResultCode(code, desc) {
        this.code = code;
        this.desc = desc;
    }
    //是静态成员，智能用类名直接调用，这里其实是调用构造函数
    ResultCode.SUCCESS = new ResultCode(200, '成功');
    ResultCode.FAILED = new ResultCode(500, '失败');
    ResultCode.VALIDATE_FAILED = new ResultCode(400, '参数校验失败');
    ResultCode.API_NOT_FOUNT = new ResultCode(404, '接口不存在');
    ResultCode.API_BUSY = new ResultCode(700, '操作过于频繁');
    return ResultCode;
}());
exports.ResultCode = ResultCode;
var Response = /** @class */ (function () {
    //constructor是类的构造函数，通过new命令创建对象实例时会自动调用该方法
    function Response(code, msg, data) {
        this.msg = msg;
        this.code = code;
        this.data = data;
    }
    //注意传入的顺序不要搞混
    //成功
    Response.success = function (data) {
        return new Response(ResultCode.SUCCESS.code, ResultCode.SUCCESS.desc, data);
    };
    //失败
    Response.fail = function (errData) {
        return new Response(ResultCode.FAILED.code, ResultCode.FAILED.desc, errData);
    };
    //参数校验失败
    Response.validateFailed = function (param) {
        return new Response(ResultCode.VALIDATE_FAILED.code, ResultCode.VALIDATE_FAILED.desc, param);
    };
    return Response;
}());
//外界用require方法导入自定义模块中module,exports所指向的对象
module.exports = Response;
