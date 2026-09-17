// general.js
// Task 10: Node.js client that uses Axios with async/await to talk to the
// RESTful book review service exposed by index.js (router/general.js).
//
// Run the server first:  node index.js
// Then run this file:    node general.js

const axios = require("axios");

const BASE_URL = "http://localhost:5000";

// 1. Get the list of all books available in the shop (async/await)
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log("\n--- All books ---");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("getAllBooks error:", error.message);
  }
}

// 2. Search by ISBN (Promise-based, using .then/.catch)
function getBookByISBN(isbn) {
  return axios
    .get(`${BASE_URL}/isbn/${isbn}`)
    .then((response) => {
      console.log(`\n--- Book with ISBN ${isbn} ---`);
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(`getBookByISBN(${isbn}) error:`, error.message);
    });
}

// 3. Search by Author (async/await)
async function getBookByAuthor(author) {
  try {
    const response = await axios.get(
      `${BASE_URL}/author/${encodeURIComponent(author)}`,
    );
    console.log(`\n--- Books by author "${author}" ---`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`getBookByAuthor(${author}) error:`, error.message);
  }
}

// 4. Search by Title (async/await)
async function getBookByTitle(title) {
  try {
    const response = await axios.get(
      `${BASE_URL}/title/${encodeURIComponent(title)}`,
    );
    console.log(`\n--- Books with title "${title}" ---`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`getBookByTitle(${title}) error:`, error.message);
  }
}

// Demo run: all four calls, none blocking the others thanks to
// Promises/async-await, so multiple requests can be in flight at once.
async function main() {
  await getAllBooks();
  await getBookByISBN("1");
  await getBookByAuthor("Jane Austen");
  await getBookByTitle("Fairy tales");
}

if (require.main === module) {
  main();
}

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBookByAuthor,
  getBookByTitle,
};
