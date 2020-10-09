const e = require('express');

module.exports = (app) => {
    const express = require('express');
    const router = express.Router();

    require('./article')(router);
    
    app.use('/web/api', router);

    // 错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}