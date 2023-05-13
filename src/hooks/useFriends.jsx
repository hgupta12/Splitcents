import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { db } from "../firebase";

const useFriends = () => {
  const { currentUser } = useUser();
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const friendsRef = collection(db, "users", currentUser.uid, "friends");
    const unsubscribe = onSnapshot(friendsRef, (docsSnap) => {
      const res = [];
      docsSnap.forEach((doc) => res.push(doc.data()));
      setFriends(res);
    });
    return () => unsubscribe();
    }, []);

    return friends;
};

export default useFriends;
