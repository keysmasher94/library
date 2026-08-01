/*
 * <one line to give the program's name and a brief idea of what it does.>
 *   'The' Library - A simple web app that keeps track of book details; part of
 *   TOP
 *   Copyright (C) 2026  Jared Lynch
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/* TODO:
 * Future desires:
 * - Add a search function
 * - Add pictures
 * - Add a sort function
 * - Add a toggle to switch between current books and wishlist books
 * - Add persistent memory
 */

const books = document.querySelector(".books");
const dialog = document.querySelector("#book-dialog");
const form = document.querySelector("#book-form");
const addBookBtn = document.querySelector(".add-book");
const secondHeading = document.querySelector(".second-heading");
const yearInput = document.querySelector("#year");

const myLibrary = [];

function Book(name, author, year, read) {
  // The constructor
  this.name = name;
  this.author = author;
  this.year = year;
  this.read = read;
  this.id = crypto.randomUUID();
  this.changeRead = function () {
    if (this.read === true) {
      this.read = false;
    } else {
      this.read = true;
    }
  };
}

function addBookToLibrary(name, author, year, read) {
  const newBook = new Book(name, author, year, read);
  myLibrary.push(newBook);
}

function displayBooks() {
  // Clear the container before rendering
  books.innerHTML = "";

  // Write string if there are no books
  if (myLibrary.length === 0) {
    secondHeading.textContent = "Press '+' to add a book";
    return;
  } else {
    secondHeading.textContent = "Current Books";
  }

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
    id.textContent = `Library ID: ${book.id.slice(0, 8)}`;

    const read = document.createElement("p");
    if (book.read === true) {
      read.textContent = "This book has been read";
      read.style.color = "green";
      read.style.fontWeight = 900;
    } else {
      read.textContent = "This book has not yet been read";
      read.style.color = "red";
      read.style.fontWeight = 900;
    }

    // Add delete button
    const del = document.createElement("button");
    del.textContent = "Delete Book";
    del.addEventListener("click", () => {
      books.removeChild(bookCard);
      const indexNo = myLibrary.indexOf(book);
      myLibrary.splice(indexNo, 1);
    });

    // Add a button to change the 'read' status
    const changeRead = document.createElement("button");
    changeRead.textContent = "Change Read Status";
    changeRead.addEventListener("click", () => {
      book.changeRead();
      displayBooks();
    });

    // Add the book card to the list of books
    bookCard.appendChild(title);
    infoSection.appendChild(author);
    infoSection.appendChild(year);
    infoSection.appendChild(id);
    infoSection.appendChild(read);
    infoSection.appendChild(del);
    infoSection.appendChild(changeRead);
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
    data.get("author"),
    Number(data.get("year")),
    data.get("read") === "true",
  );
  displayBooks();
});

// Validates year input
yearInput.addEventListener("input", () => {
  yearInput.setCustomValidity("");
  yearInput.checkValidity();
});

yearInput.addEventListener("invalid", () => {
  if (yearInput.value === "") {
    yearInput.setCustomValidity("Enter a year");
  } else {
    yearInput.setCustomValidity("Enter a year from 100-2999");
  }
});

// Displays initial books on page load
displayBooks();
