import express  from "express"
import mysql  from "mysql"
import cors from "cors"
import multer from 'multer'
import path from 'path'

const db =  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "book"
})


const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static(('public')))

app.get("/", (req,res)=>{
    res.json("Hello this is the Backend")
})

app.get("/books", (req,res)=>{
    const q = "SELECT * FROM book1"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)    
    })
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../frontend/app/public/images');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
  });

const upload = multer({
    storage: storage
});
app.post('/AddBook', upload.single('cover'), (req, res) => {
    const q = 'INSERT INTO book1 (`title`,`desc`,`cover`,`price`) VALUES (?, ?, ?, ?)';
    const values = [req.body.title, req.body.desc, req.file.filename, req.body.price];
  
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err); // Sending 500 status on error
      return res.json('Book has been created successfully');
    });
  });
  
app.delete("/DeleteBook/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM book1 WHERE  id= ?"

    db.query(q, [bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("book has been deleted successfully")
    })
})

app.put("/UpdateBook/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE book1 SET `title` =?, `desc` =?, `price` =? WHERE  id= ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price
    ]
    db.query(q, [...values, bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("book has been Updated successfully")
    })
})

app.listen(8800, ()=>{
    console.log("Connected to Backend")
})