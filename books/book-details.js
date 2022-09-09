const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bookID = urlParams.get('id');

var bookName;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      var userId = user.uid;
        firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
            fullname = (snapshot.val() && snapshot.val().fullname) || 'Anonymous';
            var letter = fullname.charAt(0);
            document.getElementById("profile").innerHTML = letter;            
        });
    } else {
      // User not logged in or has just logged out.
    }
});

const bookCover = document.querySelector('#book-cover');
db.collection('books').doc(bookID).get().then((doc) => {
    let bookcover = document.createElement('img');
    bookcover.src = doc.data().Image;
    bookcover.setAttribute('id','output_image');
    bookcover.setAttribute('class','user-image');
    bookCover.appendChild(bookcover);

    bookName = doc.data().Title;
    document.getElementById('story-title').value = doc.data().Title
    document.getElementById('story-descrp').value = doc.data().Description
    document.getElementById('story-genre').value = doc.data().Genre
    document.getElementById('story-tags').value = doc.data().Tags
})

const bookChapters = document.querySelector('#chap-list');
db.collection('books').doc(bookID).collection('chapters').orderBy('createdAt').get().then((snapshot) => {
    snapshot.docs.forEach(doc =>{
      let temp1 = doc.data().chapterName;
      let temp2 = temp1.split(">");
      console.log(temp2);
      if(temp2.length > 1) {
        for(let i=0; i<temp2.length-1; i++) {
          if(temp2[i].charAt(0) != '<') {
            let temp3 = temp2[i];
            let temp4 = temp3.split("<");
            chapName = temp4[0];
          }         
        }
      }
      if(temp2.length == 1) {
        chapName = temp2[0];
      }
      console.log(chapName)

      let chap = document.createElement('li');
      chap.setAttribute('id', doc.id);
      chap.textContent = chapName;
      chap.onclick=function(){
        window.open(`file:///C:/Users/Lenovo/Documents/test-firebase/editor3.html?bookid=${bookID}&chapid=${doc.id}`,'_blank')
      }
      bookChapters.appendChild(chap);
    })
})

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

function newChapter() {
  window.open(`file:///C:/Users/Lenovo/Documents/test-firebase/editor.html?bookId=${bookID}&bookName=${bookName}`,'_blank');
}