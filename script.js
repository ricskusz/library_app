let booksContainer = document.querySelector(".books-container");
const addNewBook = document.querySelector('#addNewBook');
const modal = document.querySelector('.modal');
const submitButton = document.querySelector('.submit');
const closeIcon = document.querySelector('#close');

let myLibrary = [];

function Book(title, author, pageNumber, read){
    this.title = title;
    this.author = author;
    this. pageNumber = pageNumber;
    this.read = read;
}

function addBookToLibrary(){

    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pageNumber = document.querySelector('#pageNumber').value;
    let read = document.querySelector('#read').checked ? true : false;

    if(title == "" ||  author == "" || pageNumber == "" ) return alert('All fields must contain a value');

    myLibrary.push(new Book(title, author, pageNumber, read));

    displayBooks();
}

function displayBooks(){
    
    let index = 0;

    while(booksContainer.firstChild) booksContainer.removeChild(booksContainer.firstChild);

    myLibrary.forEach(book => {
        let bookContainer = document.createElement('div');
        let title = document.createElement('div');
        let author = document.createElement('div');
        let page_number = document.createElement('div');
        let read = document.createElement('div');
        let readButton = document.createElement('button')
        let remove = document.createElement('div');
        let removeButton = document.createElement('button');

        bookContainer.classList.add('book');
        read.classList.add('read');
        remove.classList.add('remove');
        removeButton.classList.add('removeButton');
        
        if(!book.read){
            readButton.classList.add('notRead');
            readButton.textContent =  "Not read"
        }else{
            readButton.classList.add('readButton');
            readButton.textContent = "Read";
        }

        readButton.classList.add('statusButton');
        bookContainer.setAttribute('data-number', `${index}`);
        readButton.setAttribute('data-number', `${index}`);
        removeButton.setAttribute('data-number', `${index}`);

        title.textContent = `Title: ${book.title}`;
        author.textContent = `Author: ${book.author}`;
        page_number.textContent = `Pages: ${book.pageNumber}`;
        removeButton.textContent = "Remove";
        read.appendChild(readButton);
        remove.appendChild(removeButton);
        bookContainer.appendChild(title);
        bookContainer.appendChild(author);
        bookContainer.appendChild(page_number);
        bookContainer.appendChild(read);
        bookContainer.appendChild(remove);

        booksContainer.appendChild(bookContainer);
        index++;
    });

    //make aviable to modify read status and delete book 
    modifyReadStatus();
    removeBook();
}

function modifyReadStatus(){
    let statusButtons = document.querySelectorAll('.statusButton');
    statusButtons.forEach(button => {
        button.addEventListener('click', () => {
            if(button.classList.contains('readButton')){

                button.classList.remove('readButton');
                button.classList.add('notRead');
                button.textContent = "Not read";
                myLibrary[button.dataset.number].read = false;

            }else{
                button.classList.remove('notRead');
                button.classList.add('readButton');
                button.textContent = "Read";
                myLibrary[button.dataset.number].read = true;
            }
        });
    });
}

function removeBook(){
    let removeButtons = document.querySelectorAll('.removeButton');
    removeButtons.forEach(rButton => {
        rButton.addEventListener('click', () => {
            myLibrary.splice(myLibrary[rButton.dataset.number], 1);
            let parentdiv = document.querySelector(`[data-number="${rButton.dataset.number}"]`);
            booksContainer.removeChild(parentdiv);
            // update the new data attributes
            displayBooks();
        });
    });
}

addNewBook.addEventListener('click', () => {
    modal.setAttribute('style', 'display: flex;');

});

submitButton.addEventListener('click', () => {
    addBookToLibrary();
    modal.setAttribute('style', 'display: none');
});

closeIcon.addEventListener('click', () => {
    modal.setAttribute('style', 'display: none');
})