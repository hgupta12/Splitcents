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
    <div >

<div className="login">
      <form className="mt-24 w-1/3 py-4 px-5 h-auto text-center m-auto rounded-lg shadow-sm"onSubmit={handleLogin}>
        <input
         placeholder="Email" type="email" className="p-4 w-full border-b-2 focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password" type="password" className="p-4 w-full border-b-2 focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div >
        <button type="submit" className="py-2 px-3 my-3 shadow-lg w-full rounded-xl">Login</button></div>
        {error && <span>Wrong email or password!</span>}
        <div>Don't have an account? <a className="text-blue-500 hover:cursor-pointer 
        hover:underline" onClick={signup}>Sign Up</a></div>
      </form>
    </div>
     
     
     <div className='flex justify-center' >
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center focus:outline-none focus:shadow-outline"
 onClick={handleLoginWithGoogle}>
   <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M42 24c0-1.2-.1-2.3-.3-3.4H24v6.4h8.9c-.4 2.3-2.2 6.8-8.9 6.8-5.4 0-9.8-4.4-9.8-9.8s4.4-9.8 9.8-9.8c2.6 0 4.4 1.1 5.4 1.9l3.7-3.6c-2.3-2.1-5.3-3.4-8.9-3.4-7.4 0-13.4 6-13.4 13.4s6 13.4 13.4 13.4c8.1 0 12.9-5.7 13.4-6.4l-13-5c-.2-.9-.3-1.8-.3-2.6z"/></svg>Sign in With google</button>
    </div>
    </div>
  )
};
export default Login;