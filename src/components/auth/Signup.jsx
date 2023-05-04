

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
    <form className="mt-24 w-1/3 py-4 px-5 h-auto text-center m-auto rounded-lg shadow-sm" onSubmit={handleAdd}>
      <div>
        <input placeholder="Full Name" type="text" className="p-4 w-full border-b-2 focus:outline-none" onChange={(e) => setName(e.target.value)} required/> 
      </div>
      <div>
        <input placeholder="Email" type="email" className="p-4 w-full border-b-2 focus:outline-none" onChange={(e) => setEmail(e.target.value)} required/> 
      </div>
      <div>
        <input placeholder="Password" type="password" className="p-4 w-full border-b-2 focus:outline-none" onChange={(e) => setPassword(e.target.value)} required/> 
      </div>
      <div>
        <button type="submit" className="py-2 px-3 my-3 shadow-lg w-full rounded-xl">Signup</button>
        <div>Already have an account? <a onClick={login} className="text-blue-500 hover:cursor-pointer 
        hover:underline">Login</a></div>
      </div>
    </form>
  );
}

export default Signup;