module.exports = app => {
    class Github extends app.Service {
        async check(target) {
            const { ctx, config } = this;
            const { client_id, client_secret, github_api_root_path } = config.githubOauth;
            const access_token = ctx.getAccessToken();
            const basic = new Buffer(`${client_id}:${client_secret}`).toString('base64');
            const resp = await ctx.curl(`${github_api_root_path}/applications/${client_id}/tokens/${access_token}`, {
                dataType: 'json',
                headers: {
                    Authorization: `Basic ${basic}`,
                    'Content-Type': 'application/json',
                }
            });
            if (resp.status !== 200) {
                throw new Error(resp.data.message);
            }
            return true;
        }
        async getUser(access_token) {
            const { ctx, config } = this;
            const { github_api_root_path } = config.githubOauth;
            const resp = await ctx.curl(`${github_api_root_path}/user`, {
                dataType: 'json',
                headers: {
                    authorization: `token ${access_token}`,
                    scope: 'user',
                    'Content-Type': 'application/json',
                }
            })
            return resp.data;
        }
    }
    return Github;
};