
var fullname, userEmail, myURL, bookID;
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


function preview_image(event) 
{
 var reader = new FileReader();
 reader.onload = function()
 {
  var output = document.getElementById('output_image');
  output.src = reader.result;
 }
 reader.readAsDataURL(event.target.files[0]);
}

function  uploadData() {
    const ref = firebase.storage().ref();
    const file = document.querySelector("#photo").files[0];
    const name = +new Date() + "-" + file.name;
    const metadata = {
      contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        myURL = url;
        addBook();
      })
      .catch(console.error);
  }



function getVal(id) {
     return document.getElementById(id).value;
}


function addBook() {
  console.log(myURL);
  let title = getVal('story-title');
  let description = getVal('story-descrp');
  let genre = getVal('story-genre');
  let tags = getVal('story-tags');
  db.collection('books').add({
    Title: title,
    Author: fullname,
    Description: description,
    Genre: genre,
    Tags: tags,
    Image: myURL,
    AuthorEmail: userEmail
  })
  .then(docRef => {
    bookID = docRef.id;
    console.log(bookID);
  })
  .then(
    ()=>{
      alert("Data Uploaded!");
      location.replace(`editor.html?bookId=${bookID}&bookName=${title}`)
    }
  );
}





