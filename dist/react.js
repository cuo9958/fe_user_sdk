"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fingerprintjs2_1 = __importDefault(require("fingerprintjs2"));
const request_1 = require("./utils/request");
const MAX_REQ = 0;
class ReactSDK {
    constructor(opts) {
        this.baseUrl = '';
        this.apiUrl = '';
        this.loginUrl = '';
        this.uuid = '';
        this.authCount = 0;
        this.baseUrl = opts.baseUrl || '';
        this.apiUrl = this.baseUrl + opts.apiUrl;
        this.loginUrl = this.baseUrl + opts.loginUrl;
        this.init();
    }
    async init() {
        let uuid = localStorage.getItem('uuid');
        if (!uuid) {
            const data = await fingerprintjs2_1.default.getPromise();
            const values = data.map(function (c) {
                return c.value;
            });
            uuid = fingerprintjs2_1.default.x64hash128(values.join(''), 31);
            localStorage.setItem('uuid', uuid);
        }
        this.uuid = uuid;
    }
    auth(fn) {
        const uid = localStorage.getItem('uid');
        const token = localStorage.getItem('token');
        if (!uid || !token) {
            this._fgAuth(fn);
        }
        else {
            this.authCount++;
            if (this.authCount > MAX_REQ)
                this._idAuth(fn);
        }
    }
    async _fgAuth(fn) {
        if (!this.uuid)
            return;
        try {
            const model = await request_1.get(this.apiUrl + '/open/auth', { uuid: this.uuid });
            localStorage.setItem('uid', model.uid);
            localStorage.setItem('token', model.token);
            localStorage.setItem('headimg', model.headimg);
            localStorage.setItem('nickname', model.nickname);
            localStorage.setItem('rules', model.rules);
        }
        catch (error) {
            console.log(error);
            this.logout();
        }
    }
    async _idAuth(fn) {
        this.authCount = 0;
        try {
            const uid = localStorage.getItem('uid') || '';
            const token = localStorage.getItem('token') || '';
            if (!uid || !token)
                return;
            const model = await request_1.get(this.apiUrl + '/open/auth', { uid, token });
            localStorage.setItem('uid', model.uid);
            localStorage.setItem('token', model.token);
            localStorage.setItem('headimg', model.headimg);
            localStorage.setItem('nickname', model.nickname);
            localStorage.setItem('rules', model.rules);
        }
        catch (error) {
            console.log(error);
            this.logout();
            fn && fn();
        }
    }
    check(name) {
        const rules = localStorage.getItem('rules');
        if (!rules)
            return;
        if (typeof name === 'string') {
            return rules.includes(name);
        }
        else {
            return name.some(item => rules.includes(item));
        }
    }
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
let ReactCache = null;
function factory(opts) {
    if (!ReactCache) {
        ReactCache = new ReactSDK(opts);
    }
    return ReactCache;
}
exports.factory = factory;