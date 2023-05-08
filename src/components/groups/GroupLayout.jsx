import React, { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router-dom"

import { db } from "../../firebase"
import { doc, getDoc } from "firebase/firestore"
import Dues from "./Dues"


export default function GroupLayout () {
    const { gid } = useParams()

    // get the group data and set it here
    let [ group, setGroup ] = useState({})
    const [loading,setLoading]=useState(true)
useEffect(()=>{
    let q = getDoc(doc(db, `groups/${gid}`))
    q.then(doc => {setGroup({ ...doc.data(), id: gid});setLoading(false)})
    
},[])
    
    if(loading){
        return(<div>loading</div>)
    }
    return (
        <>  
            <div className="flex m-10 justify-between border-b-2 border-blue-400 pb-5">
                <h2 className="text-4xl p-3 font-semibold">{group.name}</h2>
                <div>
                    <button className="mx-2 mr-5 bg-cyan-300 p-3 rounded-2xl"><span>+</span> Add Expense</button>
                    <button className="mx-2 border-2 p-3 rounded-2xl border-black">Group Memebers</button>
                </div>
            </div>
            <Dues group={group}></Dues>
            <Outlet context = {[ group, setGroup ]} />
            
            
        </>
    )
}

