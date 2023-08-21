import React, { useState } from 'react';
import './App.css';
import './index.css'
import './assets/css/form.css'

import { Login } from './components/Login'
import { Register } from './components/Register'

function App() {

  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }

  return (
    <div className="App">
      {/* render login/register pages */}
      {
        currentForm === 'login' ? < Login onFormSwitch={toggleForm}/> : < Register onFormSwitch={toggleForm}/>
      }

    </div>
  );
}

export default App;
