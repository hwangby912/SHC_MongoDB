const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const contactFormService=require('./service/contactFormService');
const medicalReportForm = require('./service/medicalReportForm');

app.use(express.static(path.join(__dirname,"/public")));
app.use(bodyParser.json());

app.post('/contactForm', function (req, res) {
    
    var name=req.body.name;
    var email=req.body.email;
    var phone=req.body.phone;
    var message=req.body.message;
    console.log(name,email,phone,message);
    if(name && email && phone && message){
        contactFormService.contactFormInsertOne(name,email,phone,message);
        res.send('회원가입 되셧습니다. ');
    }else{
        res.send('Failure');
    }
});

app.post('/medicalReportForm', (req, res) => {
    var name = req.body.name;
    var iden = req.body.iden;
    var addr = req.body.addr;
    var email = req.body.email;
    var date = req.body.date;
    var bodyPart = req.body.bodyPart;
    var disName = req.body.disName;
    var message = req.body.message;
    if(name && iden && addr && email && date && bodyPart && disName && message) {
        medicalReportForm
    }
});

app.listen(7777,function(){
    console.log("7777 server ready...");
});

