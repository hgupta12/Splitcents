import React, { useEffect, useState } from "react"
import getUser, { User } from "../helpers/User"

export default function UserCard ({ id, children, onClick }) {
    let [ user, setUser ] = useState(false)

    useEffect(() => {
        getUser(id).then(u => setUser(u))
    }, [])

    return (
        <>{
            user
            ?
            <div onClick={onClick} className = {`bg-cyan-50 rounded-lg shadow-md py-3 px-6 flex-shrink-0 flex justify-between ${onClick ? "cursor-pointer" : ""}`}>
                <div className="flex items-center gap-4">
                    <img src={user.profile_pic} alt="" className="h-14 rounded-full" />
                    <div>
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                </div>
                <div>
                    {children}
                </div>
            </div>
            :
            null
        }</>
    )
}