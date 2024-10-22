module.exports = {

    homePageGet : async function(req, res){
        res.render('index.ejs')
    },

    aboutUsPage: async function (req, res){
        res.send("hello this is about page")
    },
    
    contactUsPage: async function(req, res){
        res.send("hello this is contact us page")
    },

    viewEmployers: async function(req, res){
        res.send('hello this is view employers page')
    }
}