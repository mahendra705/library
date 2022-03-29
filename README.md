# NodeJS Library

Getting started
-------------------
-Clone this repo
-npm install (to install all required dependencies)
-npm start (to start the local server)
-npm test (to run unit test cases)
-server will start running on http://localhost:3000


API Details
----------------

1. GET all books
   url: http://localhost:3000/
   type: GET
   description:get all book list as comma seperated.

2. Add new book in the library
   url: http://localhost:3000/book
   type: POST
   data format: { title: "some book title" }

   description:add new book in the library

3. Update book title in the library
   url: http://localhost:3000/book
   type: PATCH
   data format: { original_book: "some book title", new_book: "some book title" }

   description:update book in the library

4. Delete book from the library
   url: http://localhost:3000/book/:bookname
   type: DELETE

   description:delete book from the library (pass bookname in url)

5. Simulate asynchronous persistence of the current book list to a database
   url: http://localhost:3000/book
   type: PUT

   description:Simulate asynchronous persistence of the current book list to a database



