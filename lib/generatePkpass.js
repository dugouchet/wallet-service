'use strict';
const createTemplate = require("busbud-passbook");
const fs = require('fs');
const moment = require('moment');

const generatePkpass = function(payload) {
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
      value: payload.restaurant.name
    },
  ];

  const secondaryFields = [
    {
      label: "Date",
      key: "booking_date",
      value: moment(payload.mealDate).format('DD/MM/YYYY')
    },
    {
      label: "Heure",
      key: "booking_hour",
      value: moment(payload.mealDate).format('HH:mm')
    },
    {
      key: "booking_pax",
      label: "Pers.",
      value: payload.partySize
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

  // TODO: date format with locale
  const headerFields = [
    {
      label: "Reservation le :",
      key: "reservation",
      value: moment(payload.mealDate).format('DD/MM/YYYY hh:mm')
    }
  ];

  const auxiliaryFields = [
    {
      key: "customer_name",
      label: "Au nom de",
      value: [payload.customer.firstName, payload.customer.lastName].join(' ')
    }
  ];

  template.keys("./config/keys", "toto");
  template.loadImagesFrom('./config');

  var pass = template.createPass({
    serialNumber:  "123456",
    description:   " "
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

}

module.exports =generatePkpass;

