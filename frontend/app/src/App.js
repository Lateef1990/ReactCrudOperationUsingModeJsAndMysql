import './App.css';
import{
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Add from './Pages/Add';
import Book from './Pages/Book';
import Update from './Pages/Update';
import  "./style.css"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element ={<Book/>}/>
        <Route path="/add" element ={<Add/>}/>
        <Route path="/update/:id" element ={<Update/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
