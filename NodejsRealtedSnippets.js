//=========================How to Remove/validate array of objects===================================================
//TEST DATA 
var a = [
  {
      "Priority": "1",
      "Relationship": "Other",
      "Language": "English",
      "LegalName": "Micheal  Jackson",
      "EmailAddress1": null,
      "EmailAddress2": null,
      "PhoneNumber1": "+1 (404) 555-1234",
      "PhoneNumber2": null,
      "PhoneNumber3": null
  },
  {
      "Priority": "2",
      "Relationship": "Sibling",
      "Language": "American Sign Language",
      "LegalName": "Mariah  Carey",
      "EmailAddress1": null,
      "EmailAddress2": null,
      "PhoneNumber1": "+382 (777) 555-1212",
      "PhoneNumber2": null,
      "PhoneNumber3": "+47 (996) 555-1212"
  },
  {
      "Priority": "3",
      "Relationship": "Ex-Spouse",
      "Language": "French",
      "LegalName": "Bugs  Bunny",
      "EmailAddress1": "bugbunny@fakeemail.com",
      "EmailAddress2": null,
      "PhoneNumber1": "+61 (555) 555-1212",
      "PhoneNumber2": null,
      "PhoneNumber3": null
  }
]
a.filter(function(item) {
  Object.keys(item).forEach(
    key =>
      (item[key] == null || item[key] == undefined || item[key] == "") &&
      delete item[key]
  );
});
console.log(a); // the new array of object will be null free i.e key which have null will be deleted 

//=============================URL LOGIC===================================================================================
// URL LINK ='<link text="READ" linktype="external" url="https://www.facebook.com/" anchor="" target="" />';
var url = ``; 
var Read = url ? url.split('url="')[1].split('/" anchor')[0] : "";
console.log(Read);

//==============================Object Manipulation========================================================================
//HOW TO CONVERT A STRING TO ARRAY OF OBJECT
// var String = "single=2000&double=4000&three=%20"
//  CONVERT TO ARRAY OF OBJECT LIKE THIS
// arrObj = [{type:'single',price:2000},{type:'double',price:4000},{type:'three',price:%20}]

let item = String.split('&'); 
let arrObj = Object.assign(item.map(d => ({ type: d.split("=")[0], price: d.split("=")[1] })) 
);


//==============================Code for Delete Image path link in MongoDb ================================================
router.delete("/dealDelete/:deal_id", (req, res, net) => {
  //we are finding the request id and deleting from the collections
  dealsinfos.findOne({ _id: req.params.deal_id }, function(err, deal) {
    if (err) {
      return res.status(500).json({ msg: "remove error" });
    }
    // LOOP LOGIC
    //If image parameter has arrays of image Path  
    var fs = require("fs");
    for (let i = 0; i < deal.image.length; i++) {
      var ret = deal.image[i].replace(
        "https://eenpnode-dev.azurewebsites.net",
        ""
      );
      var path = "./public" + ret;
      console.log(path);
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
        console.log("Files Deleted");
      } else {
        return res.status(404).json("path Error");
      }
    }
    dealsinfos.findByIdAndDelete({ _id: deal._id }, function(err) {
      if (err) {
        res.status(500).json({ msg: "Delete error" });
      }
      res.status(200).json({ msg: "Data removed success" });
    });
  });

  // res.json({ msg: deal });
});
// If image parameter has only one value which is stored in array 

//     // If the Id is matched we find the the link and mutate it
//     var ret = deal.image[0].replace(
//       "https://eenpnode-dev.azurewebsites.net",
//       ""
//     );
//     console.log(ret); // check the console log
//     var fs = require("fs"); // requiring the fs core module
//     var path = "./public" + ret;
//     if (fs.existsSync(path)) {
//       fs.unlinkSync(path); // removing the matched file from the directory
//     } else {
//       return res.status(404).json({ msg: "path could not found the server" });
//     }
//     console.log("File deleted");
//     //Finally we are deleting from the collections
//     dealsinfos.findByIdAndDelete({ _id: deal._id }, function(err) {
//       if (err) {
//         res.status(400).json({ msg: "Delete error" });
//       }
//       res.status(200).json({ msg: "Data removed success" });
//     });
//   });
//});


//==============================code For validating objects in a array using JOI Npm=======================================

//----------------------------------------JOI.js---------------------------------------------------------------------------

var questionAnswerData = [
  {
    questionName: "What does a pedometer measure?",
    choiceA: "choiceA",
    choiceB: "Paddleboarding",
    choiceC: "Biking",
    choiceD: "Running",
    answer: "B"
  },
  {
    questionName: "What does a pedometer measure?",
    choiceA: "Foot size",
    choiceB: "Weight",
    choiceC: "Steps",
    choiceD: "Shoe odor",
    answer: "C"
  }
];

var Joi = require("joi");
var service = Joi.object().keys({
  questionName: Joi.string().required(),
  choiceA: Joi.string().required(),
  choiceB: Joi.string().required(),
  choiceC: Joi.string().required(),
  choiceD: Joi.string().required(),
  answer: Joi.string().required()
});

