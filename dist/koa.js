"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function simple(err) {
    return async (ctx, next) => {
        const { uid, token } = ctx.headers;
        if (!uid || !token) {
            err && err(ctx);
        }
        else {
            await next();
        }
    };
}
exports.simple = simple;
