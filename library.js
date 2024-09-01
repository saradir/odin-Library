const myLibrary =[];

function Book(title, author, pagesNum, status){
    this.title = title;
    this.author = author;
    this.pagesNum = pagesNum;
    this.read = false;

    this.info = function(){
        return(`${this.title} by ${this.author}, ${pagesNum} pages, ${status}`);
    }

    this.changeStatus = function(){
            this.read = !this.read;
        }

    function addBook(book){
        myLibrary.push(book);
    }
}

function displayBooks(){

    const bookshelf = document.querySelector('.bookshelf');
    for(const book of myLibrary){
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        const bookName = document.createTextNode(book.title);

        const readIcon = document.createElement('img');
        const deleteIcon = document.createElement('img');

        readIcon.src = "icons/icon_unread.svg"
        readIcon.className ='icon unread';
        deleteIcon.className= 'icon trash';
        deleteIcon.src = "icons/icons8-trash.svg"
        bookDiv.appendChild(bookName);
        bookDiv.appendChild(readIcon);
        bookDiv.appendChild(deleteIcon);
        bookshelf.appendChild(bookDiv);
    }
}

/* set up sidebar */
const bookSidebar = document.querySelector('#book-sidebar');

function showForm(){
    bookSidebar.innerHTML = `
    <h3> Add New Book </h3>
    <form id ="addForm">
        <label for="title">Book Title:</label>
        <input type="text" id="title" name="title">
        <label for="author">Author Name:</label>
        <input type="text" id="author" name="author">
        <label for="page-num">Number of Pages:</label>
        <input type="text" id="page-num" name="pages">
        <div class="radio-buttons">
            <legend>Status:</legend>
            <input type="radio" name="status1" id="status1" value="unread">
            <label for="status1">Not Read Yet</label>
            <input type="radio" name="status2" id="status2" value="read">
            <label for="status2">Read</label>
        </div>

        <button type="submit">Add Book</button>
    </form>
    `;
}

function showBook(book){
    bookSidebar.innerHTML = `
    <h3>${book.title}</h3>
    <span>Author:${book.author}</span>
    <span>Number of Pages:${book.pagesNum}</span>
    <span>Status:${book.read === 'true'? 'read':'not read yet'}</span>
    `
}

const book1 = new Book('title' ,'author','230', true);
myLibrary.push(book1);