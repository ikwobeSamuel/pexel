
// Change  password

module.exports ={
    getChangePassword : async function(req, res){
        res.status(200).send('Change password')
    },
    
    changePasswordPost: async function(req, res){
        try {
            
        } catch (error) {
            res.status(400).json({
                status: false,
                message: error.message
            })
        }
    }
}

exports.postResetPassword = async(req, res) => {
  try {
    console.log(req.body)
    let {error, value} = resetPasww.validate(req.body);
    if (error) {
        let err = handleError(error)
        res.status(201).json({ "err": err.message })
    } else {
        let username = req.user.username;
        const userInfo = await findUser(username, value.old_password);
        console.log(userInfo)
        let upddata ={
          password: await bcrypt.hash(value.password, saltRounds),
        }
        userInfo.update(upddata, {new:true})
        res.status(200).json({msg: "Done"})
    }
   
  } catch (error) {
    console.log(error)
    let err = handleError(error)
    res.status(201).json({ "err": err.message })
  }
}