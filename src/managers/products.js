const fs = require('fs');
const productsPath = __dirname + './../files/products.json';

const showError = (error) => {
    return {
        status: "error",
        error: error
    }
}

class ProductsManager {
    getAllProducts = async () => {
        if (fs.existsSync(productsPath)) {
            try {
                const getProducts = await fs.promises.readFile(productsPath, 'utf-8', null, 2);
                const products = JSON.parse(getProducts);
                return {
                    status: 'success',
                    payload: products
                }
            } catch (error) {
                showError(error);
            }
        }
    }
    addProduct = async (product) => {
        if (fs.existsSync(productsPath)) {
            try {
                const getProducts = await fs.promises.readFile(productsPath, 'utf-8');
                const products = JSON.parse(getProducts);
                if (products.length === 0) {
                    product.id = 1;
                    products.push(product);
                    await fs.promises.writeFile(productsPath, JSON.stringify(products, null, 2));
                    return {
                        status: "succes",
                        msg: "1st prod added"
                    }
                }
                
                product.id = products[products.length - 1].id + 1;
                products.push(product);
                await fs.promises.writeFile(productsPath, JSON.stringify(products, null, 2));
                return {
                    status: "success",
                    msg: "Product added!"
                }
            } catch (error) {
                showError(error);
            }
        } else {
            try {
                product.id = 1;
                await fs.promises.writeFile(productsPath, JSON.stringify([product], null, 2));
                return {
                    status: "success",
                    msg: "Array Created!"
                }
            } catch (error) {
                showError(error);
            }
        }
    }
    deleteById = async (id) => {
        if (!id) {
            return {
                status: "error",
                error: "ID missing"
            }
        }
        if (isNaN(id)) {
            return {
                status: "error",
                error: "ID is not a number"
            }
        }
        const getProducts = await fs.promises.readFile(productsPath, 'utf-8');
        const products = JSON.parse(getProducts);
        const deletedProduct = products.filter(x => x.id !== parseInt(id));
        await fs.promises.writeFile(productsPath, JSON.stringify(deletedProduct, null, 2));
    }
    updateProduct = async (id, updatedProduct) => {
        if (!id) {
            return {
                status: "error",
                error: "ID missing"
            }
        }
        if (isNaN(id)) {
            return {
                status: "error",
                error: "ID is not a number"
            }
        }
        if (fs.existsSync(productsPath)) {
            try {
                const getProducts = await fs.promises.readFile(productsPath, 'utf-8');
                const products = JSON.parse(getProducts);
                const newProducts = products.map(prod => {
                    if (prod.id === parseInt(id)) {
                        updatedProduct.id = id;
                        return updatedProduct
                    } else {
                        return prod
                    }
                })
                await fs.promises.writeFile(productsPath, JSON.stringify(newProducts, null, 2));
                return {
                    status: "success",
                    msg: "Product updated"
                }
            } catch (error) {
                showError(error);
            }
        }
    }
    findProductById = async (id) => {
        if (isNaN(id))
            return {
                status: "error",
                error: "ID must be a number"
            }

        const getProducts = await fs.promises.readFile(productsPath, 'utf-8');
        const products = JSON.parse(getProducts);
        const productFound = products.find(prod => prod.id === parseInt(id));
        if (productFound) return {
            status: "succes",
            msg: productFound
        }
    }
}

module.exports = ProductsManager;