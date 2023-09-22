import React, {useState} from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import  Button  from '@mui/material/Button';

const Update = () => {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });

    const navigate = useNavigate()
    const location = useLocation()
    const bookId = location.pathname.split("/")[2];
    const handleChange = (e) =>{
        setBook((prev)=>({...prev, [e.target.name]: e.target.value}));
    };
    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.put("http://localhost:8800/UpdateBook/"+ bookId, book)
            navigate("/")
        } catch(err){
            console.log(err)
        }
    }
  return (
    <div className="form">
        <h1>Update Book</h1>
        <input type="text" placeholder="Title of the Book" onChange={handleChange} name="title"/>
        <input type="text" placeholder="desc" onChange={handleChange} name="desc"/>
        <input type="number" placeholder="price" onChange={handleChange} name="price"/>

        <Button variant="contained" color="primary" onClick={handleClick}>Update Book</Button>
    </div>
  )
}


export default Update
