module.exports = () => {
    const mongoose = require("mongoose");
    mongoose.connect('mongodb://127.0.0.1:27017/blog', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, err => {
        if (err) console.log('连接数据库失败');
        else console.log('连接数据库成功')
    })
}
