const myLibrary =[];
const bookshelf = document.querySelector('.bookshelf');

class Book{
    constructor(title, author, pagesNum, status){
        this.title = title;
        this.author = author;
        this.pagesNum = pagesNum;
        this.read = status;
    }

    showInfo(){
        return(`${this.title} by ${this.author}, ${pagesNum} pages, ${this.status}`);
    }

    changeStatus(){
            this.read = !this.read;
        }
}

function addBook(book){
    myLibrary.push(book);
}

function removeBook(bookIndex){
    myLibrary.splice(bookIndex,1);
}

/* helper function to update shelf div */
function clearShelf(){
    bookshelf.innerHTML = '';
}

function toggleStatus(icon, bookIndex){

    const book = myLibrary[bookIndex];
    book.read = !book.read;

    if(book.read){
        icon.src = 'icons/icon_read.svg';
    }else{
        icon.src = 'icons/icon_unread.svg';

    }

    }

function updateBookshelf(){

    bookshelf.innerHTML = ''; // clean display
    for(let i = 0; i < myLibrary.length; i++){
        const book = myLibrary[i];
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.dataset.index = i;  // associate div with book element
        const bookName = document.createTextNode(book.title);

        const readIcon = document.createElement('img');
        const deleteIcon = document.createElement('img');
        const addIcon = document.createElement('img');


        const bookStatus = book.read? 'read':'unread';
        addIcon.src = "icons/icons8-plus.svg";
        addIcon.className = "icon add";
        addIcon.id = "addButton";
        readIcon.src = `icons/icon_${bookStatus}.svg`
        readIcon.className =`icon status`;
        readIcon.id = "statusIcon";
        deleteIcon.className= 'icon trash';
        deleteIcon.id = "deleteIcon";
        deleteIcon.src = "icons/icons8-trash.svg"
        bookDiv.appendChild(bookName);
        bookDiv.appendChild(readIcon);
        bookDiv.appendChild(deleteIcon);
        bookshelf.appendChild(bookDiv);
        bookshelf.appendChild(addIcon);
    }
}

/* set up sidebar */
const bookSidebar = document.querySelector('#book-sidebar');

function showForm(){
    bookSidebar.innerHTML = `
    <h3> Add New Book </h3>
    <form id="addForm">
        <label for="title">Book Title:</label>
        <input type="text" id="title" name="title">
        <label for="author">Author Name:</label>
        <input type="text" id="author" name="author">
        <label for="page-num">Number of Pages:</label>
        <input type="text" id="page-num" name="pages">
        <div class="radio-buttons">
            <legend>Status:</legend>
            <input type="radio" name="status" id="status1" value=false>
            <label for="status1">Not Read Yet</label>
            <input type="radio" name="status" id="status2" value=true>
            <label for="status2">Read</label>
        </div>

        <button type="submit">Add Book</button>
    </form>
    `;
    setupForm();
}

function showBook(book){
    bookSidebar.innerHTML = `
    <h3>${book.title}</h3>
    <span class="bold">Author:</span><span> ${book.author}</span>
    <span class="bold">Number of Pages:</span><span> ${book.pagesNum}</span>
    <span class="bold">Status:</span><span> ${book.read === true? 'read':'not read yet'}</span>
    `
}


bookshelf.addEventListener('click', (e) =>{

    const index = e.target.parentElement.dataset.index;
    if(e.target.className === "book"){
        showBook(myLibrary[e.target.dataset.index]);
    } else if(e.target.className === "icon add"){
        showForm();
    }
    else{
    
        const index = e.target.parentElement.dataset.index;
        switch(e.target.className){

            case "icon status":
                toggleStatus(e.target, index);
                break;
        

            case "icon trash":
                removeBook(index);
                clearShelf();
                updateBookshelf();
                break;
        }
        }
    }
)

/* code to add event listener to form when shown */
function setupForm(){
    const form = document.querySelector('#addForm');

    if(form){
        form.addEventListener('submit', (e)=>{
            e.preventDefault();
            const formData = new FormData(form);
            const title = formData.get('title');
            const author = formData.get('author');
            const numPages = formData.get('pages');
            const status = JSON.parse(formData.get('status')); // here we convert formData's string to boolean

            const newBook = new Book(title, author, numPages, status);
            addBook(newBook);
            updateBookshelf();

            // reset form
            form.reset();
        })
    }
}

/* initial book set up for testing */
const book1 = new Book('Lord of the Rings' ,'Tolkien','900', true);
const book2 = new Book('Dune' ,'Frank Herbert','430', true);
const book3 = new Book('Book of the New Sun' ,'Gene Wolfe','600', true);
const book4 = new Book('Solaris' ,'Stanislaw Lem','380', true);
const book5 = new Book('Blame!' ,'author','230', true);

myLibrary.push(book1, book2, book3, book4, book5);

updateBookshelf();