const express = require('express')
const router = express.Router();
const {
    cartDao
} = require('../../DAO/index')

const cartService = new cartDao();

router.get('/', async (req, res) => {
    await cartService.read().then(cart => res.send(cart))
})

router.post('/', async (req, res) => {
    await cartService.create(req.body).then(cart => res.send(cart))
})

router.put('/:id', async (req, res) => {
    await cartService.update(req.params['id'], req.body).then(cart => res.send(cart))
})

router.delete('/:id', async (req, res) => {
    await cartService.delete(req.params['id']).then(cart => res.send(cart))
})

router.put('/:cart/product/:prod', async (req, res) => {
    await cartService.addToCart(req.params['cart'], req.params['prod']).then(cart => res.send(cart))
})




module.exports = router;