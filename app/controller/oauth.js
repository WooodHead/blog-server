module.exports = app => {
    class OauthController extends app.Controller {
        async bind() {
            const { ctx, service } = this;
            const data = ctx.request.body;
            const target = await service.user.find({username: data.username});
            if (target) {
                throw ctx.error('用户已存在, 请直接登录');
            }
            const user = await service.user.create({
                username: data.username,
                password: data.password,
                name: `${data.username}_${new Date().getTime()}`
            });
            const user_id = user._id;
            const oauth = await service.oauth.create({
                user_id,
                login: data.login,
                type: data.oauth_type
            });
            ctx.body = {
                user_id
            }
            ctx.status = 200;
        }
    }
    return OauthController;
}