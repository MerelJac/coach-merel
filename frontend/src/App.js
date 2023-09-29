import React, { useEffect } from 'react';
import './App.css';
import './index.css'
import './assets/css/form.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import { Login } from './components/Login'
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header';
import { Create } from './components/Create'
import { AccountInfo } from './components/AccountInfo';
import { SeeStatsPage } from './components/SeeStats';

import { auth } from './utils/auth';


  function App() {
    // TODO - add auth routes - see class example

    // const [loggedIn, setLoggedIn] = useState(false); 
  
    // useEffect(() => {
    //   const checkAuth = async () => {
    //     const authenticated = await auth();
    //     setLoggedIn(authenticated); 
    //   };
  
    //   checkAuth();
    // }, []);

  return (
    <BrowserRouter>
    <div className="App">
    <Header/>
      <Routes>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/' element={<Dashboard/>}/>
        <Route exact path='/create' element={<Create/>}/>
        <Route exact path='/stats' element={<SeeStatsPage/>}/>
        <Route exact path='/account-info' element={<AccountInfo/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
