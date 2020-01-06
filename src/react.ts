/**
 * reactjs项目使用的中间件
 */
import Finger from 'fingerprintjs2';
import { get } from './utils/request';

const MAX_REQ = 0;

interface IOpts {
    baseUrl: string;
    apiUrl: string;
    loginUrl: string;
}

interface IModel {
    uid: string;
    token: string;
    headimg: string;
    nickname: string;
    rules: string;
}
interface IReactSDK {
    init(): void;
    auth(fn: any): void;
    info(): IModel;
    check(name: string | string[]): void;
    login(): void;
}

class ReactSDK implements IReactSDK {
    constructor(opts: IOpts) {
        this.baseUrl = opts.baseUrl || '';
        this.apiUrl = this.baseUrl + opts.apiUrl;
        this.loginUrl = this.baseUrl + opts.loginUrl;
        this.init();
    }
    baseUrl = '';
    apiUrl = '';
    loginUrl = '';
    uuid = '';
    authCount = 0;
    /**
     * 初始化设备指纹
     */
    async init() {
        let uuid = localStorage.getItem('uuid');
        if (!uuid) {
            const data = await Finger.getPromise();
            const values = data.map(function(c) {
                return c.value;
            });
            uuid = Finger.x64hash128(values.join(''), 31);
            localStorage.setItem('uuid', uuid);
        }
        this.uuid = uuid;
    }

    /**
     * 校验是否登录状态
     * 1.检查是否有uid、token等参数
     * 2.网络请求是否登录
     * 3.返回结果
     */
    auth(fn: any) {
        const uid = localStorage.getItem('uid');
        const token = localStorage.getItem('token');
        if (!uid || !token) {
            this._fgAuth(fn);
        } else {
            this.authCount++;
            if (this.authCount > MAX_REQ) this._idAuth(fn);
        }
    }
    /**
     * 指纹鉴权
     */
    async _fgAuth(fn: any) {
        if (!this.uuid) return;
        try {
            const model = await get(this.apiUrl + '/open/auth', { uuid: this.uuid });
            localStorage.setItem('uid', model.uid);
            localStorage.setItem('token', model.token);
            localStorage.setItem('headimg', model.headimg);
            localStorage.setItem('nickname', model.nickname);
            localStorage.setItem('rules', model.rules);
        } catch (error) {
            console.log(error);
            this.logout();
        }
    }
    /**
     * uid、token鉴权
     */
    async _idAuth(fn: any) {
        this.authCount = 0;
        try {
            const uid = localStorage.getItem('uid') || '';
            const token = localStorage.getItem('token') || '';
            if (!uid || !token) return;
            const model = await get(this.apiUrl + '/open/auth', { uid, token });
            localStorage.setItem('uid', model.uid);
            localStorage.setItem('token', model.token);
            localStorage.setItem('headimg', model.headimg);
            localStorage.setItem('nickname', model.nickname);
            localStorage.setItem('rules', model.rules);
        } catch (error) {
            console.log(error);
            this.logout();
            fn && fn();
        }
    }

    info() {
        const uid = localStorage.getItem('uid');
        const token = localStorage.getItem('token');
        const headimg = localStorage.getItem('headimg');
        const nickname = localStorage.getItem('nickname');
        const rules = localStorage.getItem('rules');
        return { uid, token, headimg, nickname, rules };
    }
    /**
     * 校验是否有权限
     * @param name 权限key
     */
    check(name: string | string[]) {
        const rules = localStorage.getItem('rules');
        if (!rules) return;
        if (typeof name === 'string') {
            return rules.includes(name);
        } else {
            return name.some(item => rules.includes(item));
        }
    }
    /**
     * 去登录
     */
    login() {
        window.location.href = this.loginUrl;
    }
    logout() {
        localStorage.setItem('uid', '');
        localStorage.setItem('token', '');
        localStorage.setItem('headimg', '');
        localStorage.setItem('nickname', '');
        localStorage.setItem('rules', '');
    }
}
let ReactCache: IReactSDK = null;
/**
 *
 * @param opts url
 */
export function factory(opts: IOpts) {
    if (!ReactCache) {
        ReactCache = new ReactSDK(opts);
    }
    return ReactCache;
}
