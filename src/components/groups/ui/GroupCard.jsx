import React from "react"
import { user } from "../../../firebase"
import { Link } from "react-router-dom"

export default function GroupCard ({ id, name, graph}) {


    let due
    if (!graph[user])
        due = 0
    else
        due=Object.values( graph[user] ).reduce((prev, cur) => prev+cur, 0)
    

    return (
        <div className="mx-12 mr-96 mt-3 mb-1 border-b-2 border-blue-500 flex justify-between">
            <Link to={`/group/${id}`}>
                <h3 className="p-3 pb-5  text-xl">
                    {name}
                </h3>
            </Link>
            <div className="p-3">
                {due > 0 && <p className="p-0 text-green-500">You Owe {due}</p>}
                {due == 0 && <p className="p-0 text-blue-500">No Dues</p>}
                {due < 0 && <p className="p-0 text-red-500">You're Owed {due}</p>}
            </div>
        </div>
    )
}