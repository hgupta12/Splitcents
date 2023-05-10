import React, { useContext, useEffect, useState } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { AuthContext } from "../../context/Authcontext"


export default function Transact (props) {
    
    /*
    let [ group, setGroup ] = useOutletContext()
    let [ member, setMember ] = useState({})
    let { uid } = useParams()
    */
   let group=props.group
   let uid=props.member
   let member=props.member
   let user=props.user
   let m1=props.m1
   let m2=props.m2
   console.log(props)
/*
    if (group.id) {
        if (!group.members.includes(uid)) window.location = `/group/${group.id}`
        if (group.graph[user][uid] <= 0) window.location = `/group/${group.id}`
    }

    useEffect(() => {
        if (!group.id) return


        getDoc(doc(db, "users", uid)).then(doc => {
            setMember({ ...doc.data(), id: doc.id })
        })

    }, [ group ])*/

    async function handleTransaction () {
        if (!member) return
        if (!group.id) return

        await addDoc(collection(db, "groups", group.id, "transactions"), {
            amount: group.graph[user][uid],
            timestamp: new Date(),
            payer_id: user,
            payee_id: uid
        })

        let newGraph = new Object(group.graph)
        newGraph[user][uid] = 0
        newGraph[uid][user]=0

        await updateDoc(doc(db, "groups", group.id), {
            graph: newGraph
        })

        alert("Amount paid!")
        window.location = `/group/${group.id}`
    }


    return (
        <>
            <div className="bg-white flex flex-col items-center rounded-3xl">
                <h2 className="m-10 text-3xl font-semibold ">Pay back</h2>
                <img src={m2[uid]} className="border-2 rounded-full mx-10 border-black w-36"/>
                <p className="text-3xl mb-10">{m1[uid]}</p>
                <div className="flex items-center">
                <span class="material-icons text-5xl">currency_rupee</span>
                <p className="text-5xl">{group.id && group.graph[user][uid]}</p>
                </div>
                <button onClick = {handleTransaction} className="m-5 rounded-lg flex items-center bg-cyan-900 p-2"><span class="material-icons text-4xl text-white pr-3">payments</span><span className="text-lg text-white"> Pay</span></button>
            </div>
            
        </>
    )
}