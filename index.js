const express = require('express');
const app = express();

app.set('secret', 'fdoairo99euqiojsada02');

// 中间件
app.use(require('cors')());
app.use(express.json());

// 链接数据库
const connect = require("./plugins/db");
connect();

// 创建路由
const route = require("./routes/admin/index");

route(app);

app.listen(3000, () => {
    console.log("http://localhost:3000")
})