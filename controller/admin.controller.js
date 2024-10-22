module.exports ={
    adminPage : async function(req, res){
        res.status(200).render('./Admin/dashboard.ejs')
    },
    
}