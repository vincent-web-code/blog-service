module.exports = app => {

    const express = require('express')
    const router = express.Router();
    

    // 登录校验中间件
    const auth = require("../../middleware/auth")(app);
    require("./category")(router, auth); // 分类接口
    require("./article")(router, auth);  // 文章接口
    require("./comment")(router, auth);  // 评论接口
    require("./adminUser")(router, auth);  // 管理员接口
    require("./login")(router, app);    // 登录接口

    app.use('/admin/api', router);

    // 错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}