module.exports = options => {
    return async (ctx, next) => {
        const { service } = ctx;
        const result = await service.oauth.check('github');
        if (result) {
            await next()
        } else {
            const error = new Error('access_token过期或不存在');
            error.status = 401;
        } 
    }
}