'use strict';
const createTemplate = require("busbud-passbook");
const fs = require('fs');

var template = createTemplate("coupon", {
  passTypeIdentifier: "pass.com.thefork.booking",
  teamIdentifier:     "422AQERGQ7",
  backgroundColor:   "rgb(255,255,255)",
  organizationName: "TheFork"
});

template.loadImagesFrom('./config');

template.keys("./config/keys", "toto");

var pass = template.createPass({
  serialNumber:  "123456",
  description:   "20% off"
});


var file = fs.createWriteStream("mypass.pkpass");

pass.on("error", function(error) {
  console.log(error);
  process.exit(1);
});

pass.on("finish", function(error) {
  console.log(error);
  process.exit(1);
});

pass.pipe(file);
