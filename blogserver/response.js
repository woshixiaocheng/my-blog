"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultCode = void 0;
//创建统一的返回报文对象
//状态码
class ResultCode {
    constructor(code, desc) {
        //状态码
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        //说明
        Object.defineProperty(this, "desc", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.code = code;
        this.desc = desc;
    }
}
exports.ResultCode = ResultCode;
//是静态成员，智能用类名直接调用，这里其实是调用构造函数
Object.defineProperty(ResultCode, "SUCCESS", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new ResultCode(200, '成功')
});
Object.defineProperty(ResultCode, "FAILED", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new ResultCode(500, '失败')
});
Object.defineProperty(ResultCode, "VALIDATE_FAILED", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new ResultCode(400, '参数校验失败')
});
Object.defineProperty(ResultCode, "API_NOT_FOUNT", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new ResultCode(404, '接口不存在')
});
Object.defineProperty(ResultCode, "API_BUSY", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new ResultCode(700, '操作过于频繁')
});
class Response {
    //constructor是类的构造函数，通过new命令创建对象实例时会自动调用该方法
    constructor(code, msg, data) {
        Object.defineProperty(this, "msg", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.msg = msg;
        this.code = code;
        this.data = data;
    }
    //注意传入的顺序不要搞混
    //成功
    static success(data) {
        return new Response(ResultCode.SUCCESS.code, ResultCode.SUCCESS.desc, data);
    }
    //失败
    static fail(errData) {
        return new Response(ResultCode.FAILED.code, ResultCode.FAILED.desc, errData);
    }
    //参数校验失败
    static validateFailed(param) {
        return new Response(ResultCode.VALIDATE_FAILED.code, ResultCode.VALIDATE_FAILED.desc, param);
    }
}
//外界用require方法导入自定义模块中module,exports所指向的对象
module.exports = Response;
