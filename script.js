const addBookBtn = document.querySelector(".add-book-btn");
const backBtn = document.querySelector(".back-btn");

const toggleFormDisplay = isVisible => {
    const formEl = document.querySelector("#form");
    formEl.style.display = isVisible ? "block" : "none";
}

// TOGGLE TO OPEN AND CLOSE THE FORM
addBookBtn.addEventListener('click', () => {toggleFormDisplay(true)});
backBtn.addEventListener('click', () => {toggleFormDisplay(false)});

const myLibrary = [];

function Book(title, author, page, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read || false;
}

const renderCard = () => {
    const cardsContainer = document.querySelector(".cards-container");
    cardsContainer.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const card = document.createElement('div');
        
        card.innerHTML = `
            <img src="icons/trash-can-outline.svg" id="delete-btn" onclick="deleteBook(${i})">
            <div>
                <p class="card-title">${book.title}</p>
                <p class="card-author">By: ${book.author}</p>
                <p class="card-page">${book.page} pages</p>
            </div>
            <button class="read-btn">${book.read ? "Mark as unread" : "Mark as read"}</button>
        `;
        const icon = card.querySelector("#delete-btn");
        updateBackgroundColor(card, icon, book.read);
        card.classList.add('card');
        cardsContainer.appendChild(card);


        const readBtn = card.querySelector('.read-btn');
        readBtn.addEventListener('click', () => {
            book.read = !book.read;
            updateBackgroundColor(card, icon, book.read);
            readBtn.textContent = book.read ? "Mark as unread" : "Mark as read";
            
        })
        
    }
    
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    renderCard();
    console.log("hello")
}

const updateBackgroundColor = (card, icon, isRead) => {
    if (isRead) {
        card.style.border = "5px solid #59CE8F";
        card.style.color = "#FFFFFF";
        card.style.backgroundColor = "#000000";
        icon.style.filter = "invert(100%)"
    } else {
        card.style.border = "5px solid #FF1E00";
        card.style.color = "#000000"
        card.style.backgroundColor = "#FFFFFF";
        icon.style.filter = "invert(0)"
    }
}

const addBookToLibrary = () => {
    const titleInput = document.querySelector("#title");
    const authorInput = document.querySelector("#author");
    const pagesInput = document.querySelector("#pages");

    const title = toTitleCase(titleInput.value.trim());
    const author = toTitleCase(authorInput.value.trim());
    const pages = pagesInput.value.trim();

    if(!validateInput(title, author, pages)) {
        return;
    };

    const newBook = new Book(title, author, pages);
    myLibrary.push(newBook);
    renderCard();

    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";

}

const validateInput = (title, author, page) => {

    if (isNaN(page) || page <= 0) {
        alert("Invalid number of pages, try again.")
        return false;
    }

    if (title === "" || author === "" || page === "") {
        alert("Please fill up all input fields.")
        return false;
    }

    return true;
}

const toTitleCase = (word) => {
    return word
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

const confirmBtn = document.querySelector('.confirm-btn');
confirmBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addBookToLibrary()
});
