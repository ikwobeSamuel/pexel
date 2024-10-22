// routes/productRoutes.js
const express = require('express');
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const router = express.Router();
const ProductController = require('../controller/productController');
const middleware = require('../middlewares/middleware');

// Set up Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to file name
    }
  });
  
  // File filter to only allow image files
  const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/; // Allowed extensions
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only .png, .jpg, and .jpeg format allowed!'));
    }
  };
  
  // Set limits for file size (e.g., 2 MB limit)
  const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2 MB
    fileFilter: fileFilter
  });
  
//   const upload = multer({ storage: storage });
  
  // Create the uploads directory if it doesn't exist
  const dir = path.join(__dirname, '../public/uploads');

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }


router.route('/create-product')
.get(middleware.checkUser, ProductController.viewProduct)
.post((req, res, next) => {
    // console.log(req.body)
    upload.single('image')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred during the file upload (e.g., file too large)
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
        }
        return res.status(400).json({ message: `Multer error: ${err.message}` });
      } else if (err) {
        // An unknown error occurred during the file upload
        return res.status(400).json({ message: `Error: ${err.message}` });
      }
  
      // If no errors occurred, continue processing the image
      next();
    });
  },  ProductController.createProduct);

module.exports = router;
