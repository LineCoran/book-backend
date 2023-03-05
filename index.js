import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const PORT = 4000;
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'f2lollpll',
  database: 'test',
})

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.post('/books', (req, res) => {

  const q = "INSERT INTO `test`. `books` (`title`, `desc`, `cover`, `price`) VALUES (?);";

  const title = req.body.title;
  const desc = req.body.desc;
  const cover = req.body.cover;
  const price = req.body.price;

  const values = [
    title,
    desc,
    cover,
    price,
  ]

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(`Book was created title: ${title}; description: ${desc}; cover: ${cover} price: ${price}`);
  })
})

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(`Book has been deleted id ${bookId}`);
  })
})

app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books set `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ]

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated succesfully!");
  })
})

app.get('/', (req, res) => {
  res.json('Hello Nadya')
})

app.get('/books', (req, res) => {
  const q = 'SELECT * FROM books';
  db.query(q, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})
