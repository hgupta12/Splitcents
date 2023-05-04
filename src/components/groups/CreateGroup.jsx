import React from "react";
import { collection, query,where,getDocs,getDoc,doc,updateDoc, addDoc} from "firebase/firestore";
import { db } from "../../firebase";
import { useState ,useEffect} from "react"

function CreateGroup(){
    const user='tQkhviaGM7HlofjT1QCn'
    const [groupName,setGroupName]=useState('')
    const [friends,setFriends]=useState([])
    const [m1,setMabc]=useState({})
    const [results,setResult]=useState([]);
    const [selected1,setSelected1]=useState([user]);
    const [input,setInput]=useState("");

    function ChangeGroupName(e){
        setGroupName(e)
    }
    useEffect(()=>{
        const FriensdsArr=async()=>{
            try{
                const friends1=[]
                friends1.push(user)
                const q=query(collection(db,'friendships'),where("users","array-contains",user))
                const querySnapshot=await getDocs(q)
                querySnapshot.forEach((doc)=>{
                    doc.data().users.map((k)=>{
                        if(k !== user){friends1.push(k)}
                    })
                })
                setFriends(friends1);
                //console.log(friends,"f")
                
            }catch(err){console.log(err)}
        }
        FriensdsArr()
    },[])
    useEffect(()=>{const getUser=async()=>{
        try{    const userDocs=await Promise.all(friends.map(k=>getDoc(doc(db,"users",k))))
                //console.log(userDocs,'users')
                userDocs.map((k)=>{
                    const mt=m1;
                    mt[k.id]=k.data().name
                    setMabc(mt)
                })
        //console.log(m1,'m1')
        }catch(err){console.error(err)}
        }
        getUser()
    },[friends])
    useEffect(()=>{
        const x3=[];
        const z=Object.keys(m1)
        z.forEach((k) => {
            if(input === ""){    
            }
            else{
                if(m1[k].includes(input) && !(selected1.includes(k)) && k!==user){
                    x3.push(k);
                }
            }
        });
        setResult(x3);
    },[input])
    function changeHandler(input1){
        
        setInput(input1);
        
    }
    function removeFromSelected(k){
        const x4 = selected1.filter(item => item !== k)
        setSelected1(x4);
    }
    function Display123(){
        
        return(<><h3>Selected Friends</h3><div>{selected1.map((k) => k===user? <p></p>:<div><h5>{m1[k]}</h5><button onClick={()=> removeFromSelected(k)}>Remove friend from selected</button></div>)}</div></>);
    }
    function addToSelected(k){
        const x4=selected1
        if(!(x4.includes(k))){x4.push(k);}
        setSelected1(x4);
        const a1=results.filter(item => item !== k);
        setResult(a1)
        setInput('')

    }
    async function CreateGroups(){
        const graph={}
        selected1.map((k)=>{
            graph[k]={}
            selected1.map((z)=>{
                if(!(z===k)){
                    graph[k][z]=0
                }
            })
        })
        const l={name:groupName,members:selected1,graph:graph}
        try{
            await addDoc(collection(db,'groups'),l)
        }catch(err){console.log(err)}
        alert('Added')
        window.location= `/group`
    }


    return(
        <><h3>Group Name</h3><input placeholder="Group Name ....." value={groupName} onChange={(e) => ChangeGroupName(e.target.value)} />
        <h1></h1><button onClick={()=> CreateGroups()}>Create Group</button>
            <Display123 x4={selected1}/>
            <input placeholder="Search here.." value={input} onChange={(e)=>changeHandler(e.target.value)} />
            <div>{results.map((k) =><div><h5>{m1[k]}</h5><button onClick={()=> addToSelected(k)}>Add friend to selected</button></div>)}</div>
            
        </>
    )
}
export default CreateGroup;