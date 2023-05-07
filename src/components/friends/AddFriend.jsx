import React, { useEffect, useState } from "react"
import { addDoc, collection, endAt, getCountFromServer, getDocs, limit, orderBy, query, startAt, where } from 'firebase/firestore'
import { db, user } from '../../firebase'

export default function AddFriend () {
    const [ email, setEmail ] = useState("")
    const [ result, setResult ] = useState([])
    const [ reqSent, setReqSent ] = useState([])
    
    
    function search () {
        if (email == "") {
            setResult([])
            return
        }
        
        let q = query(collection(db, "users"), orderBy("email"), startAt(email), endAt(email+'\uf8ff'), limit(10))
        getDocs(q).then(async qs => {
            let r = qs.docs.map(doc => {
                return { ...doc.data(), id: doc.id}
            })
            let friends = r.map(el => {
                let friendship = [user, el.id]
                friendship.sort()
                let q = query(collection(db, "friendships"), where("users", "==", friendship))
                return getCountFromServer(q)
            })
            
            friends = await Promise.all(friends)
            friends = friends.map(doc => doc.data().count)
            
            let notFriends = []

            for (let i in r)
                if (friends[i] == 0)
                    notFriends.push(r[i])

            setResult(notFriends)
        })
    }
    
    function handler (e) {
        setEmail(e.target.value)
    }


    function addFriend (id) {
        addDoc(collection(db, "friend_requests"), {from: user, to: id})
        .then(() => setReqSent(old => old + [id]))
    }

    useEffect(() => {
        let timer = setTimeout(search, 1000)

        return () => clearTimeout(timer)
    }, [ email ])
    
    return (
        <div>
            <p>Enter email ID of the user you would like to add as a friend:</p>
            <input type="text" placeholder="Email" value = {email} onChange={handler} />

            {
                result.map(user => 
                    <p key = {user.id}>
                        {user.name} 
                        &nbsp;&nbsp; 
                        {
                            reqSent.includes(user.id)
                            ?
                            "✅"
                            :
                            <button onClick={() => addFriend(user.id)}>➕</button>
                        }
                    </p>)
            }
        </div>
    )
}
