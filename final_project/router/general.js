const express = require("express");
let books = require("../booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// ---------- Task 6: Register a new user ----------
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res
      .status(404)
      .json({
        message: "Unable to register user. Username and password are required.",
      });
  }

  if (isValid(username)) {
    users.push({ username, password });
    return res
      .status(200)
      .json({ message: "User successfully registered. Now you can login" });
  } else {
    return res.status(404).json({ message: "User already exists!" });
  }
});

// ---------- Task 1: Get the list of all books ----------
public_users.get("/", function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// ---------- Task 2: Get book details based on ISBN ----------
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json(book);
  } else {
    return res.status(404).json({ message: `No book found for ISBN ${isbn}` });
  }
});

// ---------- Task 3: Get book details based on author ----------
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  const matches = Object.keys(books)
    .filter((isbn) => books[isbn].author.toLowerCase() === author.toLowerCase())
    .map((isbn) => ({ isbn, ...books[isbn] }));

  if (matches.length > 0) {
    return res.status(200).json({ booksbyauthor: matches });
  } else {
    return res
      .status(404)
      .json({ message: `No books found for author '${author}'` });
  }
});

// ---------- Task 4: Get book details based on title ----------
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  const matches = Object.keys(books)
    .filter((isbn) => books[isbn].title.toLowerCase() === title.toLowerCase())
    .map((isbn) => ({ isbn, ...books[isbn] }));

  if (matches.length > 0) {
    return res.status(200).json({ booksbytitle: matches });
  } else {
    return res
      .status(404)
      .json({ message: `No books found for title '${title}'` });
  }
});

// ---------- Task 5: Get book review ----------
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({ message: `No book found for ISBN ${isbn}` });
  }
});

module.exports.general = public_users;
