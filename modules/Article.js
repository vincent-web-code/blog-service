const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    // ref关联模型
    // categoryId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
    category: { type: String }, // 分类字符串，数组转成字符串
    title: { type: String },   // 文章标题
    content: { type: String },  // 文章内容
    createDate: { type: Date, default: Date.now },  // 创建时间
    readNum: { type: Number, default: 0 }    // 阅读量
})

module.exports = mongoose.model("Article", schema)