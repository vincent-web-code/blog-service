module.exports = (router) => {
    const Article = require('../../modules/Article');
    const Category = require('../../modules/Category');

    // 查询首页文章列表
    router.get('/getArticleList', async(req, res) => {
        let size = Number(req.query.size) || 10
        let page = Number(req.query.page) || 1
        let list = await Article.find().sort([['_id',-1]]).limit(size).skip((page - 1) * size).exec();
        
        let categroyList = await Category.find();
        let _list = JSON.parse(JSON.stringify(list));

        _list.forEach(item => {
            item.categroyName = [];
            let category = item.category.split(',') || [];
            categroyList.forEach(e => {
                category.forEach(i => {
                    if(i == e._id) {
                        item.categroyName.push(e.name)
                    }
                })
            })
        });
        let total = await Article.find().estimatedDocumentCount();
        
        res.send({ list: _list, total })
        
    });


    // 首页详情
    router.get('/article/:id', async(req, res) => {
        let model = await Article.findById(req.params.id);
        res.send(model)
    })
}