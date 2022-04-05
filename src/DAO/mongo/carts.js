const mongoose = require('mongoose');
const moment = require('moment');
const m = moment();
const cartService = require('../../Models/mongo/cartsSchema');
const productService = require('../../Models/mongo/productsSchema')

mongoose.connect('mongodb+srv://teco:123@codercluster.rx1gy.mongodb.net/NoTenemosNada?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw new Error('Cannot connect to MongoDB 😓');
    console.log('Carts\' collection connected 😎');
})


class CartsManager {
    create = async (cart) => {
        cart.cartCreation_timestamp = m.format("hh:mm:ssA  DD-MM-YYYY")
        await cartService.insertMany([cart])
        return {
            status: "success",
            msg: 'Cart created 😎'
        }
    }
    read = async () => {
        let cart = await cartService.find({}, {
            __v: 0,
        })
        return {
            status: 'success',
            payload: cart,
        }
    }
    update = async (cart_id, cart_body) => {
        await cartService.updateOne({
            _id: cart_id
        }, {
            $push: {
                products: cart_body.products
            }
        })
        return {
            status: 'success',
            msg: 'Product updated 🌈',
        }
    }
    delete = async (cart_id) => {
        await cartService.deleteOne({
            _id: cart_id
        })
        return {
            status: 'success',
            msg: 'Cart deleted 💣'
        }
    }
    addToCart = async (cart_id, prod_id) => {
        const prodFound = await productService.findOne({
            _id: prod_id
        })
        await cartService.findOneAndUpdate({
            _id: cart_id
        }, {
            $push: {
                products: {
                    id: prodFound._id
                }
            }
        })
        return {
            status: 'success',
            msg: 'Product added to cart 🌈'
        }
    }
}

module.exports = CartsManager;