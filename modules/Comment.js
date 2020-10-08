const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },

    article: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Article'
    },

    createDate: { type: Date, default: Date.now },  // 创建时间
})

module.exports = mongoose.model('Comment', schema);