import React from "react";

export default function ModalAddExpenses({children,open,onClose}){
    if(!open)return null
    return(
        <>
        <div>{children}</div>
        <button onClick={onClose}>CloseModal</button>
        </>
    )
}