"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const querystring_1 = __importDefault(require("querystring"));
async function post(url, data) {
    const res_data = await axios_1.default(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: querystring_1.default.stringify(data)
    });
    if (res_data.status !== 200) {
        throw new Error('登录失败');
    }
    const res = res_data.data;
    if (res.code === 1)
        return res.data;
    throw new Error(res.msg);
}
exports.post = post;
async function get(url, data) {
    const res_data = await axios_1.default(url + '?' + querystring_1.default.stringify(data), {
        method: 'GET'
    });
    if (res_data.status !== 200) {
        throw new Error('登录失败');
    }
    const res = res_data.data;
    if (res.code === 1)
        return res.data;
    throw new Error(res.msg);
}
exports.get = get;