var services = Joi.array().items(service);

var test = Joi.validate(questionAnswerData, services, function(err, val) {
  //err is equal to Null then everything is right
  if (err !== null) {
    console.log("Something is Not Right");
  } else {
    console.log("All is Well");
  }
});


//==============================code For Multiple Image Upload using Multer================================================

//----------------------------------MulterRoute.js-------------------------------------------------------------------------------
var express = require('express');
var router = express.Router();
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
       // console.log(file);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router

    .post('/UPLOAD',upload.array('Image',3),function (req,res,next) {
            gameSettingSvc.uploadAds(req,function (result) {
                res.json(result);
            });

//----------------------------------MulterService.js------------------------------------------------------------------------------
exports.uploadAds = function(req,cb) {

  var catData = [];
  var adFile = req.files;

  catData.push({
      full:adFile[0].filename,
      half:adFile[1].filename,
      ban:adFile[2].filename
  });

  console.log(catData);


  return cb({'msg':adFile})


};


//=======================Code For getting the user data using two diffrent Timestamp in gameplay(KWIZFUN-REQ) ==============================

//-----------------------getuserDataFromGameplay.js----------------------------------------------------------------

exports.userData = function(req, cb) {
  GamePlay.find({
    createdDate: { $gte: new Date(2017, 10, 19), $lte: new Date(2018, 03, 24) }
  })
    .deepPopulate("event team team.teamCaptain")
    .exec(function(err, data) {
      var array = [];

      data.forEach(function(arr) {
        array.push({
          UserName: arr.team.teamCaptain.userName,
          FirstName: arr.team.teamCaptain.firstName,
          LastName: arr.team.teamCaptain.lastName,
          EventTitle: arr.event.eventTitle
        });
      });
      //converting the json object and putting it into an excel files
      var json2xls = require("json2xls");
      var fs = require("fs");
      var xls = json2xls(array);
      fs.writeFileSync("data1.xlsx", xls, "binary");
      // console.log(data);
      console.log(array.length);
      return cb(err, array);
    });
};

//=======================Code For getting the user data for a particular event (KWIZFUN-REQ) ==============================

exports.getUserBasedOnEvent = function(req, cb) {
  GamePlay.find({ event: req.params._id })
    .lean()
    .deepPopulate("event team team.teamCaptain")
    .exec(function(err, data) {
      var array = [];
      data.forEach(function(arr) {
        array.push({
          UserName: arr.team.teamCaptain.userName,
          FirstName: arr.team.teamCaptain.firstName,
          TeamName: arr.team.teamName,
          EventTitle: arr.event.eventTitle
        });
      });
      console.log(array.length);
      return cb(err, array);
    });
};

//=======================Code For Storing HTTP Images to Our Node JS Sever===================================

//-----------------------HttpImg2NodeServer.js----------------------------------------------------------------

var download = function(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    console.log("content-type:", res.headers["content-type"]);
    console.log("content-length:", res.headers["content-length"]);

    request(uri)
      .pipe(fs.createWriteStream(filename))
      .on("close", callback);
  });
};
download(
  offerItem.largeImageUrl,
  "./uploads/google.png" + Date.now(),
  function() {
    console.log("done");
  }
);

//=====This Code Illustrate the How we can Achieve (JSON/Obj/String) can be encrypted Using Node_Modules========

//----------------------------------------Node-Encryptor.js-----------------------------------------------------

//To Install Node_modules just Type in Your terminal
//npm install simple-encryptor --save

var key =
  "Any Random String Which should be 16bytes long And No One should know,Expect You!!!";

var encryptor = require("simple-encryptor")(key);

//let consider we have a Object that has to be  encrypted in the Response
var Ashwini = {
  name: "ashwini",
  age: "25",
  company: "JCPenny"
};

var encrypted = encryptor.encrypt(Ashwini);
var decrypted = encryptor.decrypt(encrypted);

//We can also use String to encrypt
var encryptedString = encryptor.encrypt("Ashwini");

//The Console Output Will Print something Gibreshhh!!
console.log(encrypted);
console.log(encryptedString);

//To Get Back The Orginal Object
console.log(decrypted);

//==========================A node-Js Npm Utilization For Generating Random String==============================

//-------------------------------NodeRandomString.js------------------------------------------------------------

var randomstring = require("randomstring");
var no = randomstring.generate({
  charset: "abcdefghijklmnopqrstuvwxyz123456789",
  length: 6
});
console.log(no);

//Output --> b7m5q1

//=====================Service FUnction on PledgeForm with email integration For trivia==========================

//-------------------------------Trivia Pledge Form.js------------------------------------------------------------

