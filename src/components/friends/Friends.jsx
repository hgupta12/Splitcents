import React, { useContext, useEffect, useState } from "react"
import { db } from "../../firebase"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/Authcontext'

import FriendCard from './ui/FriendCard'
import RequestCard from './ui/RequestCard'
import UserList from "../../ui/UserList"
import Requests from "./ui/Requests"
import AddFriend from "./ui/AddFriend"


export default function Friends () {
    let user = useContext(AuthContext).currentUser.uid

    const [ friends, setFriends ] = useState([])
    const [ requests, setRequests ] = useState([])
    const [ loading, setLoading ] = useState(true)


    async function fetchData () { 
        let q1 = query(collection(db, "friendships"), where("users", "array-contains", user))
        let q2 = query(collection(db, "friend_requests"), where("to", "==", user))

        let [ qs1, qs2 ] = await Promise.all([ getDocs(q1), getDocs(q2) ])

        let friendsArray = qs1.docs.map(doc => {
            let users = doc.data().users
            let otherUser = users[0] == user ? users[1] : users[0]

            return otherUser
        })

        let requestsArray =  qs2.docs.map(doc => ({ from: doc.get("from"), req_id: doc.id}))


        setFriends(friendsArray)
        setRequests(requestsArray)
        setLoading(false)
    }

    if (loading) fetchData()

    async function addFriend (req) {
        await deleteDoc(doc(db, "friend_requests", req.req_id))

        let users = [user, req.from]
        users.sort()
        await addDoc(collection(db, "friendships"), { users })
        setLoading(true)
    }

    async function rejectRequest (req) {
        await deleteDoc(doc(db, "friend_requests", req.req_id))
        setLoading(true)
    }


    return (
        <div className="flex">
            <div className="w-1/2 border-r-2 border-cyan-300">
                {
                    requests.length
                    ?
                    <div className="border-b-2 border-b-cyan-300">
                        <h2 className="font-bold text-2xl ml-4 mt-4">Friend Requests</h2>
                        <Requests
                            requests = {requests}
                            load = {() => setLoading(true)}
                            accept = {addFriend}
                            reject = {rejectRequest}
                        />
                    </div>
                    :
                    null
                }
                <div>
                    <h2 className="font-bold text-2xl ml-4 mt-4 ">Friends</h2>
                    <UserList
                        users = {friends}
                    />
                    {!loading && friends.length == 0 && "Looks like you haven't added any friends yet... send a friend request to get started!"}
                </div>
            </div>
            <div className="w-1/2 py-4 px-6">
                <h2 className="font-bold text-2xl ml-4 mt-4 pb-8">Find Friends</h2>
                <AddFriend />
            </div>
        </div>
    )
}