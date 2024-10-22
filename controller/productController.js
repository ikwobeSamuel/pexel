const productService = require("../class/product.service");



class ProductController {

    static async createProduct(req, res) {
        try {
            console.log(req.body)
            const product = await productService.create(req.body);
            res.status(201).json(product);
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message });
        }
    }
    static async viewProduct(req, res) {
        const responses = await productService.retrieve(req.body)
        res.status(200).render('./Admin/productSetup.ejs', {
            ...responses
        });
    }
}
module.exports = ProductController;
