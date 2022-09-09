const bookList = document.querySelector('#book-list');
firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
        // User logged in already or has just logged in.
        var userId = user.uid;
        firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
            var username = (snapshot.val() && snapshot.val().fullname) || 'Anonymous';
            var userEmail = (snapshot.val() && snapshot.val().email) || 'Anonymous';
            var letter = username.charAt(0);
            document.getElementById("profile").innerHTML = letter;
            // ...
            db.collection('books').where('AuthorEmail', '==', userEmail).get().then((snapshot) =>{
                snapshot.docs.forEach(doc =>{
                    let Div = document.createElement('div');
                    Div.className = "w3-quarter";
                    let bookcover = document.createElement('img');
                    let bookname = document.createElement('h3');
                    let author = document.createElement('p');

                    Div.setAttribute('data-id', doc.id);
                    Div.onclick=function(){
                        window.open(`file:///C:/Users/Lenovo/Documents/test-firebase/books/book-details.html?id=${doc.id}`,'_blank')
                    }

                    bookcover.src = doc.data().Image;
                    bookname.textContent = doc.data().Title;
                    author.textContent = doc.data().Author;

                    Div.appendChild(bookcover);
                    Div.appendChild(bookname);
                    Div.appendChild(author);

                    bookList.appendChild(Div);
                });
            });
            
          });
     }
    else{
        //
    }
})
