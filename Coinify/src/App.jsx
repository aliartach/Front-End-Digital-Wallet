import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from  './client side/pages/Home/HomePage.jsx'
import Registerpage from './client side/pages/RegisterPage/Registerpage.jsx'
import Navbar from './client side/components/Navbar/Navbar.jsx';
function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function App() {
  return (
  
    <BrowserRouter>
     
      <ScrollToTop />
      <div className='pages'>
      <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/Registerpage' element={<Registerpage />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;