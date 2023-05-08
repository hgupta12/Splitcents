import React, { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../firebase'


export default function History () {
    let [ group, setGroup ] = useOutletContext()
    let [ history, setHistory ] = useState([])

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

        })()
        
    }, [ group ])


    return (
        <>
            <h1>History</h1>
            {
                history.map(({ id, type, amount, timestamp }) => {
                    return (
                        <p key = {id}>{amount} ({type}) - {console.log(timestamp)||(new Date(timestamp.seconds * 1000)).getMonth()}</p>
                    )
                })
            }
        </>
    )
}