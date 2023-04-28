import { Route, BrowserRouter, Routes } from 'react-router-dom';

import './App.css';

import Login from './pages/login/Login'
import { useEffect } from 'react';

function App() {
  const getConfiguration=()=>{
    fetch('configuration.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(res => res.json())
      .then(res => {
        sessionStorage.setItem("SERVER_API", res.api.server);
      });
  }
  
  useEffect(() => {
    getConfiguration()
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
          {/* <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
