/**
 * koa项目准备的用户鉴权
 */
import { post, get } from './utils/request';

interface IOptions {
    url: string;
    token: string;
}

class KoaMiddleware {
    constructor(opts: IOptions) {
        this.baseUrl = opts.url;
        this.token = opts.token;
    }
    baseUrl = '';
    token = '';
    STATE = 0;
    async init() {
        this.STATE = 1;
    }
    /**
     * 鉴权
     */
    auth() {
        get(this.baseUrl + '/open/auth', {});
    }
    /**
     * 登录
     */
    login() {
        post(this.baseUrl + '/open/login', {});
    }
    /**
     * 获取用户详情
     */
    getInfo() {}
    /**
     * 检查是否有权限
     */
    checkRule(rule: string) {}
}
let KoaCache = null;
export function KoaMiddle(opts: IOptions) {
    if (!KoaCache) {
        KoaCache = new KoaMiddleware(opts);
    }
    return KoaCache;
}