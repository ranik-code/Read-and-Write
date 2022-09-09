firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
        // User logged in already or has just logged in.
        var userId = user.uid;
        firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
            var username = (snapshot.val() && snapshot.val().fullname) || 'Anonymous';
            var letter = username.charAt(0);
            document.getElementById("profile").innerHTML = letter;
            // ...
          });
     }
    else{
        location.replace("login.html")
    }
})

function getSearch() {
   var res = document.getElementById('searchBox').value;
   if(document.getElementById('searchBox').value != '') {
      const search = "Search Results";
      sessionStorage.setItem("Search", search);
      location.replace(`search.html?res=${res}`);
   }
   else {
      alert("Enter book/author name in search box !")
   }
}

function getAction() {
    const genre = "Action";
    sessionStorage.setItem("GenreName", genre);
    location.replace("filter.html");
 }

 function getAdventure() {
    const genre = "Adventure";
    sessionStorage.setItem("GenreName", genre);
    location.replace("filter.html");
 }

 function getClassics() {
    const genre = "Classics";
    sessionStorage.setItem("GenreName", genre);
    location.replace("filter.html");
 }

 function getComicBooks() {
    const genre = "Comic books";
    sessionStorage.setItem("GenreName", genre);
    location.replace("filter.html");
 }
 function getComingoftheAge() {
    const genre = "Comingoftheage";
    sessionStorage.setItem("GenreName", genre);
    location.replace("filter.html");
 }

 function getCrime() {
    const genre = "Crime";
    sessionStorage.setItem("GenreName", genre);
    location.replace("filter.html");
 }

 function getDetective() {
    const genre = "Detective";
    sessionStorage.setItem("GenreName", genre);
    location.replace("filter.html");
 }

 function getDrama() {
    const genre = "Drama";
    sessionStorage.setItem("GenreName", genre);
    location.replace("filter.html");
 }

 function getFantasy() {
    const genre = "Fantasy";
    sessionStorage.setItem("GenreName", genre);
    location.replace("filter.html");
 }
 function getHorror() {
    const genre = "Horror";
    sessionStorage.setItem("GenreName", genre);
    location.replace("filter.html");
 }
 function getMystery() {
    const genre ="Mystery";
    sessionStorage.setItem("GenreName", genre);
    location.replace("filter.html");
 }

 function getParanormalRomance() {
    const genre = "Paranormalromance";
    sessionStorage.setItem("GenreName", genre);
    location.replace("filter.html");
 }

 function getPoliticalthriller() {
    const genre = "Politicalthriller";
    sessionStorage.setItem("GenreName", genre);
    location.replace("filter.html");
 }

 function getPsychological() {
    const genre ="Psychological";
    sessionStorage.setItem("GenreName", genre);
    location.replace("filter.html");
 }

 function getRomance() {
    const genre = "Romance";
    sessionStorage.setItem("GenreName", genre);
    location.replace("filter.html");
 }

 function getRomcom() {
    const genre = "Romcom";
    sessionStorage.setItem("GenreName", genre);
    location.replace("filter.html");
 }

 function getThriller() {
    const genre = "Thriller";
    sessionStorage.setItem("GenreName", genre);
    location.replace("filter.html");
 }


