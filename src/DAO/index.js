const MongoProductDao = require('./mongo/products');
const MongoCartDao = require('./mongo/carts');
const FsProductDao = require('./fs/products')
const FsCartDao = require('./fs/carts')

const db = 'fs';

let productDao;
let cartDao;

switch (db) {
    case 'mongo':
        productDao = MongoProductDao;
        cartDao = MongoCartDao;
        break;
    case 'fs':
        productDao = FsProductDao;
        cartDao = FsCartDao;
        break;
    default:
        break;
}

module.exports = {
    productDao,
    cartDao
};