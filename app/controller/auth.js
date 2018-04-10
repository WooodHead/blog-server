const Controller = require('egg').Controller;

class AuthController extends Controller {
    async login() {
        const { ctx, service, config } = this;
        const { username, password } = ctx.request.body;
        const user = await service.user.login({
            username,
            password,
        });
        const { expiresIn } = config;
        const accessToken = await service.accessToken.create(
            ctx.helper.getUUID(),
            Math.floor(Date.now() / 1000) + expiresIn,
            user._id
        )

        ctx.body = {
            user,
            access_token: accessToken.value,
        }
        ctx.status = 200;
    }
}

module.exports = AuthController;
