let express = require('express');
let router = express.Router();
let userForm = require("../Schemes/user-format")
let session = require('express-session');
let invitesForm = require("../Schemes/invite_code-format")
let sa = require('superagent');

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


function checkUniqueRegister(data,res,req){
    let promise = new Promise((suc, fai)=>{
        try {
            userForm.findOne({ username : data.username }).then(data_user =>{
                if (!data_user){
                    invitesForm.findOne({"invite_code": data.userinvite}).then(data_invite =>{
                        if (data_invite.current_users < data_invite.max_users){
                            let ammount = data_invite.current_users + 1;
                            invitesForm.updateOne({"invite_code": data.userinvite}, {$set: {current_users: ammount}} ).then((obj) => {

                            })
                            userForm.create(data).then(()=>{
                                account_info(data.username).then(_data => {
                                    res.render('user-page', {data: _data, module: undefined});
                                });
                            })

                        } else {
                            res.render('../views/user-register',{errors: "Превышенно максимальное количество пользователей"});
                        }
                    })
                    suc()
                } else {
                    res.render('../views/user-register',{errors: "Юзернейм занят"});
                    fai()
                }
            })
        } catch (e) {

        } 
    })
    return promise
}

function checkUniqueLogin(data, res){
    let promise = new Promise((suc, fai)=>{
        userForm.findOne({ username : data.username}).then(data_user =>{
            if(data_user === null){
                res.render('../views/user-login',{errors: "Мы не смогли найти такого пользователя"});
                fai()
            } else if (data.password == data_user.password) {
                res.redirect("/accountpage")
                suc()    
            } else if (data.password != data_user.password) {
                res.render('../views/user-login',{errors: "Неправильный пароль"});
                fai()
            }
        });     
    })
    return promise
}

async function inviteCheck(data) {
    let ans = true;
    await sa.post('http://localhost:3000/invite_codes/check')
    .send({"invite_code": data})
    .then(res => {
        if (res.status == 200) {
            ans = true;
        } else {
            ans = false;
        }
    })
    return ans;
}

router.use(express.json());



router.post('/register-user', async (req, res) => {
    const {username, password, userinvite, lname,fname} = req.body
    const userstatus = "regular_worker"

    if (await inviteCheck(userinvite)){
        checkUniqueRegister({username,password,fname, lname, userstatus,userinvite},res,req).then(()=>{let newSession = req.session;newSession.username = username; newSession.userinvite = userinvite; req.session.save();}, (err)=>{})
    } else {
        res.render('../views/user-register',{errors: "Инвайт-Код не действителен"});
    }
})

router.post('/login-user', async (req, res) => {
    const {username,password} = req.body
    checkUniqueLogin({username, password},res).then(()=>{let newSession = req.session;newSession.username = username;  req.session.save();}, ()=>{})
})

router.get('/logout-user', async (req,res) => { 
    req.session.destroy();
    res.sendStatus(200)
});

// Link transfering forms
router.get('/register-transfer', async (req, res) => {
    res.render('user-register', {errors: ""} );
})

router.get('/login-transfer', async (req, res) => {
    res.render('user-login',{errors: ""});
})
// end of link transfering
module.exports = router