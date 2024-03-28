import CryptoJS from "crypto-js";

// keep secrets in .env file
var secret_key = import.meta.env.VITE_SECRET_KEY
var iv = import.meta.env.VITE_IV

//JS FIX IV ENCRYPTION CBC
export const encryptDataWithIv = (data) => {
  try {
		console.log("key len", AesConfig.SecretKey.length);
		var key = CryptoJS.enc.Utf8.parse(AesConfig.SecretKey);
		var iv = CryptoJS.enc.Utf8.parse(AesConfig.SecretIv);
		var encrypted = CryptoJS.AES.encrypt(data, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		});
		var encrypted1 = encrypted.toString();
		console.log("encryptDataWithIv: ", encrypted1);
		return encrypted1;
  } catch (err) {
    	console.log(`Error: ${err} please try again later`);
		return null
  }
};

//JS ENCRYPTION ECB
export const encryptData = (data) => {
  var key = CryptoJS.enc.Utf8.parse(AesConfig.SecretKey);
  var encrypted = CryptoJS.AES.encrypt(data, key, { mode: CryptoJS.mode.ECB });
  var encrypted2 = encrypted.toString();
  console.log("encryptData: ", encrypted2);
  return encrypted2;
};

export const decryptDataWithIv = (encryptedData) => {
  var iv = CryptoJS.enc.Utf8.parse(AesConfig.SecretIv);
  var key = CryptoJS.enc.Utf8.parse(AesConfig.SecretKey);
  var decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
  });
  // console.log("decrypted1", decrypted.toString(CryptoJS.enc.Utf8));
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const decryptData = (encryptedData) => {
  var key = CryptoJS.enc.Utf8.parse(AesConfig.SecretKey);
  var decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
    mode: CryptoJS.mode.ECB,
  });
  console.log("decrypted2", decrypted.toString(CryptoJS.enc.Utf8));
  return decrypted.toString(CryptoJS.enc.Utf8);
};


