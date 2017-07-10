module.exports = options => {
    return async (ctx, next) => {
        const { service } = ctx;
        const access_token = ctx.getAccessToken();
        const result = await service.accessToken.existed(access_token);
        if (result) {
            await next()
        } else {
            ctx.throw(403, 'access_token过期或不存在')
        } 
    }
}