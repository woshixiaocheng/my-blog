"use strict";
//使用枚举
exports.__esModule = true;
exports.CodeMessage = exports.Code = void 0;
//状态码
var Code;
(function (Code) {
    Code[Code["success"] = 200] = "success";
    Code[Code["serverError"] = 500] = "serverError";
    Code[Code["paramError"] = 400] = "paramError";
    Code[Code["pesError"] = 401] = "pesError";
    Code[Code["apiError"] = 404] = "apiError";
})(Code = exports.Code || (exports.Code = {}));
//状态码描述
var CodeMessage;
(function (CodeMessage) {
    CodeMessage["success"] = "\u8BF7\u6C42\u6210\u529F";
    CodeMessage["serverError"] = "\u7CFB\u7EDF\u5F02\u5E38";
    CodeMessage["paramError"] = "\u8BF7\u6C42\u53C2\u6570\u6709\u95EE\u9898";
    CodeMessage["pesError"] = "\u6CA1\u6709\u8BBF\u95EE\u6743\u9650";
    CodeMessage["apiError"] = "\u63A5\u53E3\u4E0D\u5B58\u5728";
})(CodeMessage = exports.CodeMessage || (exports.CodeMessage = {}));
