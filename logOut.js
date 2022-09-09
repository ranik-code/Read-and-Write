
function logout(){
    firebase.auth().signOut().then(function() {
        location.replace("login.html")
    })
}