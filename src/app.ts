import express, { Request, Response } from "express";
import loggerMiddleware from "./middleware/logger.middleware";
import bodyParser from "body-parser";
import employeeRouter from "./routes/employee_router";
import dataSource from "./db/data-source.db";
import HttpException from "./exception/http.exception";
import errorMiddleware from "./middleware/error.middleware";
import "reflect-metadata";
import deptRouter from "./routes/dept_router";


const app = express();
const PORT = 3000;
// Middleware to parse JSON requests
app.use(bodyParser.json());
// Define types for Book and Chapter
// interface Chapter {
//   id: number;
//   title: string;
// }
// interface Book {
//   id: number;
//   title: string;
//   author: string;
//   chapters: Chapter[];
// }
// // Simple in-memory database to store data
// let books: Book[] = [
//   {
//     id: 1,
//     title: "Sample Book 1",
//     author: "John Doe",
//     chapters: [
//       { id: 11, title: "Book 1 Chapter 1" },
//       { id: 12, title: "Book 1 Chapter 2" },
//       { id: 13, title: "Book 1 Chapter 3" },
//       { id: 14, title: "Book 1 Chapter 4" },
//       { id: 15, title: "Book 1 Chapter 5" },
//       { id: 16, title: "Book 1 Chapter 6" },
//     ],
//   },
//   {
//     id: 2,
//     title: "Sample Book 2",
//     author: "Jane Smith",
//     chapters: [
//       { id: 21, title: "Book 2 Chapter 1" },
//       { id: 22, title: "Book 2 Chapter 2" },
//       { id: 23, title: "Book 2 Chapter 3" },
//       { id: 24, title: "Book 2 Chapter 4" },
//       { id: 25, title: "Book 2 Chapter 5" },
//       { id: 26, title: "Book 2 Chapter 6" },
//       { id: 27, title: "Book 2 Chapter 7" },
//     ],
//   },
// ];
// let bookIdCount = books.length;
// function withoutProperty<T extends object, K extends keyof T>(obj: T, property: K): Omit<T, K> {
//   const { [property]: unused, ...rest } = obj;
//   return rest;
// }
// app.get("/book", (req: Request, res: Response) => {
//   let booksList = books.map((book) => withoutProperty(book, "chapters"));
//   res.json(booksList);
// });
// app.get("/bookId", (req: Request, res: Response) => {
//   const id = parseInt(req.query.id as string);
//   const book = books.find((book) => book.id === id);
//   if (book) {
//     res.json(withoutProperty(book, "chapters"));
//   } else {
//     res.status(404).json({ message: "Book not found" });
//   }
// });
// app.post("/createBook", (req: Request, res: Response) => {
//   const { title, author } = req.body;
//   bookIdCount += 1;
//   const newBook: Book = { id: bookIdCount, title, author, chapters: [] };
//   books.push(newBook);
//   res.status(201).json(newBook);
// });
app.use(loggerMiddleware);
app.use('/employee', employeeRouter);
app.use('/department', deptRouter);
app.use(errorMiddleware);

  (async () => {
    try {
      await dataSource.initialize();
    } catch (e) {
      console.log("Failed to connect to db", e);
      process.exit(1);
    }

    
  
    app.listen(3000, () => {
      console.log("server listening to 3000");
    });
  })();

// Start the server