exports.addPledgeDetails = function(req, cb) {
  var userId = req.body.user;
  var email = req.body.email;
  var amount = req.body.amount;

  User.findById(userId, function(err, result) {
    if (err || !result) {
      return cb(err, "UserErr", null);
    }
    var pledge = new Pledge();
    pledge.event = req.body.event;
    pledge.user = userId;
    pledge.email = email;
    pledge.amount = amount;

    var sendMail = new sendGrid("sendgriduserName", "sendgridPassword");
    sendMail.send(
      {
        to: email,
        from: sendGridConfig.From_Address,
        subject: "PledgeForm",
        text:
          "ThankYou For submitting your pledge with amount of " +
          amount +
          "$ we appreciate your concern!"
      },
      function(sendData) {
        //res.json({error: false, message: messages.SEND_MAIL, description: '', data: {}});
      }
    );

    // save and check for errors
    pledge.save(function(err) {
      return cb(err, null, pledge);
    });
  });
};

//===========A Node JS Server Where it Fetches Data From the mongoDb Json Data And Write it in a text file===========

//--------------------------------------------DB_to_File.js----------------------------------------------------------

exports.getUserDetail = function(req, cb) {
  User.find({ isActive: true })
    .select({
      _id: 1,
      userName: 1,
      firstName: 1,
      lastName: 1
    })
    .exec(function(err, data) {
      //console.log(data);
      fs.writeFileSync(
        "./uploads/UserDetaInfo",
        JSON.stringify(data, null, 4),
        "utf-8",
        function(err) {
          if (err) {
            return console.log(err);
          }

          console.log("The file was saved!");
        }
      );
      return cb(err, data);
    });
};
//Output
/*{ _id: 59d5cc1eec9c601c3472811c,
    firstName: 'F_Name',
    userName: 'zyx@innoflexion.com' }
*/

//=============================Braintree Payment Gateway Integration================================================

//----------------------------------Braintree Implemntation.js------------------------------------------------------

// assumes the following:
// 1) First a client issues a request to my server for the client token
// 2) My server responds with a token generated using my Braintree credentials (merchantId, public/private key)
// 3) The client passes that token, along with the payment form data to the Braintree server
// 4) The Braintree server responds with an authorization token (payment nonce)
// 5) The client sends the payment nonce back to the server
// 6) The server uses that nonce and the amount specified by the client to realize the transaction
// 7) Braintree server is notified about the new transaction

//======================BRAINTREE SANDBOX API===================================
// var gateway = braintree.connect({
//   environment: braintree.Environment.Sandbox,
//   merchantId: 'r4d57q34dv8chxbr',
//   publicKey: 'f4jgvnsk9by7s2wk',
//   privateKey: '1ca957491840fa299f4ea39f614fd58a'
// });
//==============================================================================

//=========================BRAINTREE MODEL======================================
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var paymentSchema = new Schema({
  name: { type: String, required: [true, "plz enter the name"] },
  transactionID: { type: String, required: false },
  amount: { type: String, required: [true, "plz enter the amount"] },
  paymentNonce: { type: String, required: [true, "plz enter nonceString"] },
  createdDate: { type: Date, required: true, default: Date.now },
  modifiedDate: { type: Date, required: false }
});

// paymentSchema.plugin(uniqueValidator);
// paymentSchema.plugin(deepPopulate);
module.exports = mongoose.model("payment", paymentSchema);

//=====================BRAINTREE SERVICES=======================================
var Payment = require("../models/payment");
var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "xxx",
  publicKey: "yyy",
  privateKey: "zzz"
});

exports.addPayment = function(req, cb) {
  var paymentData = new Payment();
  paymentData.name = req.body.name;
  paymentData.amount = req.body.amount;
  paymentData.paymentNonce = req.body.paymentNonce;

  gateway.transaction.sale(
    {
      amount: paymentData.amount,
      paymentMethodNonce: paymentData.paymentNonce,
      options: {
        submitForSettlement: true
      }
    },
    function(err, result) {
      if (err || !result) {
        return cb(err, result, null);
      }
      if (result.success) paymentData.transactionID = result.transaction.id;
      paymentData.save(function(err, response) {
        return cb(err, response);
      });
    }
  );
  //save and check error
  // paymentData.save(function (err,response) {
  //     return cb(err,response)
  // });
};

exports.getClientToken = function(req, cb) {
  gateway.clientToken.generate({}, function(err, response) {
    return cb(err, response.clientToken);
  });
};
//=====================BRAINTREE ROUTE==========================================

var express = require("express");
var router = express.Router();
var paymentSvc = require("../services/payment");
var messages = require("../Handlers/msg_handler");
router
  .post("/addPayment", function(req, res, next) {
    paymentSvc.addPayment(req, function(err, result) {
      if (err) {
        res.json({
          error: true,
          message: messages.RECORD_ERROR,
          description: "",
          data: err
        });
      } else {
        res.json({
          error: false,
          message: messages.RECORD_CREATED,
          description: "",
          data: result
        });
      }
    });
  })

  .get("/ClientToken", function(req, res, next) {
    paymentSvc.getClientToken(req, function(err, result) {
      if (err) {
        res.json({
          error: true,
          message: messages.RECORD_ERROR,
          description: "",
          data: err
        });
      } else {
        var response = result
          ? {
              error: false,
              message: messages.GET_ALL_RECORDS,
              description: "",
              data: result
            }
          : {
              error: true,
              message: messages.NO_RECORD,
              description: "",
              data: {}
            };
      }
      res.json(response);
    });
  });
module.exports = router;
