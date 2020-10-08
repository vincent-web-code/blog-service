module.exports = (router, auth) => {
    const Comment = require('../../modules/Comment');

    // 评论列表
    router.get('/comment', auth, async(req, res) => {
        let page = Number(req.query.page);
        let size = Number(req.query.size);

        let list = await Comment.find().populate('article').limit(size).skip((page - 1) * size).exec()
        let total = await Comment.find().estimatedDocumentCount();
        res.send({ list, total });
    })
}