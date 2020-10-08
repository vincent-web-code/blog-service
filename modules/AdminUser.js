const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        select: false,
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    },
})

module.exports = mongoose.model('AdminUser', schema);