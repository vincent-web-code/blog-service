module.exports = (router, app) => {
    const AdminUser = require('../../modules/AdminUser');
    const assert = require('http-assert');
    const jwt = require('jsonwebtoken');
    // 登录
    router.post("/login", async(req, res) => {
        let { username, password } = req.body;
        // 1.根据用户名找用户
        let user = await AdminUser.findOne({ username }).select('+password');

        assert(user, 422, '用户不存在')

        // 2.校验密码
        let isVaild = require('bcrypt').compareSync(password, user.password);  // 明 -> 密
        if (!isVaild) {
            assert(user, 422, '密码错误')
        }
        
        // 3.返回token
        const token = jwt.sign({ 
            id: user._id 
        }, app.get('secret'), { 
            expiresIn: 6000  //过期时间
        });

        res.send({ token, username: user.username })
    });


    // // 注销
    // router.get("/logout", async(req, res) => {
    //     console.log(req.)
    // })
}