const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bookID = urlParams.get('bookId');
const chapID = urlParams.get('chapId');
var nextChapID, previousChapID;

const chaptersArray = JSON.parse(sessionStorage.getItem("chapters"));
console.log(chaptersArray[0]);

if(chapID == chaptersArray[0]) {
    document.getElementById('previous').style.display = "none";
}
if(chapID == chaptersArray[chaptersArray.length-1]) {
    document.getElementById('next').style.display = "none";
}
for(i=0; i<chaptersArray.length; i++) {
    if(chapID == chaptersArray[i]) {
        nextChapID = chaptersArray[i+1];
        previousChapID = chaptersArray[i-1];
        console.log(nextChapID);
        console.log(previousChapID);
    }
}

db.collection('books').doc(bookID).get().then((doc) => {
    document.getElementById('book-title').innerHTML = doc.data().Title;
});
db.collection('books').doc(bookID).collection('chapters').doc(chapID).get().then((doc) => {
    document.getElementById('chapter-name').innerHTML = doc.data().chapterName;
});
db.collection('books').doc(bookID).collection('chapters').doc(chapID).collection('chapterContent').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        document.getElementById('chapter-content').innerHTML = doc.data().content;
    })
});

function previous() {
    location.replace(`chapter.html?bookId=${bookID}&chapId=${previousChapID}`);
}

function next() {
    location.replace(`chapter.html?bookId=${bookID}&chapId=${nextChapID}`);
}