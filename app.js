const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const cors = require("cors");
const { Sequelize, QueryTypes } = require("sequelize");


const app = express();
const Op = Sequelize.Op;

// IMPORTING ROUTER
const homeRoutes = require('./routes/home.routes');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes')
const categoryRoutes = require('./routes/category.routes')
const productRoutes = require('./routes/product.routes')

app.use(bodyParser.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));


app.use(cors());
app.use(cookieParser());

//session setup
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "kkjkkljkjjl",
    resave: false,
    saveUninitialized: true,
    // store: sessionStore,
    cookie: {
      maxAge: 1 * 24 * 60 * 60,
    },
  })
);

app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});



// app.route("*").get(function (req, res, next) {
//   // console.log(req.user)
//   res.locals.link = req.originalUrl.split("?")[0];
//   res.locals.cart = req.session.cart;
//   res.locals.copyright = currentYear;
//   next();
// });

// static files
app.use(express.static("./public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//setting app to render html path
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



// Defining ROutes 
app.use( homeRoutes)
app.use( authRoutes)
app.use('/admin',adminRoutes)
app.use('/add', categoryRoutes)
app.use('/setup', productRoutes)
module.exports = app;
