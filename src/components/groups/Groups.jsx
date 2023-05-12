import React, { useContext, useEffect, useState } from "react"
import { db } from '../../firebase'
import { collection, getDocs, query, where } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

import GroupCard from './ui/GroupCard'
import { AuthContext } from "../../context/Authcontext"

export default function Groups () {
    const user = useContext(AuthContext).currentUser.uid
    const navigate=useNavigate();
    let [ groups, setGroups ] = useState([])
    let [ loading, setLoading ] = useState(true)
    useEffect(()=>{
        let q = query(collection(db, "groups"), where("members", "array-contains", user))
        getDocs(q).then(qs => {
        let docs = []
        qs.forEach(doc => docs.push({...doc.data(), id: doc.id}))
        setGroups(docs)
        setLoading(false)
    })
    },[])
    
    
    return (
        <div>
            <h2 className="text-3xl font-bold p-5 ml-10 pl-0 mt-3 ">Your Groups</h2>
            <button onClick={()=>navigate('/creategroup')} className="text-lg bg-cyan-300 px-3 py-1 font-sans ml-10 rounded-2xl"><span className="text-2xl">+</span> Create Group</button>
            {loading && "Loading"}
            <div className="mt-10">
            {groups.map(group => <GroupCard key = {group.id} { ...group} />)}
            </div>
            {!loading && groups == [] && "Looks like you are not part of any groups... create a new one!"}
        </div>
    )
}