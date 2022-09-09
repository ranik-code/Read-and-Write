const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bookID = urlParams.get('bookId');
const bookName = urlParams.get('bookName');
document.getElementById('book-name').innerHTML = bookName;

var fullname, userEmail;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      var userId = user.uid;
        firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
            fullname = (snapshot.val() && snapshot.val().fullname) || 'Anonymous';
            userEmail = (snapshot.val() && snapshot.val().email) || 'Anonymous';
        });
    } else {
      // User not logged in or has just logged out.
    }
  });


function chooseColor(){
    var mycolor = document.getElementById("myColor").value;
    document.execCommand('foreColor', false, mycolor);
  }

  function changeFont(){
    var myFont = document.getElementById("input-font").value;
    document.execCommand('fontName', false, myFont);
  }

  function changeSize(){
    var mysize = document.getElementById("fontSize").value;
    document.execCommand('fontSize', false, mysize);
  }

  function checkDiv(){
    var editorText = document.getElementById("editor1").innerHTML;
    if(editorText === ''){
      document.getElementById("editor1").style.border = '5px solid red';
    }
  }

  function removeBorder(){
    document.getElementById("editor1").style.border = '1px solid transparent';
  }

  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

function getVal(id) {
  return document.getElementById(id).value;
}



const heading = document.getElementById('heading');
const content = document.getElementById('editor1')
var chapName = '';
var chapContent = '';
var chapID;

heading.addEventListener("input", e => {
  chapName = e.target.innerHTML;
});

content.addEventListener("input", e => {
  chapContent = e.target.innerHTML;
});

function addDocDrafts() {
  console.log(chapName);
    db.collection('books').doc(bookID).collection('drafts').add({
      createdAt: new Date(),
      chapterName: chapName
    })
    .then(docRef => {
      chapID = docRef.id;
      console.log(chapID);
    })
    .then(
      ()=>{
        db.collection('books').doc(bookID).collection('drafts').doc(chapID).collection('chapterContent').add({
          content: chapContent
        })
      }
    )
    .then(
      ()=>{
        alert("Chapter Saved!");
      }
    );
    
}

function addDocUpload() {
  console.log(chapName);
    db.collection('books').doc(bookID).collection('chapters').add({
      createdAt: new Date(),
      chapterName: chapName
    })
    .then(docRef => {
      chapID = docRef.id;
      console.log(chapID);
    })
    .then(
      ()=>{
        db.collection('books').doc(bookID).collection('chapters').doc(chapID).collection('chapterContent').add({
          content: chapContent
        })
      }
    )
    .then(
      ()=>{
        alert("Chapter Uploaded!");
      }
    );
    
}

function exitPage() {
  location.replace("homepage.html");
}