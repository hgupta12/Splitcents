
import React from 'react';
import { signInWithPopup,signInWithEmailAndPassword} from 'firebase/auth';
import {auth,provider,db} from '../../firebase.js';
import { useContext,useState } from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/Authcontext.jsx';
import {doc,getDoc} from "firebase/firestore";
const Login = () => {
  
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate = useNavigate();
const {dispatch} = useContext(AuthContext);

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const authUser = userCredential.user;

    const docRef = doc(db, "users", authUser.uid);
    const docSnap = await getDoc(docRef);
    const matchingUser = docSnap.data();

    if (matchingUser) {
      const name = matchingUser.Name;

      dispatch({ type: "LOGIN", payload: { user: authUser, name: name } });
      navigate("/");
    }
  } catch (error) {
    console.log(error);
    setError(true);
  }
};

const signup=() =>{
  navigate('/signup');
}

 const handleLoginWithGoogle= async ()=>{
await signInWithPopup(auth,provider).then((userCredential)=>{
const user = userCredential.user;
       dispatch({type:"LOGIN", payload:user});
       navigate("/");
       console.log(userCredential.user);
}).catch((err)=>{
      console.log(err.message);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

<div className="bg-white p-8 rounded-lg shadow-lg ">
<h2 className="text-2xl font-bold mb-4">LOG IN </h2>
  
      <form onSubmit={handleLogin}>
        <div className="mb-4">
        <input className="w-full border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
         placeholder="Email" type="email" 
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className='mb-4'>
        <input className="w-full border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Password" type="password" 
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <div className='flex justify-center'>
        <button type="submit" className=" m-4 bg-green-900 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded flex items-center focus:outline-none focus:shadow-outline">Login</button></div>

        {error && <span>Wrong email or password!</span>}
        <div>Don't have an account? <a className="text-blue-500 hover:cursor-pointer 
        hover:underline" onClick={signup}>Sign Up</a></div>
      </form>

    
     
     <p className='flex justify-center m-2'>OR</p>
     <div className='flex justify-center m-3'>"
      <button className=" bg-gray-900 hover:bg-green-900 text-white font-bold py-2 px-4 rounded flex items-center focus:outline-none focus:shadow-outline"
 onClick={handleLoginWithGoogle}>
   <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M42 24c0-1.2-.1-2.3-.3-3.4H24v6.4h8.9c-.4 2.3-2.2 6.8-8.9 6.8-5.4 0-9.8-4.4-9.8-9.8s4.4-9.8 9.8-9.8c2.6 0 4.4 1.1 5.4 1.9l3.7-3.6c-2.3-2.1-5.3-3.4-8.9-3.4-7.4 0-13.4 6-13.4 13.4s6 13.4 13.4 13.4c8.1 0 12.9-5.7 13.4-6.4l-13-5c-.2-.9-.3-1.8-.3-2.6z"/></svg>Sign in With Google</button>
    </div></div>
    </div>
  )
};

export default Login;