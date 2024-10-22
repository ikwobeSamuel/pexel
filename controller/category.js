const category = require("../class/category.service")
const sub_category = require("../class/sub_category.service")


module.exports = {

    viewCategory: async function(req, res){
        const responses = await category.retrieve(req.body)
        res.status(200).render('./Admin/category.ejs',{
            responses
        })
    },



    postCategory: async function(req, res) {
        try {
            const responses = await category.create(req.body)
            res.status(201).json(responses)
        } catch (error) {
            res.status(400).json({
                status: false,
                message: error.message
            })
        }
    },
    viewSubCategory: async function(req, res){
        const responses = await sub_category.retrieve(req.body)
        res.status(200).render('./Admin/subCategory.ejs',{
            ...responses
        })

    },



    postSubCategory: async function (req, res) {

        try {
            const responses = await sub_category.create(req.body);
            res.status(201).json(responses)

        } catch (error) {
            res.status(400).json({
                status: false,
                message: error.message
            })
        }
    }
}