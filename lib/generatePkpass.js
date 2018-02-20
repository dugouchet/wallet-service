'use strict';
const createTemplate = require("busbud-passbook");
const fs = require('fs');

var template = createTemplate("generic", {
  passTypeIdentifier: "pass.com.thefork.booking",
  teamIdentifier:     "422AQERGQ7",
  foregroundColor : "rgb(255, 255, 255)",
  backgroundColor : "rgb(88, 148, 66)",
  organizationName: "TheFork",
});


const primaryFields = [
  {
    key: "restaurant",
    label: "Restaurant",
    value: "Goumard"
  },
];

const secondaryFields = [
  {
    label: "Date",
    key: "booking_date",
    value: "17/12/2017"
  },
  {
    label: "Heure",
    key: "booking_hour",
    value: "13h"
  },
  {
    key: "booking_pax",
    label: "Pers.",
    value: "3"
  }
];

const backFields = [
  {
    key: "passport",
    label: "PASSPORT",
    value: "Canadian/Canadien"
  },
  {
    key: "residence",
    label: "RESIDENCE",
    value: "999 Infinite Loop, Apartment 42, Cupertino CA"
  }
];

const headerFields = [
  {
    label: "Reservation le :",
    key: "reservation",
    value: "17/12/2017 13:00"
  }
];

const auxiliaryFields = [
  {
    key: "customer_name",
    label: "Au nom de",
    value: "John Appleseed"
  }
];

template.keys("./config/keys", "toto");
template.loadImagesFrom('./config');

var pass = template.createPass({
  serialNumber:  "123456",
  description:   "20% off"
});

primaryFields.forEach((field) => pass.primaryFields.add(field));
secondaryFields.forEach((field) => pass.secondaryFields.add(field));
backFields.forEach((field) => pass.backFields.add(field));
headerFields.forEach((field) => pass.headerFields.add(field));
auxiliaryFields.forEach((field) => pass.auxiliaryFields.add(field));

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
