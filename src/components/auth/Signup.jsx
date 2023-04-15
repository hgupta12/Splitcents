import React from 'react'
import {auth} from '../../firebase'
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {useState} from 'react';


const Signup = () => {
  const navigate = useNavigate();

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    
    
    const signInHandler = async (e) => {
      e.preventDefault();
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        auth.currentUser.displayName=name;
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    };
    


  return (
  <form onSubmit={signInHandler}>
    <div>
      <input placeholder="Full Name" type="text"
       onChange={(e) => setName(e.target.value)}
       required/> 
        </div>
        <div>
      <input placeholder= "Email" type="email"
       onChange={(e) => setEmail(e.target.value)}
       required/> 
        </div>
        <div>
      <input placeholder= "Password" type="password"
      onChange={(e) => setPassword(e.target.value)}
      required/> 
       </div>
       <div>
      <button type="submit">Sign In</button>
      </div>
      </form>
  )
}

export default Signup