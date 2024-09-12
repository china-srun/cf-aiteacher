const AWS = require("aws-sdk");
const fs = require("fs");
require('dotenv').config();

const { getSignedUrl, getSignedCookies } = require("@aws-sdk/cloudfront-signer");
const privateKey = fs.readFileSync('./private_key.pem', 'utf8');
// const url = "https://d2vw2bqhda6a9m.cloudfront.net"
// const cloudfront = new AWS.CloudFront.Signer("KOSQ6W4G4CUDP", privateKey);
const expirationDate = new Date(Date.now() + 30 * 1000); // 30 seconds from now


// const signedUrl = getSignedUrl({
//   url: url,
//   keyPairId: process.env.CLOUDFRONT_KEYPAIRS,
//   dateLessThan: expirationDate,
//   privateKey: privateKey,
// });
// const getExpTime = new Date(Date.now() + 5 * (60 * 60 * 1000)).getTime();

// // Custom Policy
// const policyString = JSON.stringify({
//   Statement: [
//     {
//       Resource: "https://d2vw2bqhda6a9m.cloudfront.net/",
//       Condition: {
//         DateLessThan: { "AWS:EpochTime": getExpTime },
//       },
//     },
//   ],
// });
// const signedCookie = getSignedUrl({
//   keyPairId: process.env.CLOUDFRONT_KEYPAIRS,
//   privateKey: privateKey,
//   policy: policyString,
//   url: "https://d2vw2bqhda6a9m.cloudfront.net/",
// });
// console.log("Temporary URL:", signedCookie);


// Read the private key from the file system

// const cloudfront = new AWS.CloudFront.Signer(
//   process.env.CLOUDFRONT_KEYPAIRS,
//   privateKey
// );

// const signedUrl = cloudfront.getSignedUrl({
//   url: 'https://d2vw2bqhda6a9m.cloudfront.net/',
//   expires: Math.floor((Date.now() + 5 * 60 * 60 * 1000) / 1000) // 5 hours expiration
// });

// const encodedUrl = encodeURIComponent(signedUrl);


// console.log('Temporary URL:', encodedUrl);
const cloudfront = new AWS.CloudFront.Signer(
  process.env.CLOUDFRONT_KEYPAIRS, // CloudFront key pair ID
  privateKey
);

const signedUrl = cloudfront.getSignedUrl({
  url: 'https://d2vw2bqhda6a9m.cloudfront.net',
  expires: Math.floor((Date.now() + 5 * 60 * 60 * 1000) / 1000) // 5 hours expiration
});

// Parse the signed URL and extract the signature part
const url = new URL(signedUrl);
const signature = url.searchParams.get('Signature');

// Encode only the signature
const encodedSignature = encodeURIComponent(signature);

// Set the encoded signature back into the URL
url.searchParams.set('Signature', encodedSignature);

// Final signed URL with encoded signature
const finalSignedUrl = url.toString();

console.log('Temporary URL with Encoded Signature:', finalSignedUrl);
