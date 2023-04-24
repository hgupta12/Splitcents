import React from "react";

export default function ModalAddMember({open,children}){
    if (!open) return null
    return(
        <><div>{children}</div></>
    )
    
}