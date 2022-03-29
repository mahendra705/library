const express = require("express");
const libraryRoutes = express.Router();
const fs = require("fs");

const dataPath = "./data/library.json";

// util functions

const saveBookData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(dataPath, stringifyData);
};

const getBookData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

const saveItemOnDatabase = (bookname, callback) => {
  setTimeout(() => {
    callback(Date.now());
  }, Math.random() * bookname.length);
};

const getBookList = (list, index) => {
  if (index == list.length - 1) {
    return list[index]["title"];
  } else {
    return list[index]["title"] + "," + getBookList(list, index + 1);
  }
};

// Read - get all books from the json file
libraryRoutes.get("/list", (req, res) => {
  const books = getBookData();
  res.send(books);
});

libraryRoutes.post("/book", (req, res) => {
  //get the existing books
  const existBooks = getBookData();

  //get the new book data from post request
  const bookData = req.body;

  //check if the bookData fields are missing
  if (bookData.title == null || bookData.title.trim() == "") {
    return res.status(401).send({ error: true, msg: "Book title missing" });
  }

  //check if the bookData exist already
  const findExist = existBooks.find((book) => book.title === bookData.title);
  if (findExist) {
    return res.status(409).send({ error: true, msg: "book already exist" });
  }

  //append the book data
  existBooks.push(bookData);

  //save the new book data
  saveBookData(existBooks);
  res.send({ success: true, msg: "Book added successfully" });
});

/* Update - Patch method */
libraryRoutes.patch("/book", (req, res) => {
  //get the update data
  const bookData = req.body;

  //get the bookname from body
  const bookname = bookData["original_book"];

  //check if the bookData fields are missing
  if (bookname == null || bookname.trim() == "") {
    return res.status(401).send({ error: true, msg: "Book title missing" });
  }

  //get the new bookname from body
  const newBookname = bookData["new_book"];

  //check if the bookData fields are missing
  if (newBookname == null || newBookname.trim() == "") {
    return res.status(401).send({ error: true, msg: "New Book title missing" });
  }

  //get the existing books
  const existBooks = getBookData();

  //check if the bookname exist or not
  const findExist = existBooks.find((book) => book.title === bookname);
  if (!findExist) {
    return res.status(409).send({ error: true, msg: "book not exist" });
  }

  //update the bookData
  existBooks.forEach((book) => {
    if (book.title == bookname) {
      book.title = newBookname;
    }
  });

  //finally save it
  saveBookData(existBooks);
  res.send({ success: true, msg: "Book data updated successfully" });
});

//delete - using delete method
libraryRoutes.delete("/book/:bookname", (req, res) => {
  const bookname = req.params.bookname;

  //get the existing booksdata
  const existBooks = getBookData();

  //filter the bookdata to remove it
  const filterBooks = existBooks.filter((book) => book.title !== bookname);

  if (existBooks.length === filterBooks.length) {
    return res
      .status(409)
      .send({ error: true, msg: "book name does not exist" });
  }

  //save the filtered data
  saveBookData(filterBooks);
  res.send({ success: true, msg: "Book removed successfully" });
});

//put - using put method
libraryRoutes.put("/book", (req, res) => {
  //get the existing booksdata
  const existBooks = getBookData();
  let simulateArr = {};
  const start = Date.now();
  for (let i = 0; i < existBooks.length; i++) {
    saveItemOnDatabase(existBooks[i].title, (data) => {
      let delay = data - start;
      simulateArr[existBooks[i].title] = delay;
      if (i == existBooks.length - 1) {
        res.send(simulateArr);
      }
    });
  }
});

//get - using get method
libraryRoutes.get("/", (req, res) => {
  //get the existing booksdata
  const existBooks = getBookData();
  const result = getBookList(existBooks, 0);
  res.send(result);
});

module.exports = libraryRoutes;
