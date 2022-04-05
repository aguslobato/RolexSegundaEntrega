const express = require('express');
const router = express.Router();
const {
    productDao
} = require('../../DAO/index')

const productService = new productDao();

router.get('/', async (req, res) => {
    await productService.read().then(result => res.send(result));
})

router.post('/', async (req, res) => {
    const body = req.body;
    await productService.create(body).then(result => res.send(result))
})

router.put('/:id', async (req, res) => {
    const req_id = req.params['id'];
    const req_body = req.body;
    await productService.update(req_id, req_body).then(result => res.send(result))
})

router.delete('/:id', async (req, res) => {
    const req_id = req.params['id'];
    await productService.delete(req_id).then(result => res.send(result))
})
module.exports = router;