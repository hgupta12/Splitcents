import React, { useState } from "react"
import Confirm from './Confirm'
import UserCard from './UserCard'

export default function UserList ({ users = [], selectable, action, text }) {
    const [ selected, setSelected ] = useState(null)
    const [ loading, setLoading ] = useState(null)

    async function select (id) {
        if (loading != null) return
        setSelected(id)
    }

    async function load (id) {
        setSelected(null)
        setLoading(id)
        await action(id)
        setLoading(null)
    }


    return (
        <ul className="px-7 flex flex-col gap-6 py-4">
            { users.map(user => 
                <UserCard 
                    id = {user} 
                    key = {user}
                    onClick = {selectable && (() => select(user))}
                >
                    { selected == user
                        ?
                        <Confirm 
                            text = {text}
                            accept = {() => load(user)}
                            reject = {() => setSelected(null)}
                        />
                        :
                        null
                    }

                    { loading == user
                        ?
                        "Loading..."
                        :
                        null
                    }
                </UserCard>
            )}
        </ul>
    )
}