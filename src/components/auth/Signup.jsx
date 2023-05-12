


import { useContext, useState } from "react";
import { auth, db} from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import {doc, setDoc, collection} from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/Authcontext";


const Signup = () => {
  const { dispatch } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const currentUser = await createUserWithEmailAndPassword(auth, email, password);
      const docRef = doc(db, "users", currentUser.user.uid);
      await setDoc(docRef, {
        Name: name,
        Email: email,
        profile_pic: `https://api.dicebear.com/6.x/avataaars/svg?seed=${currentUser.user.uid}`
      });
      dispatch({type:"LOGIN", payload:{user: currentUser.user, name: name}})
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const login = () =>{
    navigate('/login');
   }


  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

<div className="bg-white p-8 rounded-lg shadow-lg ">
<h2 className="text-2xl font-bold mb-4">SIGN UP </h2>
    <form  onSubmit={handleAdd}>
      <div className="mb-4">
        <input className="w-full border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Full Name" type="text"  onChange={(e) => setName(e.target.value)} required/> 
      </div>
      <div className="mb-4">
        <input placeholder="Email" type="email" className="w-full border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  onChange={(e) => setEmail(e.target.value)} required/> 
      </div>
      <div className="mb-4">
        <input placeholder="Password" type="password" className="w-full border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setPassword(e.target.value)} required/> 
      </div>
      <div className="flex justify-center" >
        <button type="submit" className="  bg-green-900 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded flex items-center focus:outline-none focus:shadow-outline">Signup</button></div>
        <div className="m-2">Already have an account? <a onClick={login} className="text-blue-500 hover:cursor-pointer 
        hover:underline">Login</a></div>
      
    </form>
    </div>
    </div>

  );
}

export default Signup;