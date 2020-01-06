/**
 * reactjs项目使用的中间件
 */
import Finger from 'fingerprintjs2';

class ReactSDK {
    constructor(opts: any) {
        this.init();
    }
    uuid = '';
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
        }
        this.uuid = uuid;
    }

    /**
     * 校验是否登录状态
     * 1.检查是否有uid、token等参数
     * 2.网络请求是否登录
     * 3.返回结果
     */
    auth() {
        const uid = localStorage.getItem('uid');
    }
    /**
     * 校验是否有权限
     * @param name 权限key
     */
    check(name: string | string[]) {
        if (typeof name === 'string') {
        } else {
        }
    }
}
let ReactCache = null;
export default function(opts: any) {
    if (!ReactCache) {
        ReactCache = new ReactSDK(opts);
    }
    return ReactCache;
}
