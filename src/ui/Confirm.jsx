import React from "react"

export default function Confirm ({ accept, reject, text }) {
    function stopPropagation (fun) {
        return e => {
            e.stopPropagation()
            fun()
        }
    }
    return (
        <>
            <h1 className = "text-cyan-600">{ text }</h1>
            <div className="flex justify-center gap-5">
                <span className="material-icons text-2xl text-green-600 cursor-pointer" onClick={stopPropagation(accept)}>done_outline</span>
                <span className="material-icons text-2xl text-rose-500 cursor-pointer" onClick={stopPropagation(reject)}>block</span>
            </div>
        </>
    )
}