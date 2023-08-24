import React from 'react';
import './App.css';
import './index.css'
import './assets/css/form.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import { Login } from './components/Login'
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard'

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/' element={<Dashboard/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
