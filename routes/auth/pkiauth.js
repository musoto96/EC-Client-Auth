const express = require('express');
const fs = require('fs');
const ECKey = require('ec-key');
const { exec } = require('child_process');
var multer = require('multer');

const router = express.Router();


// Challenge document generation
router.get('/', (req, res) => {
   const challengeDoc = exec(`bash ${__dirname}/pki/challenge-document.sh`, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err !== null) {
      console.log(err);
    };
  });

  challengeDoc.on('exit', (code) => {
    console.log(code);
    if (code === 0) {
      res.send(fs.readFileSync(`${__dirname}/pki/document.data`, {encoding: 'base64'}));
    } else if (code === 1) {
      console.log('Challenge-document creation failed')
    }
  });
});


// Signature verification
router.post('/', multer().single('sig'), (req, res) => {
  if (req.file === null) {
    return res.status(400).json({msg: 'No signature uploaded'});
  };

  const sig = req.body.sig;
  console.log(sig);

  const key = new ECKey(fs.readFileSync(`${__dirname}/pki/public.pem`), 'pem');
  console.log(key);

  const doc = fs.readFileSync(`${__dirname}/pki/document.data`, {encoding: 'base64'});
  console.log(doc);

  const pass = key.createVerify('SHA512').update(doc).verify(sig, 'base64');
  console.log(pass);

  if (pass) {
    res.send('Challenge passed');
  } else {
    res.send('Challenge failed')
  };

  //let challenge = exec(`bash ${__dirname}/pki/challenge.sh ${sig}`, (err, stdout, stderr) => {
    //console.log(stdout);
    //console.log(stderr);
    //if (err !== null) {
      //console.log(err);
    //};
  //});

  //challenge.on('exit', (code) => {
    //console.log(code);
    //if (code === 0) {
      //res.redirect('http://192.168.1.100:8567');
    //} else if (code === 1) {
      //console.log('Authentication failed')
    //}
  //});

})

module.exports = router;
