import React from "react";

export default function ModalAddExpenses({children,open,onClose}){
    if(!open)return null
    return(
        <>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">{children}
        <button onClick={onClose}><span class="material-icons fixed top-5 right-5 text-5xl rounded-2xl text-blue-500">close</span></button>
        </div>
        </>
    )
}