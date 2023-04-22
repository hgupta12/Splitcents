import React, { useState } from "react"
import { db, user } from "../../firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { Link } from "react-router-dom"

export default function Friends () {
    const [ friends, setFriends ] = useState([])
    const [ loading, setLoading ] = useState(true)

    let q = query(collection(db, "friendships"), where("users", "array-contains", user))
    getDocs(q).then(qs => {
        let f = qs.docs.map(doc => {
            return { ...doc.data(), id: doc.id }
        })

        setFriends(f)
        setLoading(false)
    })


    return (
        <div>
            <h1>Friends <Link to = "/friends/add">+</Link></h1>
            
            {loading && "Loading"}

            {friends.map(friend => <Friend key = {friend.id} { ...friend} />)}

            {!loading && friends == [] && "Looks like you haven't added any friends yet... send a friend request to get started!"}

        </div>
    )
}