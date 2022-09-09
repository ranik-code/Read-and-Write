
var fullname, userEmail, myURL;
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
  const bookName = getVal('story-title');
  sessionStorage.setItem("bookName", bookName);
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
  .then(
    ()=>{
      alert("Data Uploaded!");
      location.replace("editor.html")
    }
  );
}





// var ImgName, ImgUrl;
// var files = [];
// var reader;

// document.getElementById("select").onclick = function(e){
    
//     var input = document.createElement('input');
//     input.type = 'file';

//     input.onchange = e =>{
//         files = e.target.files;
//         reader = new FileReader();
//         reader.onload = function(){
//         document.getElementById('output_image').src = reader.result; 
//         }
//         reader.readAsDataURL(files[0]);
//     }
//     input.click();
// }


// function GetFileName(file){
//     var fname = file.name
//     return fname;
// }

// function getVal(id) {
//     var val = document.getElementById(id).value;
//     return val;
// }


// async function UploadProcess() {
//     var ImgToUpload = files[0];
//     var ImgName = GetFileName(files[0]);

//     const metaData = {
//         contentType : ImgToUpload.type
//     }
    
//     const getStorage = firebase.storage().getStorage();
//     const storageRef = firebase.storage().ref(getStorage, "Images/"+ImgName);
//     const UploadTask = firebase.storage().uploadBytestResumable(storageRef, ImgToUpload, metaData);

//     UploadTask.on('state_changed', 
//             ()=>{
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
//                     console.log(downloadURL);
//                 });
//                 uploadTask.snapshot.ref.getDownloadURL().then(function(url){
//                     ImgUrl = url;
        
//                     firebase.database().ref('Books/').set({
        
//                         Title: title,
//                         Author: author,
//                         Description: description,
//                         Genre: genre,
//                         Tags: tags,
//                         Image: ImgUrl
//                     });
//                     alert('Data Uploaded!');
//                 });
//             }
//         );

// }

// function submitForm() {
//     ImgName = GetFileName(files[0]);
//     var uploadTask = firebase.storage().ref('BookCovers/'+ImgName).put(files[0]);
    
//     title = getVal('story-title');
//     author = getVal('story-author');
//     description = getVal('story-descrp');
//     genre = getVal('story-genre');
//     tags = getVal('story-tags');

//     uploadTask.on('state_changed', function(snapshot){
//         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         document.getElementById('UpProgress').innerHTML = 'Upload '+progress+'%';
//     },

//     function(error){
//         alert('error in saving the image');
//     },
    
//     function(){
//         uploadTask.snapshot.ref.getDownloadURL().then(function(url){
//             ImgUrl = url;

//             firebase.database().ref('Books/').set({

//                 Title: title,
//                 Author: author,
//                 Description: description,
//                 Genre: genre,
//                 Tags: tags,
//                 Image: ImgUrl
//             });
//             alert('Data Uploaded!');
//         });
//     });
// }