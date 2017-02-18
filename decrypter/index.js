#!/usr/bin/env node
var CryptoJS = require('./libs/CryptoJS.js');
var base32 = require('./libs/base32.js');
var fs = require('fs');

var args = process.argv.slice(2);

var secretKey = args[0];
var filenameInput = args[1];
var filenameOutput = args[2];


var decodePassword = function(data, pwd) {
    return CryptoJS.AES.decrypt(base32.decode(data), pwd).toString(CryptoJS.enc.Utf8);
}

var work = function(data, secretKey){
  data.groups.forEach(function(group,gI){
    console.log("decrypting group ' %s ''", group.name);

    var groupPassword = decodePassword(group.passwordCrypted, secretKey);

    if(group.passwords){
      group.passwords = group.passwords.map(function(password){
          password.plainPassword = decodePassword(password.cryptedPassword, groupPassword);

          return password;
      });
    }

    if(group.folders){
      group.folders = group.folders.map(function(folder){
        if(folder.passwords){
          folder.passwords.map(function(password){
            password.plainPassword = decodePassword(password.cryptedPassword, groupPassword);

            return password;
          })
        }

        return folder;
      });
    }

  });

  var result = JSON.stringify(data);

  fs.writeFile(filenameOutput, result, function(err) {
    if (err) {
      console.error("Error writing output file");
      process.exit(3);
    }

    console.log("* * * * * * * *");
    console.log("Completed!");
});
}



fs.readFile(filenameInput, 'utf8', function (err,file) {
  if (err) {
    console.error("Error reading input file");
    process.exit(2);
  }

  var d = JSON.parse(file);

  work(d.response, secretKey );
});
