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

  const q = "INSERT INTO `test`. `books` (`title`, `desc`, `cover`) VALUES (?);";

  const title = req.body.title;
  const desc = req.body.desc;
  const cover = req.body.cover;

  const values = [
    title,
    desc,
    cover,
  ]

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(`Book was created title: ${title}; description: ${desc}; cover: ${cover}`);
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
