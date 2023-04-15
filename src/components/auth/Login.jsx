import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import {auth,provider} from '../../firebase.js';
//import LoginContext from './logincontext.js';
const Login = () => {
  const handleLoginWithGoogle= async ()=>{
    try{
const result=await signInWithPopup(auth,provider);
localStorage.setItem("userName",result.user.displayName);
 }
    catch(err){
      alert(err.message);
    }
  }
  return (
    <div>
      <button  onClick={handleLoginWithGoogle}>Sign in With google</button>
    </div>
  )
};
export default Login;