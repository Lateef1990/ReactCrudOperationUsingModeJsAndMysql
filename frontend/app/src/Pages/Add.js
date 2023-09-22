// import React, {useState} from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';

// const Add = () => {
//     const [book, setBook] = useState({
//         title: "",
//         desc: "",
//         price: null,
//         cover: "",
//     });

//     const navigate = useNavigate()

//     const handleChange = (e) =>{
//         setBook((prev)=>({...prev, [e.target.name]: e.target.value}));
//     };
//     const handleClick = async e =>{
//         e.preventDefault()
//         try{
//             await axios.post("http://localhost:8800/AddBook", book)
//             navigate("/")
//         } catch(err){
//             console.log(err)
//         }
//     }
//   return (
//     <div className="form">
//         <h1>Add New Book</h1>
//         <input type="text" placeholder="Title of the Book" onChange={handleChange} name="title"/>
//         <input type="text" placeholder="desc" onChange={handleChange} name="desc"/>
//         <input type="number" placeholder="price" onChange={handleChange} name="price"/>
//         <input type="file" placeholder="Cover" onChange={handleChange} name="cover"/>

//         <button className="formButton" onClick={handleClick}>Add Book</button>
//     </div>
//   )
// }

// export default Add

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  Button  from '@mui/material/Button';


const Add = () => {
  const [book, setBook] = useState({
    title: '',
    desc: '',
    price: '',
    cover: null, // Use null for file input
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setBook((prev) => ({ ...prev, cover: e.target.files[0] }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('desc', book.desc);
    formData.append('price', book.price);
    formData.append('cover', book.cover);

    try {
      await axios.post('http://localhost:8800/AddBook', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input type="text" placeholder="Title of the Book" onChange={handleChange} name="title" />
      <input type="text" placeholder="Description" onChange={handleChange} name="desc" />
      <input type="number" placeholder="Price" onChange={handleChange} name="price" />
      <input type="file" onChange={handleFileChange} name="cover" />

      <Button  variant="contained" color="primary" className="formButton" onClick={handleClick}>
        Add Book
      </Button>
    </div>
  );
};

export default Add;
