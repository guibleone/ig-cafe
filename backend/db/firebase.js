const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyDsS1VLdKvzdd9Jhqendufj2FYN42Ek3Ao",
  authDomain: "igcafe.firebaseapp.com",
  projectId: "igcafe",
  storageBucket: "igcafe.appspot.com",
  messagingSenderId: "88676271047",
  appId: "1:88676271047:web:b6f09182b7d52b53980fe2",
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const storage = getStorage(app);

module.exports = { storage }