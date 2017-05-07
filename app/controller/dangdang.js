const login_url = 'https://mpassport.dangdang.com/login.php';
const showCode_url = 'https://mpassport.dangdang.com/showcode.php';
const buy_url = 'http://product.m.dangdang.com/h5ajax.php';

const MDD_sid = '5c07dd10406ed6f2f91a8a2637795767';
const MDD_permanent_id = '20170507111153973851676202589160376';
let MDD_token = '';
let MDD_uid = '';

module.exports = app => {
	class DangdangController extends app.Controller {
		async showCode() {
			const { ctx, service } = this;
			const result = await ctx.curl(showCode_url, {
                headers: {
                    cookie: `MDD_sid=${MDD_sid};`
                },
                dataType: 'json',
            })
			ctx.body = {
				data: result.data
			};
            ctx.status = +result.status;
            ctx.set(result.headers);
		}
        async login() {
			const { ctx, service } = this;
            const data = ctx.request.body;
			const result = await ctx.curl(login_url, {
                method: 'POST',
                dataType: 'json',
                headers: {
                    cookie: `MDD_sid=${MDD_sid};`
                },
                data: {
                    captcha_code: +data.captcha_code,
                    captcha_key: data.captcha_key,
                    password: data.password,
                    username: data.username
                }
            })
            if (result.data.errorCode === 0) {
                MDD_token = result.data.userinfo.token_id;
                MDD_uid = result.data.userinfo.custid;
            }
			ctx.status = result.status;
            ctx.set(result.headers);
            ctx.body = result.data;
		}
        async panicBuying() {
			const { ctx, service } = this;
			const result = await ctx.curl(buy_url, {
                method: 'GET',
                dataType: 'json',
                headers: {
                    cookie: `MDD_sid=${MDD_sid};MDD_token=${MDD_token};MDD_uid=${MDD_uid}`
                },
                data: {
                    action: 'one_click_buying',
                    pid: '25071971',    //  tagret: 25071971  ; test: 25072443
                    count: 1,
                    sid: MDD_sid
                }
            })
			ctx.status = result.status;
            ctx.set(result.headers);
            ctx.body = result.data;
		}
	}
	return DangdangController;
}