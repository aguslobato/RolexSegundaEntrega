const mongoose = require('mongoose');
const productsService = require('../../Models/mongo/productsSchema');

mongoose.connect('mongodb+srv://teco:123@codercluster.rx1gy.mongodb.net/NoTenemosNada?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw new Error('Cannot connect to MongoDB 😓');
    console.log('Products\' collection connected 😎');
})


class ProductsManager {
    create = async (prod) => {
        if (!prod.name || !prod.stock || !prod.price) return {
            status: 'error',
            error: 'Missing property 👮‍♂️'
        }
        await productsService.insertMany([prod]);
        return {
            status: 'success',
            msg: 'New product created 😎'
        }
    }
    read = async () => {
        let product = await productsService.find({}, {
            __v: 0,
        })
        return {
            status: 'success',
            payload: product,
        }
    }
    update = async (req_id, req_body) => {
        await productsService.updateOne({
            _id: req_id
        }, {
            $set: {
                name: req_body.name,
                price: req_body.price,
                stock: req_body.stock
            }
        })
        return {
            status: 'success',
            msg: 'Product updated 🌈',
        }
    }
    delete = async (req_id) => {
        await productsService.deleteOne({
            _id: req_id
        })
        return {
            status: 'success',
            msg: 'Product deleted 💣'
        }
    }
}

module.exports = ProductsManager;