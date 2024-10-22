const EventEmitter = require('events');
const bcrypt = require("bcryptjs")
const salt = bcrypt.genSaltSync(10);
const Users = require("../model/user/userModel");

const  emitter = new EventEmitter()


//registerer event listener 
require('../events/logging')(emitter)
require('../events/notifications')(emitter)
require('../events/validation/userValidation')(emitter)


class UserAccount {
    constructor(){
        this.users = Users
    }
    async createAccount(value) {
        try {
             // Trigger pre-save validation and logging
             // logging
             // validation
            emitter.emit('beforeCreateUser', value);

            const user = await this.users.create({
                group_id: 101,
                name: `${value.surname} ${value.middlename ? value.middlename : "" } ${value.firstname}`,
                surname: value.surname,
                firstname: value.firstname,
                middlename: value.middlename,
                username: value.email,
                password: await bcrypt.hash(value.password, salt),
                email: value.email,
                user_phone: value.user_phone,
            })

            // Trigger post-save actions like logging and notifications
            emitter.emit('afterCreateUser', user);
            return user

        } catch (error) {
            console.log(error)
            emitter.emit('userCreationError', error);
            throw error;
        }
    }
    
}
module.exports = new UserAccount();
// module.exports = UserAccount