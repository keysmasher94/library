const books = document.querySelector(".books");
const dialog = document.querySelector("#book-dialog");
const form = document.querySelector("#book-form");
const addBookBtn = document.querySelector(".add-book");

const myLibrary = [];

function Book(name, author, year, read) {
  // The constructor
  this.name = name;
  this.author = author;
  this.year = year;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(name, author, year, read) {
  const newBook = new Book(name, author, year, read);
  myLibrary.push(newBook);
}

function displayBooks() {
  // Clear the container before rendering
  books.innerHTML = "";
  for (book of myLibrary) {
    // Create a new book card and info section
    const bookCard = document.createElement("div");
    const infoSection = document.createElement("div");
    // Add a details to the bookcard
    const title = document.createElement("h2");
    title.textContent = book.name;

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    const year = document.createElement("p");
    year.textContent = `Year Published: ${book.year}`;

    const id = document.createElement("p");
    id.textContent = `ID: ${book.id}`;

    const read = document.createElement("p");
    if (book.read === true) {
      read.textContent = "This book has been read";
      read.style.color = "green";
      read.style.fontWeight = 600;
    } else {
      read.textContent = "This book has not yet been read";
      read.style.color = "red";
      read.style.fontWeight = 600;
    }

    // Add delete button
    // FIXME: this should remove the book from the array as well
    const del = document.createElement("button");
    del.textContent = "Delete Book";
    del.addEventListener("click", () => {
      books.removeChild(bookCard);
    });

    // Add the book card to the list of books
    bookCard.appendChild(title);
    infoSection.appendChild(author);
    infoSection.appendChild(year);
    infoSection.appendChild(id);
    infoSection.appendChild(read);
    infoSection.appendChild(del);
    bookCard.appendChild(infoSection);
    books.appendChild(bookCard);
  }
}

// Opens the dialog box
addBookBtn.addEventListener("click", () => {
  form.reset();
  dialog.showModal();
});

// Gets data from the dialog box
dialog.addEventListener("close", () => {
  if (dialog.returnValue !== "submit") {
    return;
  }
  const data = new FormData(form);

  addBookToLibrary(
    data.get("name"),
    data.get("autho"),
    Number(data.get("year")),
    data.get("read") === "true",
  );
  displayBooks();
});

// Displays initial books on page load
displayBooks();
