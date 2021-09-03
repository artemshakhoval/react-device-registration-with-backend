const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3001;

const app = express();

app.use(bodyParser.json());
app.use(cors());

var installedId = 1;
var installedErrorsId = 1;
const devices = [];
const errors = [];

const validator = {
  id: (str) => {
    let regex = /^(?![A-Za-z]+$)[0-9A-Za-z]+$/;
    if (!regex.test(str)) {
      return "ID must must contains from numbers and letters";
    } else {
      return false;
    }
  },
  olt: (str) => {
    let regex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})[.](?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})[.](?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})[.](?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2}))$/;
    if (!regex.test(str)) {
      return "OLT has match only numbers and dots";
    } else {
      return false;
    }
  },
  serial_number: (str) => {
    let regex = /^(?![A-Za-z]+$)[0-9A-Za-z]+$/;
    if (!regex.test(str)) {
      return "Serial number must contains from numbers and letters";
    } else {
      return false;
    }
  },
  slot: (str) => {
    let regex = /^[0-9]+$/;
    if (!regex.test(str)) {
      return "Slot must contain only numbers";
    } else {
      return false;
    }
  },
  port: (str) => {
    let regex = /^[0-9]+$/;
    if (!regex.test(str)) {
      return "Port must contain only numbers";
    } else {
      return false;
    }
  },
};

app.post("/getRegisterInfo", (req, res) => {
  const { body } = req;

  const validations = {};

  Object.keys(body).map((name) => {
    const inputValue = body[name];
    const isInvalid = validator[name](inputValue);
    console.log(isInvalid);

    if (isInvalid) {
      validations[name] = {
        isValid: true,
        message: isInvalid,
      };
    }
  });

  const containsInvalids = Object.keys(validations).length;

  if (containsInvalids) {
    // res.send(validations, 400)
    res.status(400).send(validations);
    errors.push({
      index: installedErrorsId++,
      ...validations,
      createdAt: {
        message: new Date(),
      },
    });
  } else {
    devices.push({
      index: installedId++,
      ...body,
      createdAt: new Date(),
    });
    // res.send(devices, 200)
    res.status(200).send(devices);
  }
});

app.listen(PORT, () => {
  console.log(`We are on ${PORT}`);
});
