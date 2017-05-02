const type = 'github';

module.exports = app => {
    class GithubController extends app.Controller {
        async index() {
            const { ctx, service, config } = this;
            const { client_id, client_serct, redirect_uri, scope, state, github_api_root_path, github_oauth_url, github_oauth_token } = config.githubOauth;
            const query = ctx.query;
            const resp = await ctx.curl(`${github_oauth_url}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`);
            ctx.redirect(new Buffer(resp.data).toString().match(/\<a\shref\=\"([^\"]+)/)[1]);
        }
        async callback() {
            const { ctx, service, config } = this;
            const ip = config.ip;
            const client_port = config.client_port;
            const { client_id, client_secret, redirect_uri, scope, state, github_oauth_token } = config.githubOauth;
            const query = ctx.query;
            const resp = await ctx.curl(`${github_oauth_token}`, {
                method: 'POST',
                data: {
                    client_id,
                    client_secret,
                    code: query.code,
                    redirect_uri,
                    state,
                },
                dataType: 'json',
            })
            const access_token = resp.data.access_token;
            const githubUser = await service.github.getUser(access_token);
            const user_id = await service.oauth.bind(githubUser.login, type);
            ctx.redirect(`http://${ip}:${client_port}?access_token=${access_token}&user_id=${user_id}`);
        }
        async getUser() {
            const { ctx, service, config } = this;
            const { github_api_root_path } = config.githubOauth;
            const access_token = ctx.getAccessToken();
            const user = await service.github.getUser(access_token);
            ctx.body = {
                user
            }
            ctx.status = 200;
        }
        async check() {
            const { ctx, service, config } = this;
            const { client_id, client_serct } = config.githubOauth;
            const access_token = ctx.getAccessToken();
            const basic = new Buffer(`${client_id}:${client_serct}`).toString('base64');
            const resp = await ctx.curl(`${github_api_root_path}/applications/${client_id}/tokens/${access_token}`, {
                dataType: 'json',
                headers: {
                    authorization: `basic ${basic}`,
                    'Content-Type': 'application/json',  
                }  
            });
        }
    }
    return GithubController;
}