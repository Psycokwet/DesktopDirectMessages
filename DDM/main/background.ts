import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow, Keychain } from "./helpers";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

// var Twit = require("twit");

// var T = new Twit({
//   consumer_key: process.env.TWITTER_API_KEY,
//   consumer_secret: process.env.TWITTER_API_KEY_SECRET,
//   access_token: process.env.TWITTER_ACCESS_TOKEN,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
//   timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
//   strictSSL: true, // optional - requires SSL certificates to be valid.
// });

// // T.get(
// //   "search/tweets",
// //   { q: "banana since:2011-07-11", count: 100 },
// //   function (err, data, response) {
// //     console.log(data);
// //   }
// // );
// T.get("direct_messages/events/list", function (err, data, response) {
//   console.log(data);
// });

import { TwitterApi } from "twitter-api-v2"; // OAuth 1.0a (User context)
// const userClient = new TwitterApi({
//   appKey: process.env.TWITTER_API_KEY,
//   appSecret: process.env.TWITTER_API_KEY_SECRET,
//   // Following access tokens are not required if you are
//   // at part 1 of user-auth process (ask for a request token)
//   // or if you want a app-only client (see below)
//   accessToken: process.env.TWITTER_ACCESS_TOKEN,
//   accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
// });
// const v1Client = userClient.v1;
// // const twitterClient = new TwitterApi(process.env.TWITTER_API_KEY);
// // // Tell typescript it's a readonly app
// // const roClient = twitterClient.readOnly;
// ipcMain.on(Keychain.connection, (event, { userName, password }) => {
//   console.log(userName, password);
// });

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
});
var authLink;
ipcMain.on(Keychain.retrieveAuthLink, async (event) => {
  authLink = await client.generateAuthLink("oob");
  event.sender.send(Keychain.retrieveAuthLink, authLink.url);
});

ipcMain.on(Keychain.connection, async (event, pinCode) => {
  console.log(pinCode);
  const connecterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_KEY_SECRET,
    accessToken: authLink.oauth_token,
    accessSecret: authLink.oauth_token_secret,
  });
  // Validate verifier to get definitive access token & secret
  const { accessToken, accessSecret } = connecterClient
    .login(pinCode)
    .catch((error) => console.log(error));
});

// async function test() {
//   // Create a partial client for auth links
//   // Redirect your client to authLink.url

//   // ... user redirected to https://your-website.com?oauth_token=XXX&oauth_verifier=XXX after user app validation
//   // Create a temporary client with previous-step tokens
//   const connecterClient = new TwitterApi({
//     appKey: process.env.TWITTER_API_KEY,
//     appSecret: process.env.TWITTER_API_KEY_SECRET,
//     accessToken: authLink.oauth_token,
//     accessSecret: authLink.oauth_token_secret,
//   });
//   // Validate verifier to get definitive access token & secret
//   const { accessToken, accessSecret } = connecterClient.login(
//     "<THE_OAUTH_VERIFIER>"
//   );

//   console.log(
//     "Access token and secret for logged client:",
//     accessToken,
//     accessSecret
//   );

//   const loggedUser = await connecterClient.v1.verifyCredentials();
//   console.log(loggedUser);
//   //   const recipientId = "1404393298551259136";

//   //   const dmSent = await v1Client.sendDm({
//   //     // Mandatory
//   //     recipient_id: recipientId,
//   //     // Other parameters are collapsed into {message_data} of payload
//   //     text: "Hello Jack!",
//   //   });
// }
// test();
