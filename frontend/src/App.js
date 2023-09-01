import React, { useState } from 'react';
import './App.css';
import './index.css'
import './assets/css/form.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
// import ReactHeap from 'reactjs-heap';



import { Login } from './components/Login'
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header';
import { Create } from './components/Create'
import { AccountInfo } from './components/AccountInfo';

function App() {
  // ReactHeap.initialize('<insert ID>');

  // set token
  const [token, setToken] = useState()

  if (!token) {
    return(
    <BrowserRouter>
    <div className="App">
    <Header/>
      <Routes>
        <Route exact path='/login' element={<Login setToken={setToken}/>}/>
        <Route exact path='/register' element={<Register/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
    <div className="App">
    <Header/>
      <Routes>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/' element={<Dashboard/>}/>
        <Route exact path='/create' element={<Create/>}/>
        <Route exact path='/account-info' element={<AccountInfo/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
