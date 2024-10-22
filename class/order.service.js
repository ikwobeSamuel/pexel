const EventEmitter = require("events");


const emitter =  new EventEmitter()

require('../events/logging')(emitter)
require('../events/validation/subCategoryValidation')(emitter)

class SubCategory{
    constructor (){
        
    }

    async create (body){
        try {
            emitter.emit("beforeCreateSubCategory", body)

            await this.sub_category.create({
                category_id: body.category,
                sub_category_name: body.sub_category
            })
            return {
                status: true,
                message: "Successfully created"
            }
        } catch (error) {
            console.log(error)
            emitter.emit("ValidationError", error)
            throw error
        }
    }
    
    async retrieve(query) {
        const category = await this.category.findAll({raw: true});
        const subCategories = await this.sub_category.findAll({
            include: [{
                model: this.category,
                  // as: 'projects'
                // attributes:['customerName', 'phoneNumber']
            }],
            raw: true
        })

        // console.log(subCategories)

        return {
            category,
            subCategories
        }
    }

    async getSubCategories(id) {
        return await this.sub_category.findAll({
            where: {
                category_id: id
            },
            raw: true
        })
    }
}
module.exports = new SubCategory()