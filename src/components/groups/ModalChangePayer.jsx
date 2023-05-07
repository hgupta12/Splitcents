import React from "react";

export default function ModalChangePayer({open,children}){
    if (!open) return null
    return(
        <><div>{children}</div></>
    )
    
}