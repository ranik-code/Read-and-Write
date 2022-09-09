var fullname, userEmail, bookName, docID;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      var userId = user.uid;
        firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
            fullname = (snapshot.val() && snapshot.val().fullname) || 'Anonymous';
            userEmail = (snapshot.val() && snapshot.val().email) || 'Anonymous';
            const book_name = sessionStorage.getItem('bookName');
            document.getElementById('book-name').innerHTML = book_name;
            bookName = book_name;
            db.collection('books').where('AuthorEmail', '==', userEmail).get().then((snapshot) => {
              snapshot.docs.forEach(doc => {
                if (doc.data().Title == bookName) {
                  docID = doc.id;
                }
              });
              console.log(docID);
            });
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

// function submitChapter() {
//   let chapterName = getVal('heading');
//   console.log(chapterName);
//   // db.collection('books').doc(docID).collection('chapters').add({
//   //   chapterName: chapterName,
//   //   timpstamp: firebase.firestore.FieldValue.serverTimestamp() 
//   // });
// }

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
    db.collection('books').doc(docID).collection('drafts').add({
      createdAt: new Date(),
      chapterName: chapName
    })
    .then(docRef => {
      chapID = docRef.id;
      console.log(chapID);
    })
    .then(
      ()=>{
        db.collection('books').doc(docID).collection('drafts').doc(chapID).collection('chapterContent').add({
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
    db.collection('books').doc(docID).collection('chapters').add({
      createdAt: new Date(),
      chapterName: chapName
    })
    .then(docRef => {
      chapID = docRef.id;
      console.log(chapID);
    })
    .then(
      ()=>{
        db.collection('books').doc(docID).collection('chapters').doc(chapID).collection('chapterContent').add({
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