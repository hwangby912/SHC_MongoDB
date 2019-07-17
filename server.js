const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const contactFormService = require('./service/contactFormService');
const medicalFormService = require('./service/medicalFormService');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var formidable = require('formidable');
var fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/public", "/html")));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('SHC_MongoDB'));
app.use(session({
  name: 'HBY_SID',
  timeout: 30,
  resave: false,
  saveUninitialized: false,
  secret: 'SHC_MongoDB',
  cookie: {
    httpOnly: true,
    secure: false
  }
}));



app.post('/contactForm', function (req, res) {

  var name = req.body.name;
  var id = req.body.id;
  var pw = req.body.pw;
  var message = req.body.message;
  console.log(name, id, pw, message);
  if (name && id && pw) {
    contactFormService.contactFormInsertOne(res, name, id, pw, message); // 해당 함수 갔다가 밑의 줄을 비동기적으로 수행함
  } else {
    res.send('Failure');
  }
});

app.post('/medicalForm', function (req, res) {

  var name = req.body.name;
  var ssn = req.body.ssn;
  var addr = req.body.addr;
  var email = req.body.email;
  var visitDate = req.body.visitDate;
  var disease = req.body.disease;
  var diseaseCode = req.body.diseaseCode;
  var content = req.body.content;
  console.log(name, ssn, addr, email, visitDate, disease, diseaseCode, content);
  if (name && ssn) {
    medicalFormService.medicalFormInsertOne(res, name, ssn, addr, email, visitDate, disease, diseaseCode, content);
    
  } else {
    res.send('Failure');
  }

});

app.get('/medical_report_req', function (req, res) {
  console.log(req.session);
  if (req.session.loginedID) {
    res.sendFile(path.join(__dirname + '/public/html/medical_report.html'));
  } else {
    res.sendFile(path.join(__dirname + '/public/html/login.html'));
  }
});

app.post('/login', function (req, res) {
  var id = req.body.id;
  var pw = req.body.pw;
  console.log(id, pw);
  if (id && pw) {
    contactFormService.login(req, res, id, pw);
  } else {
    res.send('id와 pw를 입력하세요');
  }
});

app.post('/fileupload', function (req, res) {
  console.log("==========");
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload.path;
    var newpath = './' + files.filetoupload.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.write('File uploaded and moved!');
      res.end();
    });
  });
});


app.listen(7777, function () {
  console.log("7777 server ready...");
});
