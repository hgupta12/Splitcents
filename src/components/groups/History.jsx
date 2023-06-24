import React, { useContext, useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { AuthContext } from "../../context/Authcontext"


export default function History (props) {
    //let [ group, setGroup ] = useOutletContext()
    let [ history, setHistory ] = useState([])
    const group=props.group
    const m1=props.m1
    const m2=props.m2
    const [loading,setLoading]=useState(true)
    const month=['','Jan',"Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dec"] 
    const user=useContext(AuthContext).currentUser.uid
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
            setLoading(false)

        })()
        
    }, [])
    if(history.length===0){
        return<div className="mx-10 py-10 border-b-2 border-blue-400 px-10 text-xl text-blue-500">No Transactions Done Yet</div>
    }
    return (
        <>  
            
            <h1 className="invisible">History</h1>
            <div>
            {   
                history.map((k) => {
                    return (
                        <div key = {k.id} className="flex justify-between mx-16 border-b-2 border-blue-400 py-3">
                            <div className="flex items-center space-x-6">
                                <span>{k.type==="expense"?<span class="material-icons text-3xl">groups</span>:<span className="material-icons text-3xl">payments</span>}</span>
                                <div className="felx items-center w-20">
                                    <div className="text-3xl text-green-500"><span className="material-icons md-36 text-green-400">currency_rupee</span>{k.amount}</div>
                                    <div className="text-lg">{k.type==="expense"?k.description:""}</div> 
                                </div>
                                
                                
                                <div><img src={m2[k.payer_id]} className="inline w-16 border-2 rounded-full "/><div className="text-xl">{m1[k.payer_id]}</div> </div> 
                                <span class="material-icons text-4xl text-black">trending_flat</span>
                                    {/*k.type==="expense"?<div>
                                    {k.participants.map((i)=>{
                                        return(<><p>{m1[i.id]}</p><img src={m2[i.id]} className="inline w-20 bg-white" /></> )
                                    })}
                                </div>:<p>{m1[k.payee_id]}</p>*/
                                    k.type=='expense'?
                                        <p className="text-xl">{k.participants.length} {k.participants.length===1? "Person":"People"}</p>
                                        :
                                        <><div>
                                        <img src={m2[k.payee_id]} className="inline w-16 border-2 rounded-full " />
                                        <p className="text-xl">{m1[k.payee_id]}</p>
                                        </div>
                                        </>
                                    }  
                                     
                                {k.type==="expense"?
                                    k.participants.some(p=> p.id===user)||k.payer_id===user?
                                    <p className="text-blue-500">You are included</p>:<p>{null}</p>
                                    :
                                    null
                                }
                                
                            
                            </div> 
                        <div className="flex flex-col items-center mr-10">
                            <div className="text-lg font-semibold">{month[(new Date(k.timestamp.seconds * 1000)).getMonth()]}</div>
                            <div className="text-2xl font-bold">{(new Date(k.timestamp.seconds * 1000)).getDate()}</div> 
                            <div className="text-lg font-semibold">{(new Date(k.timestamp.seconds * 1000)).getFullYear()}</div>
                        </div>
                    </div>
                    )
                })
                
            }
            </div>
        </>
    )
}