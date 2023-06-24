import React, { useContext } from "react";
import {Timestamp, doc, getDoc,collection, addDoc, updateDoc} from "firebase/firestore";
import { useEffect, useState } from "react";
import ModalChangePayer from "./ModalChangePayer";
import ModalAddMember from "./ModalAddMembers";
import { useOutletContext } from "react-router-dom"
import { db } from "../../firebase";
import { AuthContext } from '../../context/Authcontext';


export default function AddExpenses(props){
    const uid = useContext(AuthContext).currentUser.uid
    
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
    //let [ group, setGroup ] = useOutletContext()
    const group=props.group
    //const m=[{id:'a',name:'a'},{id:'abc',name:'abc'},{id:'ab',name:'ab'},{id:'abcde',name:'abcde'}]
    const [m1,setMabc]=useState({})
    const [m2,setMabcd]=useState({})
    const [info,setInfo]=useState(group)
    const [loading,setLoading]=useState(true)
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

    useEffect(()=>{const getUser=async()=>{
        try{  //console.log(props.group)    
            const userDocs=await Promise.all(info.members.map(k=>getDoc(doc(db,"users",k))))
                console.log(userDocs,'users')
                userDocs.map((k)=>{
                    const mt=m1;
                    const mt1=m2;
                    mt[k.id]=k.data().name
                    mt1[k.id]=k.data().profile_pic
                    setMabcd(mt1)
                    setMabc(mt)
                })
            
            setLoading(false)
            const addnewinput=[]
        const y1=Object.keys(m1);
        y1.forEach((k)=>{
            
            if(k!==payer){
                    addnewinput.push(k)
            }
        });setAddMembersResult(addnewinput)
        }catch(err){console.error(err)}
        }
        getUser()
        

    },[])
    
    function changePayerfunc(inputNew){
        
        setNewPayer(inputNew)
        
    }
    
    
    useEffect(()=>{
        const y=Object.keys(m1)
        const xnew=[]
        y.map((k)=>{
        if(m1[k].includes(newPayer) && k!==payer && !(selectedToAddMembersList.includes(k))){xnew.push(k)}
    })
    setNewPayerList(xnew);},[newPayer,selectedToAddMembersList])
    
    function addMemberfunc(inputnew){
        
        setAddMemberInput(inputnew)
        
    }
    useEffect(()=>{
        const addnewinput=[]
        const y=Object.keys(m1);
        y.forEach((k)=>{
            
            if(m1[k].includes(addMemberInput) && !(selectedToAddMembersList.includes(k)) && k!==payer){
                    addnewinput.push(k)
            }
        });setAddMembersResult(addnewinput)
    },[addMemberInput,selectedToAddMembersList,payer])

    
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
        setNewPayerList([])
        setChangePayer(false)
    }
    async function SubmitExpense(k){
        try{
        await addDoc(collection(db,"expenses"),k)
        console.log(k)
        }catch(err){console.log(err)}
    }
    async function UpdateGraph(participants){
        try{const graph=info.graph
            const due_share=Math.floor(amout/(selectedToAddMembersList.length+1))
            participants.map((k)=>{
                graph[payer][k.id]=graph[payer][k.id]-due_share
                graph[k.id][payer]=graph[k.id][payer]+due_share
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
    if(loading)return<div>loading</div>
    return(
        <>
        <div className="bg-white rounded-2xl overflow-auto max-h-full">
                <h1 className="text-3xl m-4 font-semibold text-center">New Expense</h1>
                <div className="my-5 mx-6">
                
                <input placeholder="Description..." className=" border-b-2 border-blue-500  outline-none" onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div className="my-5 mx-6">
                
                <input placeholder="Amount..." className=" border-b-2 border-blue-500  outline-none " onChange={(e)=>setAmount(Number(e.target.value))}/>
                </div>
                <div className="mx-6 my-4">
                    <div className="text-lg flex items-center space-x-3"><span className="text-xl pr-3">Payer : </span><img className="inline w-12 border-2 border-black rounded-full" src={m2[payer]}/> <span>{m1[payer]}</span>
                    <button onClick={()=>setChangePayer(true)}><span class="material-icons text-4xl text-blue-500">edit</span></button></div>
                    
                    <ModalChangePayer open={changePayer}>
                        <input placeholder="New Payer....." className="border-b-2 border-blue-500  outline-none " onChange={(e)=>changePayerfunc(e.target.value)}/>
                        <div>{newPayerList.map((k)=>{return(<div className="text-lg flex items-center space-x-3 my-3"><img className="inline w-12 border-2 border-black rounded-full" src={m2[k]}/><h5>{m1[k]}</h5><button onClick={()=>SetNewPayerfunc(k)}><span class="material-icons text-4xl text-blue-500 ">swap_horiz</span></button></div>);})}</div>
                    </ModalChangePayer>
                </div>
                <div className="grid grid-cols-2 justify-items-center">
                    
                    <div className="flex flex-col justify-items-center mx-16">
                        
                    <div onClick={()=>setAddMember(true)} className="text-xl underline text-blue-500 mb-5 mt-5 text-center">Select Member</div>
                        
                    
                    <ModalAddMember open={addMember}>
                        
                        <input placeholder="New Member....." className=" border-b-2 border-blue-500  outline-none " value={addMemberInput} onChange={(e)=>addMemberfunc(e.target.value)}/>
                        <div className="ml-5 overflow-auto h-44 mt-1">
                            {addMembersResult.map((k)=>{return(<div className="flex items-center my-2 space-x-6"><img className="inline w-12 border-2 rounded-full" src={m2[k]}/><div className="text-lg">{m1[k]}</div><button onClick={()=>AddMembersToList(k)}><span class="material-icons text-3xl text-green-400">person_add</span></button></div>);})}
                        </div>
                    </ModalAddMember>
                    
                    </div>
                    <div>
                    <h2 className="text-xl underline text-green-500 mb-5 mt-5">Selected Members</h2>
                        <div className="overflow-auto h-56">
                        {selectedToAddMembersList.map((k)=>{return(<div className="flex items-center space-x-6 my-2"><img className="inline w-12 border-2 rounded-full" src={m2[k]}/><h5 className="text-lg">{m1[k]}</h5><button onClick={()=>RemoveFromSelected(k)}><span class="material-icons text-3xl text-red-400">person_remove</span></button></div>)}) }

                        </div>
                    </div>
                   
                </div>
                <div className="flex justify-center m-10">
                <button onClick={()=>AddFinalExpense()} className="rounded-lg flex items-center bg-cyan-900 p-2"><span class="material-icons text-4xl text-white">add</span> <span className="text-lg text-white">Add Expense</span></button>
                </div>
            </div>
            </>
    );
}
/*
<label className="text-xl pr-3">Description :</label>
<label className="text-xl pr-3">Amount :</label>
<lable className="text-lg pr-3">Member Name :</lable>
*/
