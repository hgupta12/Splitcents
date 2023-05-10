import React, { useContext, useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { db } from "../../firebase";
import {Timestamp, doc, getDoc,collection} from "firebase/firestore";
import History from "./History";
import Transact from "./Transact";
import M1 from "./ModalTransact";
import { AuthContext } from "../../context/Authcontext";

function Dues (props) {
    //let [ group, setGroup ] = useOutletContext()
    var filteredGroupData=""
    const group=props.group
    const usid = useContext(AuthContext).currentUser.uid
    const [info,setInfo]=useState(group.graph[usid]);
    const [loading,setLoading]=useState(true)
    const [m1,setMabc]=useState({})
    const [m2,setMabcd]=useState({})
    const [info1,setInfo1]=useState(group.members)
    const [mem,setMem]=useState('')
    const [open,setOpen]=useState(false)
    /*
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
    },[group])*/
    useEffect(()=>{const getUser=async()=>{
        try{    const userDocs=await Promise.all(info1.map(k=>getDoc(doc(db,"users",k))))
                userDocs.map((k)=>{
                    const mt=m1;
                    const mt1=m2;
                    mt[k.id]=k.data().name
                    mt1[k.id]=k.data().profile_pic
                    setMabc(mt)
                    setMabcd(mt1)
                })
        
        }catch(err){console.error(err)}
        setInfo1([])
    }
    getUser()
    setLoading(false)
    },[])
    
    
    
    
    //console.log(x,"graph")
    if(loading)return(<div>loading</div>)
    return(
        
        
         <><div className="flex space-x-6 mx-10 pb-10 border-b-2 border-blue-400 px-10">
            {Object.keys(info).map(ele =>info[ele]>0 ? 
                <div className="border-2 bg-blue-400 grid justify-items-center rounded-b-3xl rounded-t-xl">
                <img src={m2[ele]} className="inline w-20 bg-white items-center rounded-full mt-1"/>
                <h2 className="text-lg text-white p-1">You owe {m1[ele]}</h2>
                <h2 className="text-blue-800 px-2 text-xl">{info[ele]}</h2>
                <button onClick={()=>{setMem(ele);setOpen(true)}} >Pay</button></div>:<p></p>)
            }
        </div>
        <M1 open={open} onClose={()=>{setOpen(false);setMem("")}}>
            <Transact group={group} m1={m1} m2={m2} user={usid} member={mem}/>
        </M1>
        <History group={group} m1={m1} m2={m2}/>
        </>
         
    )
}
export default Dues;

