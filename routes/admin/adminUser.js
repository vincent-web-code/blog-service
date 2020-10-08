module.exports = (router, auth) => {
    const AdminUser = require('../../modules/AdminUser');
    const assert = require('http-assert');
    // 添加管理员
    router.post('/adminUser', auth, async(req, res) => {
        // 查看所有是否已有用户名
        try {
            const list = await AdminUser.find();
            let isExit = list.some(item => {
                return item.username == req.body.username
            })
            // 已存在用户名
            assert(!isExit, 422, '已存在用户名');

            // 不存在用户名，创建用户名
            const model = await AdminUser.create(req.body);
            res.send(model)
        } 
        catch (error) {
            console.log('error')
        }
        
    });

    // 查看全部管理员
    router.get('/adminUser', auth, async(req, res) => {
        let list = [];
        if (req.query.page && req.query.size) {
            let page = req.query.page ? Number(req.query.page) : 1;
            let size = req.query.size ? Number(req.query.size) : 10;
            
            list = await AdminUser.find({}).limit(size).skip((page-1) * size).exec();
        } else {
            list = await AdminUser.find()
        }

        // 总数
        let total = await AdminUser.find().estimatedDocumentCount(); // countDocuments
        
        res.send({ list, total });
    });

    // 查看一个管理员
    router.get('/adminUser/:id', auth, async(req, res) => {
        let model = await AdminUser.findById(req.params.id);
        assert(model, 422, '无该管理员！')
        res.send(model)
    });

    // 修改管理员
    router.put('/adminUser/:id', auth, async(req, res) => {
        let model = await AdminUser.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    });

    // 删除管理员
    router.delete('/adminUser/:id', auth, async(req, res) => {
        let model = await AdminUser.findByIdAndDelete(req.params.id, req.body);
        assert(model, 422, '删除失败')
        res.send(model);
    });
}