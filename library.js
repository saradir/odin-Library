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
        console.log(book);
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        const bookName = document.createTextNode(book.title);
        console.log(book.title);

        bookDiv.appendChild(bookName);
        bookshelf.appendChild(bookDiv);
    }
}

const book1 = new Book('title' ,'author','230', true);
myLibrary.push(book1);