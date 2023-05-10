import React, { useContext } from "react";
import {Timestamp, doc, getDoc,collection, addDoc, updateDoc} from "firebase/firestore";
import { useEffect, useState } from "react";
import ModalChangePayer from "./ModalChangePayer";
import ModalAddMember from "./ModalAddMembers";
import { useOutletContext } from "react-router-dom"
import { db } from "../../firebase";
import { AuthContext } from '../../context/Authcontext';


export default function AddExpenses(){
    const uid = useContext(AuthContext).currentUser.user.uid
    
    const [amout,setAmount]=useState(0)
    const [description,setDescription]=useState("")
    const [payer,setPayer]=useState(uid)
    const [changePayer,setChangePayer]=useState(false)
    const [newPayer,setNewPayer]=useState('')
    const [newPayerList,setNewPayerList]=useState([])
    const [addMember,setAddMember]=useState(false)
    const [addMemberInput,setAddMemberInput]=useState("")
    const [addMembersResult,setAddMembersResult]=useState([])
    const [selectedToAddMembersList,setSelectedToAddMembersList]=useState([])
    let [ group, setGroup ] = useOutletContext()

    //const m=[{id:'a',name:'a'},{id:'abc',name:'abc'},{id:'ab',name:'ab'},{id:'abcde',name:'abcde'}]
    const [m1,setMabc]=useState({})
    const [info,setInfo]=useState({})
    /*
    useEffect(()=>{
        const getGroup=async()=>{
            
          try{
            
            const docGropuRef=doc(db,"groups","pD0peAwSSbmWH65ZnJI0");
            const docSnap = await getDoc(docGropuRef)
            const filteredGroupData= docSnap.data();
            setInfo(filteredGroupData)
            
            console.log(filteredGroupData,"data")
            setInfo(group)
            console.log(group)
          }catch(err){console.error(err);}
        
          };
          getGroup();
    },[])*/
    useEffect(()=>{
        setInfo(group)
    },[group])
    useEffect(()=>{const getUser=async()=>{
        try{    const userDocs=await Promise.all(info.members.map(k=>getDoc(doc(db,"users",k))))
                console.log(userDocs,'users')
                userDocs.map((k)=>{
                    const mt=m1;
                    mt[k.id]=k.data().name
                    setMabc(mt)
                })
        console.log(m1,'m1')
        }catch(err){console.error(err)}
        }
        getUser()
        

    },[info])
    
    function changePayerfunc(inputNew){
        
        setNewPayer(inputNew)
        
    }
    const xnew=[]
    
    useEffect(()=>{
        const y=Object.keys(m1)
        y.map((k)=>{
        if(m1[k].includes(newPayer) && newPayer!=="" && k!==payer && !(selectedToAddMembersList.includes(k))){xnew.push(k)}
    })
    setNewPayerList(xnew);},[newPayer])
    
    function addMemberfunc(inputnew){
        
        setAddMemberInput(inputnew)
        
    }
    useEffect(()=>{
        const addnewinput=[]
        const y=Object.keys(m1);
        y.forEach((k)=>{
            var z=0
            selectedToAddMembersList.map(l=>{
                if(l === k){z=1}
            })
            if(addMemberInput === ""){

            }
            else{
                if(m1[k].includes(addMemberInput) && z!==1 && k!==payer){
                    addnewinput.push(k)
                }
            }
        });setAddMembersResult(addnewinput)
    },[addMemberInput])

    
    function AddMembersToList(k){
        const selectedtoaddlist=selectedToAddMembersList
        
        if(!(selectedtoaddlist.includes(k))){selectedtoaddlist.push(k)}
        setSelectedToAddMembersList(selectedtoaddlist);
        const a12=addMembersResult.filter(item=>item !== k);
        setAddMembersResult(a12);
        setAddMemberInput("")
    }
    var x20=[]
    function RemoveFromSelected(k){
        x20 =selectedToAddMembersList.filter(i=>i!==k)
        setSelectedToAddMembersList(x20)
    }

    function SetNewPayerfunc(k){
        setPayer(k)
        setChangePayer(false)
    }
    async function SubmitExpense(k){
        try{
        await addDoc(collection(db,"expenses"),k)
        }catch(err){console.log(err)}
    }
    async function UpdateGraph(participants){
        try{const graph=info.graph
            const due_share=Math.floor(amout/(selectedToAddMembersList.length+1))
            participants.map((k)=>{
                graph[payer][k.id]=graph[payer][k.id]+due_share
                graph[k.id][payer]=graph[k.id][payer]-due_share
            })
            const updatedGraphandGroup=info
            updatedGraphandGroup.graph=graph;
            //delete updatedGraphandGroup.id;
            await updateDoc(doc(db,"groups",group.id),updatedGraphandGroup)
            console.log('updated')
            alert("Added")
        window.location= `/group/${group.id}`
        }catch(err){console.log(err)}
    }
    function AddFinalExpense(){
        const group_id=group.id
        const participants=[]
        selectedToAddMembersList.map((k)=>{
            participants.push({id:k,due_share:Math.floor(amout/(selectedToAddMembersList.length+1))})
        })
        const expense={amount:amout,description:description,timestamp:new Date() ,group_id:group_id,payer_id:payer,participants:participants}
        console.log(expense)
        SubmitExpense(expense);
        
        UpdateGraph(participants)
        

        /*
        const graph={'a':{'b':20,'c':-10},'b':{'a':-20,'c':0},'c':{'a':10,'b':0}}
        const payer='a'
        const due_share=15
        const participants=[{user_id:'b',due_share:15},{user_id:'c',due_share:15}]
        participants.map((k)=>{
        graph[payer][k.user_id]=graph[payer][k.user_id]+due_share
        graph[k.user_id][payer]=graph[k.user_id][payer]-due_share
        })
        */

    }
    return(
        <>
        <div>
                <input placeholder="Description..." onChange={(e)=>setDescription(e.target.value)}/>
                <input placeholder="Amount..." onChange={(e)=>setAmount(Number(e.target.value))}/>
                <div>
                    <h2>Payer : {payer===uid ? <>You</>:m1[payer]}</h2>
                    <button onClick={()=>setChangePayer(true)}>Change Payer</button>
                    
                    <ModalChangePayer open={changePayer}>
                        <input placeholder="New Payer....."onChange={(e)=>changePayerfunc(e.target.value)}/>
                        <div>{newPayerList.map((k)=>{return(<div><h5>{m1[k]}</h5><button onClick={()=>SetNewPayerfunc(k)}>Set as new Payer</button></div>);})}</div>
                    </ModalChangePayer>
                </div>
                <div>
                    <h2>Added Members</h2>
                    
                    <div>
                        <div>
                        {selectedToAddMembersList.map((k)=>{return(<div><h5>{m1[k]}</h5><button onClick={()=>RemoveFromSelected(k)}>Remove From Selected</button></div>)}) }

                        </div>
                    </div>
                    <button onClick={()=>setAddMember(true)}>Select Member</button>
                    <ModalAddMember open={addMember}>
                        <input placeholder="New Member....." value={addMemberInput} onChange={(e)=>addMemberfunc(e.target.value)}/>
                        <div>
                            {addMembersResult.map((k)=>{return(<div><h5>{m1[k]}</h5><button onClick={()=>AddMembersToList(k)}>Add Member</button></div>);})}
                        </div>
                    </ModalAddMember>
                    <br></br>
                    <button onClick={()=>AddFinalExpense()}>Add The Expense To The Group</button>
                </div>
            </div>
            </>
    );
}