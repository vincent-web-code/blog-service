module.exports = (router, auth) => {
    const Article = require('../../modules/Article');
    const Category = require('../../modules/Category');
    const assert = require("http-assert")
    // 添加文章
    router.post('/article', auth, async(req, res) => {
        // 查看是否有同名标题
        let list = await Article.find();
        let isExit = list.some(item => {
            return item.title == req.body.title
        });

        assert(!isExit, 422, '该标题已存在');

        let model = await Article.create(req.body);
        res.send(model)
    });

    // 查找所有文章
    router.get('/article', auth, async(req, res) => {
        let size = Number(req.query.size) || 10
        let page = Number(req.query.page) || 1
        let list = await Article.find().sort([['_id',-1]]).limit(size).skip((page - 1) * size).exec();

        let categroyList = await Category.find();
        let _list = JSON.parse(JSON.stringify(list));
        _list.forEach(e => {
            e.categoryName = []
            let category = e.category.split(',') || [];
            categroyList.forEach(i => {
                category.forEach(cateItem => {
                    if (i._id == cateItem) {
                        e.categoryName.push(i.name);
                    }
                })
            });
        });
        let total = await Article.find().estimatedDocumentCount();
        res.send({ list: _list, total });
    });

    // 删除文章
    router.delete('/article/:id', auth, async(req, res) => {
        let model = await Article.findByIdAndDelete(req.params.id, req.body);

        assert(model, 422, '删除失败');

        res.send(model);
    });

    // 获取文章内容
    router.get('/article/:id', auth, async(req, res) => {
        let model = await Article.findById(req.params.id);

        assert(model, 422, '无该文章！');

        res.send(model)
        
    });

    // 修改文章
    router.put('/article/:id', async(req, res) => {
        let model = await Article.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    })

}