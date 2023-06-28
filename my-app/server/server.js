const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const logreg = require("./router/log-reg");
const account = require("./router/account");
const invites = require("./router/invite");
const path = require("path");

let session = require('express-session');
const db_url = "mongodb+srv://agow220:159753Crr@cluster0.5s0caby.mongodb.net/?retryWrites=true&w=majority";

app.use(express.static("public"));

app.use(express.static(path.join(__dirname, "..", "dist")));

app.use(session({    
    cookie: {
        httpOnly: true
    },
    rolling: true,
    resave: false,
    saveUninitialized: true,
    secret: '~~~~~'
  }));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

//router
app.use('/', logreg)
app.use('/', account)
app.use('/', invites)
//end router

app.get('', (req, res) => {
    res.render('user-login',{errors: ""});
})

app.get('/test',(req, res, next) => {
    console.log(2)
    res.sendFile(path.join(__dirname, "..", "dist", "account.html"));
});

async function startApp(){
    try{
        await mongoose.connect(db_url, {
          useUnifiedTopology: true,
          useNewUrlParser:true
        })
        app.listen(port, () => {console.log("server is working")})
    } catch(e) {
        console.log("some error appearead" + e)
    }
}
  
startApp()