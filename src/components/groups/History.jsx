import React, { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../firebase'


export default function History (props) {
    //let [ group, setGroup ] = useOutletContext()
    let [ history, setHistory ] = useState([])
    const group=props.group
    const m1=props.m1
    const m2=props.m2
    const [loading,setLoading]=useState(true)
    const month=['','Jan',"Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dec"] 
    useEffect(() => {
        (async function () {
            if (!group.id) return 

            let expensesPromise = 
            getDocs(query(
                collection(db, "expenses"), 
                where('group_id', '==', group.id), 
                orderBy('timestamp', 'desc')
            ))

            let transactionsPromise = 
            getDocs(query(
                collection(db, "groups", group.id, "transactions"),
                orderBy('timestamp', 'desc')
            ))

            let [ transactions, expenses ] = await Promise.all([ transactionsPromise, expensesPromise ])

            expenses = expenses.docs.map(doc => { return { id: doc.id, type: "expense", ...doc.data() } })
            transactions = transactions.docs.map(doc => { return { id: doc.id, type: "transaction", ...doc.data() } })
            let historyDocs = [ ...expenses, ...transactions ]
            historyDocs.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)

            setHistory(historyDocs)
            setLoading(flase)

        })()
        
    }, [])
    
    return (
        <>
            <h1>History</h1>
            <div>
            {   
                history.map((k) => {
                    return (
                        <div key = {k.id} className="flex justify-between">
                            <div className="flex">
                                <span className="px-1">{k.type}</span>
                                <h3>{k.type==="expense"?k.description:""}</h3> 
                                {m1[k.payer_id]} <img src={m2[k.payer_id]} className="inline w-20 border-2 rounded-full "/> 
                                {k.type==="expense"?<p>Paid for</p>:<p>Paid to</p>} 
                                    {/*k.type==="expense"?<div>
                                    {k.participants.map((i)=>{
                                        return(<><p>{m1[i.id]}</p><img src={m2[i.id]} className="inline w-20 bg-white" /></> )
                                    })}
                                </div>:<p>{m1[k.payee_id]}</p>*/
                                    k.type=='expense'?
                                        <p>{k.participants.length} People</p>
                                        :
                                        <><p>{m1[k.payee_id]}</p>
                                        <img src={m2[k.payee_id]} className="inline w-20 border-2 rounded-full " /></>
                                    }   
                                {k.amount} 
                            </div> 
                        <div className="flex flex-col">
                            <div>{month[(new Date(k.timestamp.seconds * 1000)).getMonth()]}</div>
                            <div>{(new Date(k.timestamp.seconds * 1000)).getDate()}</div> 
                            <div>{(new Date(k.timestamp.seconds * 1000)).getFullYear()}</div>
                        </div>
                    </div>
                    )
                })
                
            }
            </div>
        </>
    )
}