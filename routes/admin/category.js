module.exports = (router, auth) => {
    const Category = require('../../modules/Category');
    const assert = require("http-assert");

    // 添加分类
    router.post('/categories', auth, async(req, res) => {
        // 查看所有是否已有分类
        const list = await Category.find();
        let isExit = list.some(item => {
            return item.name == req.body.name
        })
        
        assert(!isExit, 422, '已存在分类');
        const model = await Category.create(req.body);
        res.send(model)
    });

    // 查看全部分类
    router.get('/categories', auth, async(req, res) => {
        let list = [];
        if (req.query.page && req.query.size) {
            let page = req.query.page ? Number(req.query.page) : 1;
            let size = req.query.size ? Number(req.query.size) : 10;
            
            list = await Category.find({}).limit(size).skip((page-1) * size).exec();
        } else {
            list = await Category.find()
        }

        // 总数
        let total = await Category.find().estimatedDocumentCount(); // countDocuments
        res.send({list, total});
    });

    // 查看一个分类
    router.get('/categories/:id', auth, async(req, res) => {
        let model = await Category.findById(req.params.id);

        assert(model, 422, '无该分类！');

        res.send(model)
    });

    // 修改分类
    router.put('/categories/:id', auth, async(req, res) => {
        const list = await Category.find();
        let isExit = list.some(item => {
            return item.name == req.body.name
        });
    
        assert(!isExit, 422, '已存在分类');

        let model = await Category.findByIdAndUpdate(req.params.id, req.body);
        res.send(model)
    });

    // 删除分类
    router.delete('/categories/:id', auth, async(req, res) => {
        let model = await Category.findByIdAndDelete(req.params.id, req.body);

        assert(model, 422, '删除失败');

        res.send(model);
    });
}