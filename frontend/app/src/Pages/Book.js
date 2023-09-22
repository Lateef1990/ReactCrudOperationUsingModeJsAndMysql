import React, { useEffect } from 'react'
import {useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import  Button  from '@mui/material/Button';

const Book = () => {
  const [books, setBooks] = useState([])

  useEffect(()=>{
    const fetchAllBooks = async ()=>{
      try{
        const res  = await axios.get("http://localhost:8800/books")
        console.log(res.data) 
       setBooks(res.data);
      }catch(err){
        console.log(err)
      }
    }
    fetchAllBooks()
  }, [])

  const handleDelete = async (id)=>{
    try{
      await axios.delete("http://localhost:8800/DeleteBook/"+id)
      window.location.reload()
    }catch(err){
      console.log(err)
    }
  } 
  return (
    <div>
      <h1 className='h1'>Johson Book Shop</h1>
      <div className='books'>
        {books.map((book) => (
          <div className='book' key={book.id}>
            {<img src={`http://localhost:3000/images/`+ book.cover} alt=""/>}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            <Button variant="contained" color="error" className="delete" onClick={()=>handleDelete(book.id)}>Delete</Button>
            <Button variant="contained" color="primary" className="update"><Link className="a" to ={`/update/${book.id}`}>Update</Link></Button>  
            </div>
        ))}
      </div>
      <br/>
      <Button variant="contained" color="primary"><Link  className="a" to="/add">Add New Book</Link></Button>
    
    </div>
  )
}

export default Book

