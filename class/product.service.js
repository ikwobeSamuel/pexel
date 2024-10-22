const EventEmitter = require('events')
const fs = require('fs')
const Jimp = require('jimp')
const path = require('path')
const Category = require('../model/category');
const Product = require('../model/productTable/productModel');
const Sub_categories = require('../model/sub_category');



const emitter = new EventEmitter()

require('../events/logging')(emitter)
require('../events/validation/productValidation')(emitter)




class ProductClass {
  constructor() {
    this.category = Category
    this.subCategories = Sub_categories
    this.productData = Product
  }
  async create(req, userId) {
    console.log(req.body); // Event to validate input
    try {
      const data = req.body;
      emitter.emit("beforeCreateProduct", data);

      // Check if a file was uploaded
      if (!req.file) {
        throw new Error('File upload is required.');
      }

      const outputPath = path.join(__dirname, '../public/uploads');
      const imagePath = req.file.path;

      // Process the image
      await this.processImage(imagePath, req.file.filename, outputPath);

      const payload = {
        title: data.title,
        description: data.description,
        type: data.type,
        feature_product: data.feature_product,
        price: data.price,
        discount_price: data.discount_price,
        size: data.size,
        color: data.color,
        weight: data.weight,
        Qty: data.Qty,
        category_id: data.category_id,
        sub_category_id: data.sub_category_id,
        shipping: data.shipping,
        barcode: data.barcode,
        tag: data.tag,
        user_id: userId,
        image: `/uploads/${req.file.filename}` // Ensure the path is correct
      };

      console.log(payload);
      await this.productData.create(payload);

      return {
        status: true,
        message: "Success"
      };

    } catch (error) {
      console.error('Error during product creation:', error.message || error);
      if (req.file && req.file.path) {
        await this.cleanupFile(req.file.path);
      }
      emitter.emit("CreationError", error);
      throw error;
    }
  }

  async processImage(imagePath, filename, outputPath) {
    try {
      const image = await Jimp.read(imagePath);
      const IMAGE_WIDTH = 612;
      const IMAGE_HEIGHT = 383;
      const IMAGE_QUALITY = 80;

      await image
        .resize(IMAGE_WIDTH, IMAGE_HEIGHT)
        .quality(IMAGE_QUALITY)
        .greyscale()
        .writeAsync(path.join(outputPath, filename)); // Use writeAsync for better handling
    } catch (error) {
      console.error('Error processing image:', error);
      throw error; // Propagate the error
    }
  }

  async cleanupFile(filePath) {
    try {
      await fs.promises.stat(filePath); // Check if file exists
      await fs.promises.unlink(filePath); // Delete the file
      console.log('File deleted successfully');
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log('File does not exist, nothing to delete.');
      } else {
        console.error(`Error deleting the file: ${err}`);
      }
    }
  }


  async retrieve(query) {
    const category = await this.category.findAll({ raw: true });
    const subCategories = await this.subCategories.findAll({ raw: true })
    const productCreate = await this.productData.findAll({
      include: [{
        model: this.category,
        model: this.subCategories
        // attributes:['customerName', 'phoneNumber']
      }],
      raw: true
    })

    return {
      category,
      subCategories,
      productCreate
    }
  }
}

module.exports = new ProductClass();
