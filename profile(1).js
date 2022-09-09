var fullname, userEmail, username;
const bookList = document.querySelector('#book-list');
firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
        // User logged in already or has just logged in.
        var userId = user.uid;
        firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
            fullname = (snapshot.val() && snapshot.val().fullname) || 'Anonymous';
            userEmail = (snapshot.val() && snapshot.val().email);
            username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
            var letter = fullname.charAt(0);
            document.getElementById("profile").innerHTML = letter;
            document.getElementById("fullname").innerHTML = fullname;
            document.getElementById("username").innerHTML = username;
            document.getElementById("email").innerHTML = userEmail;
            // ...

            db.collection('books').where('AuthorEmail', '==', userEmail).get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    var docID = doc.id;
                    var bookTitle = doc.data().Title;
                    console.log(doc.data().Title)
                    db.collection('books').doc(docID).collection('chapters').get().then((snapshot) => {
                        snapshot.docs.forEach(doc => {
                            let li = document.createElement('li');
                            let bookname = document.createElement('span');
                            let chapter = document.createElement('span');

                            li.setAttribute('data-id', doc.id);
                            bookname.textContent = bookTitle;
                            chapter.textContent = doc.data().chapterName;

                            li.appendChild(bookname);
                            li.appendChild(chapter);

                            bookList.appendChild(li);
                            //console.log(doc.data().chapterName);
                        });
                    });
              });
            });
        })
    }

    else{
        location.replace("login.html")
    }
})