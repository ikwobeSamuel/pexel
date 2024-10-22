const EventEmitter = require("events");
const category = require('../model/category')


const emitter =  new EventEmitter()

require('../events/logging')(emitter)
require('../events/validation/categoryValidation')(emitter)

class ProCategory{
    constructor (){
        this.category = category
    }

    async create (body){
        try {
            emitter.emit("beforeCreateCategory", body)

            await this.category.create({
                category_name: body.category
            })
            return {
                status: true,
                message: "Successfully created"
            }
        } catch (error) {
            console.log(error)
            emitter.emit("CreationError", error)
            throw error
        }
    }
    
    async retrieve(query) {
        return await this.category.findAll({ raw: true })
    }
}
module.exports = new ProCategory()