import React, { useContext } from "react";
import { useState ,useEffect} from "react"
import {useOutletContext} from "react-router-dom"
import { collection, query,where,getDocs,getDoc,doc,updateDoc} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/Authcontext";

var x4=[];
export default function AddMember () {
    const user = useContext(AuthContext).currentUser.uid
    
    const [input,setInput]=useState("");
    const [results,setResult]=useState([]);
    const [selected1,setSelected1]=useState([]);
    const [friends,setFriends]=useState([])
    const [m1,setMabc]=useState({})
    const [info1,setInfo1]=useState({})
    let [ group, setGroup ] = useOutletContext()

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

    useEffect(()=>{
        const getGroup=async()=>{
            const docGropuRef=doc(db,"groups",group.id);
          try{
            
            const docSnap = await getDoc(docGropuRef)
            const filteredGroupData= docSnap.data();
            setInfo1(filteredGroupData)
            //console.log(filteredGroupData,"data")
          }catch(err){console.error(err);}
        
          };
          getGroup();
    },[friends])
    

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

    function addToSelected(k){
        
        if(!(x4.includes(k))){x4.push(k);}
        setSelected1(x4);
        const a1=results.filter(item => item !== k);
        setResult(a1)
        setInput('')

    }
    
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
    function removeFromSelected(k){
        x4 = selected1.filter(item => item !== k)
        setSelected1(x4);
    }
    function Display123(){
        
        return(<><h3>Selected Friends</h3><div>{selected1.map((k) => <div><h5>{m1[k]}</h5><button onClick={()=> removeFromSelected(k)}>Remove friend from selected</button></div>)}</div></>);
    }
    function changeHandler(input1){
        
        setInput(input1);
        
    }
    async function addFriendsToGroup(){
        const updatexyz=info1
        const membersxyz=info1.members
        selected1.map((k)=>{membersxyz.push(k)})
        const graphxyz=info1.graph
        const l=Object.keys(graphxyz)
        l.map((k)=>{
            selected1.map((z)=>{
                graphxyz[k][z]=0
            })
        })
        selected1.map((k)=>{
            graphxyz[k]={}
            membersxyz.map((z)=>{
                if(k!==z){graphxyz[k][z]=0}
            })
        }) 
        updatexyz.members=membersxyz
        updatexyz.graph=graphxyz  
        await updateDoc(doc(db,"groups",group.id),updatexyz)
        alert('Added')
        window.location= `/group/${group.id}`
        
    }
    
    //const members=[a1,b1,c1,d1,e1,f1,l1];
    //const friends=[d1,z1,k1,l1];
    //const friendsNotInGroup=friends.map((user_id)=>());
    return(
        <>
            <h1></h1>
            <button onClick={()=> addFriendsToGroup(selected1)}>Add Selected Friends</button>
            <Display123 x4={selected1}/>
            <input 
                placeholder="Search here.." 
                value={input} 
                onChange={(e)=>changeHandler(e.target.value)} 
            />

            <div>
                {
                    results.map((k) => 
                        info1.members.includes(k) 
                        ?  
                            <div>
                                <h5>{m1[k]}</h5>
                                <p>Already in group</p>
                            </div>
                        :
                            <div>
                                <h5>{m1[k]}</h5>
                                <button onClick={()=> addToSelected(k)}>Add friend to selected</button>
                            </div>
                    )
                }
            </div>
            
        </>
    );
}