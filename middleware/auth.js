module.exports = app => {
    return async(req, res, next) => {
        const assert = require("http-assert");
        const jwt = require('jsonwebtoken');
        const AdminUser = require('../modules/AdminUser');
        let token = String(req.headers.authorization || '').split(' ').pop();
        assert(token, 401, '请先登录');
        let id = '';
        jwt.verify(token, app.get('secret'),(err, decode)=>{
            if (err) assert(!err, 401, '登录失效，请先登录')
            else id = decode.id;
        })
        req.user = await AdminUser.findById(id);
        assert(req.user, 401, '请先登录')
        await next();
    }
}