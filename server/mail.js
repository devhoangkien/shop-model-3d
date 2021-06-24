const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// These id's and secrets should come from .env file.
const CLIENT_ID =
  "715198785263-b1jjrd15c1fd78ou2u22f2g9hqeqbpeo.apps.googleusercontent.com";
const CLEINT_SECRET = "szczA4FLdypX4piyCQAL7UHc";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04wSiUf_EmayjCgYIARAAGAQSNwF-L9IrtKIU1n8jEcn3u9mDGJ54vB7aJ41Ubi9QLvuuncETp8INZe75SnbqY9TeYjwyaVEM6iY";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "yours authorised email address",
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "SENDER NAME <yours authorised email address@gmail.com>",
      to: "to email address here",
      subject: "Hello from gmail using API",
      text: "Hello from gmail email using API",
      html: "<h1>Hello from gmail email using API</h1>",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log("Email sent...", result))
  .catch((error) => console.log(error.message));
