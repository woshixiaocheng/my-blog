"use strict";
exports.__esModule = true;
var code_1 = require("../../server/constant/code");
//默认正确响应
//其中options可选
function commonRes(res, data, options) {
    //默认成功，成功时就不需要传入options
    //Object.assign()方法是把所有可枚举属性的值赋值到目标对象，目标对象是第一个参数，如果有重复的会覆盖目标对象里面的
    options = Object.assign({ type: code_1.Code[200] }, options || {});
    var type = options.type, status = options.status, message = options.message;
    var resStatus = status || undefined;
    if (resStatus === undefined) {
        //根据状态设置状态码
        resStatus = type === code_1.Code[200] ? 200 : 409;
    }
    //规范响应参数
    var sendRes = {
        code: code_1.Code[type],
        data: data
    };
    //响应描述
    //先判断是否有再赋值
    message && (sendRes.message = message);
    return res.status(resStatus).send(sendRes);
}
commonRes.error = function (res, type, data, message) {
    this(res, data || '', { type: type, message: message || code_1.CodeMessage[type], status: code_1.Code[type] || 409 });
};
exports["default"] = commonRes;
