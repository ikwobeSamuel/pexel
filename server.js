const path = require('path')
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });





const app = require("./app");



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`App running at port http://localhost:${PORT}`);
});

