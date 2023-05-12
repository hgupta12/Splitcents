import React, { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { db, user } from "../../firebase";
import {Timestamp, doc, getDoc,collection} from "firebase/firestore";

function Dues () {
    let [ group, setGroup ] = useOutletContext()
    var filteredGroupData=""
    const [info,setInfo]=useState({});
    const usid=user
    const [m1,setMabc]=useState({})
    const [info1,setInfo1]=useState([])
    
    useEffect(()=>{
        const getGroup=async()=>{
            const docGropuRef=doc(db,"groups",group.id);
          try{
            //const docSnap = await getDoc(doc(db,"groups","PH4UgKsSZ48Ac9HSQ8SQ"))
            //filteredGroupData= docSnap.data();
            setInfo(group.graph[usid])
            setInfo1(group.members)
          }catch(err){console.error(err);}
          };
          getGroup();
    },[group])
    useEffect(()=>{const getUser=async()=>{
        try{    const userDocs=await Promise.all(info1.map(k=>getDoc(doc(db,"users",k))))
                console.log(userDocs,'users')
                userDocs.map((k)=>{
                    const mt=m1;
                    mt[k.id]=k.data().name
                    setMabc(mt)
                })
        console.log(m1,'m1')
        }catch(err){console.error(err)}
        setInfo1([])
    }
    getUser()
    },[info])
    
    
    
    const y=Object.keys(info);
    //console.log(x,"graph")
    
    return(
        <>
        
         <br></br>
         <>{y.map(ele =>info[ele]>0 ? <div> <h2>{m1[ele]}</h2><p>You owe {info[ele]}</p><a href={`/group/${group.id}/settle/${ele}`}>Pay</a></div> : <p></p>)}</>
         </>
    )
}
export default Dues;