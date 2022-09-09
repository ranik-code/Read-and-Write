// Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAGFp5CHipEc2yZ63bAN9ZxbzE_H2DoFkY",
      authDomain: "wrinkledpages-a8ee9.firebaseapp.com",
      projectId: "wrinkledpages-a8ee9",
      storageBucket: "wrinkledpages-a8ee9.appspot.com",
      messagingSenderId: "575055979515",
      appId: "1:575055979515:web:590f3e6cf2b4a26ec3215e"
    };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  
  // Initialize variables
  const auth = firebase.auth();
  const database = firebase.database();
  const db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true }); 


  