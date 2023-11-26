import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './client side/pages/HomePage.jsx';

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
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/SigninPage' element={<HomePage />} />
          <Route path='/RegisterPage' element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;