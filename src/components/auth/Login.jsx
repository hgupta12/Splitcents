import React from 'react'
import { useNavigate } from 'react-router-dom';
import {auth} from '../../firebase'
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';



const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError]=useState(0);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate('/');
    } catch (error) {
      console.error(error);
      setShowError(1);
     
    }
  };


  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <button type="submit">Log In</button>
      </div>
      {(showError==1)&&(<div>Login Failed</div>)}
    </form>
  )
}

export default Login