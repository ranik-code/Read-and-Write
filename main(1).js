

// firebase.auth().onAuthStateChanged((user)=>{
//   if(user){
//       location.replace("welcome.html")
//   }
// })

// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  fullname = document.getElementById('fullname').value
  username = splitEmail(email);

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
  if (validate_field(fullname) == false) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      fullname : fullname,
      username : username,
      last_login : new Date()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data);

    //Add to firestore
    db.collection('users').doc(user.uid).set(user_data);

    //Done
    alert('User Created!!');
    
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}


// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : new Date()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    //Add to firestore
    db.collection('users').doc(user.uid).update(user_data);

    // DOne
    alert("User Logged In!!");
    location.replace("homepage.html")

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

function forgotPass(){
const email = document.getElementById("email").value
  if(email != "") {
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        alert("Reset link sent to your email id")
    })
    .catch((error) => {
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })
  }
  else{
    alert("Please enter your email address first")
  }
}


// Validate Functions
function validate_email(email) {
expression = /^[^@]+@\w+(\.\w+)+\w$/
if (expression.test(email) == true) {
  // Email is good
  return true
} else {
  // Email is not good
  return false
}
}

function validate_password(password) {
// Firebase only accepts lengths greater than 6
if (password < 6) {
  return false
} else {
  return true
}
}

function validate_field(field) {
if (field == null) {
  return false
}

if (field.length <= 0) {
  return false
} else {
  return true
}
}

function splitEmail(email) {
  res = email.split("@");
  return res[0];
}