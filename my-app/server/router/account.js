let express = require('express');
let router = express.Router();
let userForm = require("../Schemes/user-format")
let session = require('express-session');
let path = require('path');

function account_info (data) {
    let promise = new Promise((suc, fai)=>{
        try {
            userForm.findOne({ username : data }).then(data_user =>{
                data_ = data_user;
                suc(data_);
            })
    
        } catch (e) {

        } 
    })
    return promise
}

router.get('/accountpage', function(req,res){ 
    const userDB = req.session.username;
    if (!userDB){
        res.render('user-login',{errors: "Ваша сессия истекла"});
        return;
    } else {
        account_info(userDB).then(_data => {
            res.render('user-page', {data: _data, module: undefined});
        });
    }
});

router.get('/accountpage/workers', async function(req,res){ 
    try {
        const userDB = req.session.username;
        if (userDB){
            account_info(userDB).then(_data => {
                res.send(_data)
            });
        } else {
            res.sendStatus(220)
        }
    } catch (e) {
        res.sendStatus(220)
    }

});

//access_token=pk.eyJ1IjoiY2FydGlvbG9neSIsImEiOiJjbGplc2R2dDAydHg2M2RxejRrb3o5aGlnIn0.-9rq0fxuV0b-1l_yQO4OJA

module.exports = router