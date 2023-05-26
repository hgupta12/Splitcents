import React, { useContext, useEffect, useState } from "react"
import { addDoc, collection, endAt, getCountFromServer, getDocs, limit, orderBy, query, startAt, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { AuthContext } from '../../context/Authcontext'

export default function AddFriend () {
    let user = useContext(AuthContext).currentUser.uid
    
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
                if (friends[i] == 0 && r[i].id != user)
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

    const mystyle={
        backgroundColor: '#ECFEFF',
    };
    
    return (
        <div>
        
            <div className=" grid grid-rows-2 gap-2 justify-center ">
           <div><p className="font-bold text-4xl ml-4 mt-4">Add Friend</p></div>
          <div> <input type="text" className=" ml-4 mt-1 w-max  border rounded-lg py-4 px-4 text-gray-700 border-blue-300 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email of the friend" value = {email} onChange={handler} />
</div></div>
            {
                result.map(user => 
                    <div className=" w-max mx-auto py-4 ">
                     <div className=" shadow-md border-2 rounded-lg grid grid-cols-2 gap-1 justify-center p-4 font-medium text-xl" key = {user.id} style={mystyle}>
                    
                       {user.name} 
                        &nbsp;&nbsp; 
                        {
                            reqSent.includes(user.id)
                            ?
                            "✅"
                            :
                           <button  onClick={() => addFriend(user.id)}>➕</button>
                        }
                    
                    </div>
                    
                    </div>)
            }
        </div>
    )
}
