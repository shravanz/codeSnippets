//=======================Code For Storing HTTP Images to Our Node JS Sever===================================

//-----------------------HttpImg2NodeServer.js----------------------------------------------------------------

var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};
download(offerItem.largeImageUrl, './uploads/google.png' + Date.now(), function () {
    console.log('done');
});




//=====This Code Illustrate the How we can Achieve (JSON/Obj/String) can be encrypted Using Node_Modules========

//----------------------------------------Node-Encryptor.js-----------------------------------------------------

//To Install Node_modules just Type in Your terminal
//npm install simple-encryptor --save

var key = 'Any Random String Which should be 16bytes long And No One should know,Expect You!!!';

var encryptor = require('simple-encryptor')(key);

//let consider we have a Object that has to be  encrypted in the Response  
var Ashwini = {
    name: 'ashwini',
    age: '25',
    company: 'JCPenny'
}


var encrypted = encryptor.encrypt(Ashwini);
var decrypted = encryptor.decrypt(encrypted);

//We can also use String to encrypt
var encryptedString = encryptor.encrypt('Ashwini');

//The Console Output Will Print something Gibreshhh!! 
console.log(encrypted);
console.log(encryptedString);

//To Get Back The Orginal Object 
console.log(decrypted);



//==========================A node-Js Npm Utilization For Generating Random String==============================

//-------------------------------NodeRandomString.js------------------------------------------------------------

var randomstring = require("randomstring");
var no = randomstring.generate({
    charset: 'abcdefghijklmnopqrstuvwxyz123456789',
    length: 6,

});
console.log(no);

//Output --> b7m5q1


//=====================Service FUnction on PledgeForm with email integration For trivia==========================

//-------------------------------Trivia Pledge Form.js------------------------------------------------------------

exports.addPledgeDetails = function (req, cb) {

    var userId = req.body.user;
    var email = req.body.email;
    var amount = req.body.amount;

    User.findById(userId, function (err, result) {
        if (err || !result) { return cb(err, 'UserErr', null); }
        var pledge = new Pledge();
        pledge.event = req.body.event;
        pledge.user = userId;
        pledge.email = email;
        pledge.amount = amount;

        var sendMail = new sendGrid('sendgriduserName', 'sendgridPassword');
        sendMail.send({
            to: email,
            from: sendGridConfig.From_Address,
            subject: 'PledgeForm',
            text: 'ThankYou For submitting your pledge with amount of ' + amount + '$ we appreciate your concern!'
        }, function (sendData) {

            //res.json({error: false, message: messages.SEND_MAIL, description: '', data: {}});

        });

        // save and check for errors
        pledge.save(function (err) {

            return cb(err, null, pledge);
        });

    });
};

//===========A Node JS Server Where it Fetches Data From the mongoDb Json Data And Write it in a text file===========

//--------------------------------------------DB_to_File.js----------------------------------------------------------

exports.getUserDetail = function (req,cb) {
    User.find({isActive: true})
        .select({
            '_id':1,
            'userName':1,
            'firstName':1,
            'lastName':1
        })
        .exec(function (err,data) {
            //console.log(data);
            fs.writeFileSync("./uploads/UserDetaInfo", JSON.stringify(data,null,4),'utf-8', function(err) {
                if(err) {
                    return console.log(err);
                }
 
                console.log("The file was saved!");
            });
            return cb(err,data);
        })
};
//Output
/*{ _id: 59d5cc1eec9c601c3472811c,
    firstName: 'F_Name',
    userName: 'zyx@innoflexion.com' }
*/