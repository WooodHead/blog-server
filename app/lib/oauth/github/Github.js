const config = require('./config');
const fetch = require('../fetch');
// client_id, client_serct, redirect_uri, scope, state, github_api_root_path, github_oauth_url, github_oauth_token

class Github {

    constructor({ redirect_uri, client_id, client_secret }) {
        this.redirect_uri = redirect_uri;
        this.client_id = client_id;
        this.client_secret = client_secret;
    }

    async callback(renderCallbackUrl) {
        const accessToken = await getAccessToken();
        const user = await getUser(accessToken);
        const callbackUrl = renderCallbackUrl(accessToken, user);
        ctx.redirect(callbackUrl);
    }

    async getAccessToken(code, options) {
        const { github_oauth_token, state } = config;
        const { client_id, client_secret, redirect_uri } = this;
        const resp = await fetch.post(`${github_oauth_token}`, {
            data: {
                client_id,
                client_secret,
                code,
                redirect_uri,
                state,
            }
        })
        return resp.data.access_token;
    }

    async getUser(accessToken) {
        const { github_api_root_path } = config;
        const resp = await fetch.get(`${github_api_root_path}/user`, {
            dataType: 'json',
            headers: {
                authorization: `token ${access_token}`,
                scope: 'user',
                'Content-Type': 'application/json',
            }
        })
    }





    async index() {
        const { ctx, service, config } = this;
        const { client_id, client_serct, redirect_uri, scope, state, github_api_root_path, github_oauth_url, github_oauth_token } = config.githubOauth;
        const query = ctx.query;
        const resp = await ctx.curl(`${github_oauth_url}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`);
        ctx.redirect(new Buffer(resp.data).toString().match(/\<a\shref\=\"([^\"]+)/)[1]);
    }
    async callback() {
        const { ctx, service, config } = this;
        const { ip, client_port, expiresIn } = config;
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
        const accessToken = await service.accessToken.create(access_token, Math.floor(Date.now() / 1000) + expiresIn, user_id);
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

module.exports = GithubController;
