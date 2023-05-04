

import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

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



  return (
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
        <div>
        <button type="submit" className="py-2 px-3 my-3 shadow-lg w-full rounded-xl">Login</button></div>
        {error && <span>Wrong email or password!</span>}
        <div>Don't have an account? <a className="text-blue-500 hover:cursor-pointer 
        hover:underline" onClick={signup}>Sign Up</a></div>
      </form>
    </div>
  );
};

export default Login;