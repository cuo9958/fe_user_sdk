"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * koa项目准备的用户鉴权
 */
const request_1 = require("./utils/request");
class KoaMiddleware {
    constructor(opts) {
        this.baseUrl = '';
        this.token = '';
        this.STATE = 0;
        this.baseUrl = opts.url;
        this.token = opts.token;
    }
    async init() {
        this.STATE = 1;
    }
    /**
     * 鉴权
     */
    auth() {
        request_1.get(this.baseUrl + '/api_user/open/auth', {});
    }
    /**
     * 登录
     */
    login() {
        request_1.post(this.baseUrl + '/api_user/open/login', {});
    }
    /**
     * 获取用户详情
     */
    getInfo() { }
    /**
     * 检查是否有权限
     */
    checkRule(rule) { }
}
let KoaCache = null;
function KoaMiddle(opts) {
    if (!KoaCache) {
        KoaCache = new KoaMiddleware(opts);
    }
    return KoaCache;
}
exports.KoaMiddle = KoaMiddle;
