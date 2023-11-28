// CommonParentComponent.jsx
import React, { useState } from 'react';
import HomePage from './Home/HomePage.jsx';
import Registerpage from './RegisterPage/Registerpage.jsx';

const CommonParentComponent = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggle = () => {
    setIsSignIn((prevState) => !prevState);
  };

  return (
    <>
      <HomePage isSignIn={isSignIn} toggle={toggle} />
      <Registerpage isSignIn={isSignIn} toggle={toggle} />
    </>
  );
};

export default CommonParentComponent;
