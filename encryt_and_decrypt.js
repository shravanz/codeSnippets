const crypto = require("crypto");
const algo = "aes-256-cbc";
//Here "aes-256-cbc" is the advance encyption standard we used for encrytion.
const password = "venus";

function encrypt(text) {
  //Text is the Confidential data which we need to encrypt using 'password'(Key).
  let cipher = crypto.createCipher(algo, password);
  let crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}
function decrypt(text) {
  //Text is the Cipher which we need to decrypt using 'password'(Key).
  let decipher = crypto.createDecipher(algo, password);
  let dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

let encrypted = encrypt("abcd");
console.log(encrypted); // output --> 0cef70a9d325c21758c8d41842366ed6
console.log(decrypt(encrypted));
