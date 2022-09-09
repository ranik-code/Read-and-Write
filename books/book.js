const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bookID = urlParams.get('id');
var chapName, chapters=[];

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
const bookTitle = document.querySelector('#book-title');
const bookDescrp = document.querySelector('#book-description');
const bookChapters = document.querySelector('#chapters-list');

db.collection('books').doc(bookID).get().then((doc) => {
    let bookcover = document.createElement('img');
    bookcover.src = doc.data().Image;
    bookCover.appendChild(bookcover);

    let booktitle = document.createElement('h2');
    booktitle.setAttribute('class','book-details');
    booktitle.textContent = doc.data().Title;
    bookTitle.appendChild(booktitle);
    let bookauthor = document.createElement('h4');
    bookauthor.setAttribute('class','book-author');
    bookauthor.textContent = doc.data().Author;
    bookauthor.onclick=function(){
      window.open(`file:///C:/Users/Lenovo/Documents/test-firebase/profile-otherUser.html?email=${doc.data().AuthorEmail}&name=${doc.data().Author}`)
    }
    bookTitle.appendChild(bookauthor);

    let bookdescrp = document.createElement('p');
    bookdescrp.textContent = doc.data().Description;
    bookDescrp.appendChild(bookdescrp); 
})
.then(() =>{
    db.collection('books').doc(bookID).collection('chapters').orderBy('createdAt').get().then((snapshot) => {
        snapshot.docs.forEach(doc=>{
          let temp1 = doc.data().chapterName;
          let temp2 = temp1.split(">");
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

          chapters.push(doc.id);
          let chap = document.createElement('li');
          chap.setAttribute('id', doc.id);
          chap.textContent = chapName;
          chap.onclick=function(){
            window.open(`file:///C:/Users/Lenovo/Documents/test-firebase/books/chapter.html?bookId=${bookID}&chapId=${doc.id}`,'_blank')
          }
          bookChapters.appendChild(chap);
        })
        console.log(chapters)
        const chaptersArray = chapters;
        console.log(chaptersArray)
        sessionStorage.setItem("chapters", JSON.stringify(chaptersArray));
    })
})

function startReading() {
  if(chapters.length > 0 ) {
    window.open(`file:///C:/Users/Lenovo/Documents/test-firebase/books/chapter.html?bookId=${bookID}&chapId=${chapters[0]}`,'_blank')
  }
  else {
    alert("No Chapters Available Yet !!")
  }
}

