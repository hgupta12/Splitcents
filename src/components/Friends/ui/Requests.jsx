import React from "react"
import UserCard from "../../../ui/UserCard"
import Confirm from "../../../ui/Confirm"

export default function Requests ({ requests, accept, reject }) {
    return (
        <div className="px-7 flex flex-col gap-6 py-4">
            {requests.map(req => (
                <UserCard
                    id = {req.from}
                    key = {req.req_id}
                >
                    <Confirm
                        text = "Friend Request"
                        accept = {() => accept(req)}
                        reject = {() => reject(req)}
                    />
                </UserCard>
            ))}
        </div>
    )
}