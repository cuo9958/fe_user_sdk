/**
 * 简单的验证
 * @param err 错误返回
 */
export function simple(err: any) {
    return (ctx: any, next: any) => {
        const { uid, token } = ctx.headers;
        if (!uid || !token) {
            err && err();
        } else {
            next();
        }
    };
}
