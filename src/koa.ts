/**
 * 简单的验证
 * @param err 错误返回
 */
export function simple(err: any) {
    return async (ctx: any, next: any) => {
        const { uid, token } = ctx.headers;
        if (!uid || !token) {
            err && err(ctx);
        } else {
            await next();
        }
    };
}
