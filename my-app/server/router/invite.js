let express = require('express');
let router = express.Router();
let invitesForm = require("../Schemes/invite_code-format")

router.post('/invite_codes/add', function (req, res){
    const {invite_code, company_name, max_users} = req.body;
    try {
        invitesForm.findOne({ invite_code : invite_code }).then(invite_data =>{
            if (!invite_data){
                invitesForm.create({
                    "invite_code" : invite_code,
                    "company_name" : company_name,
                    "max_users" : max_users,
                    "current_users" : 0
                })
                res.send("Success")
            } else {
                res.send("Busy")
            }
        })
    } catch (e) {
        res.send("Busy")
    } 
})

router.post('/invite_codes/check', function (req, res){
    const {invite_code} = req.body;
    try {
        invitesForm.findOne({ invite_code : invite_code }).then(invite_data =>{
            if (invite_data){
                res.sendStatus(200)
            } else {
                res.sendStatus(220)
            }
        })
    } catch (e) {
        res.sendStatus(220)
    } 
})

module.exports = router