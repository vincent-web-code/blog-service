module.exports = (router) => {
    const Category = require('../../modules/Category');
    const Article = require('../../modules/Article');
    router.get('/tagsList', async(req, res) => {
        let model = await Category.find({});
        res.send(model)
    });

    router.get('/getCategory/:id', async(req, res) => {
        let model = await Article.find({
            category: { $regex: req.params.id }
        });
        let _list = JSON.parse(JSON.stringify(model));
        let categroyList = await Category.find();
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
        res.send(_list)
        
    })
}