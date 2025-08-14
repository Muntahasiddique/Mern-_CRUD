import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Users from './Users';
import CreateUsers from './CreateUsers';
import UpdateUsers from './UpdateUsers';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.className = darkMode ? 'light-mode' : 'dark-mode';
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      
      <Routes>
        <Route path='/' element={<Users darkMode={darkMode} />} />
        <Route path='/create' element={<CreateUsers darkMode={darkMode} />} />
        <Route path="/update/:id" element={<UpdateUsers darkMode={darkMode} />} />
      </Routes>
    </div>
  );
}

export default App;