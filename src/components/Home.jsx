import React from 'react';
import LoginContext from './auth/logincontext';
import { useContext } from 'react';
const Home = () => {
  const {displayName}=useContext(LoginContext);
  return (
    <div> 
      <p>welcome {displayName&&displayName}</p>
    </div>
  )
}

export default Home;