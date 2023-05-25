import React, { useContext } from "react";
import { collection, query,where,getDocs,getDoc,doc,updateDoc, addDoc} from "firebase/firestore";
import { db } from "../../firebase";
import { useState ,useEffect} from "react"
import { AuthContext } from "../../context/Authcontext"

function CreateGroup(){
    const user = useContext(AuthContext).currentUser.uid
    
    const [groupName,setGroupName]=useState('')
    const [friends,setFriends]=useState([])
    const [m1,setMabc]=useState({})
    const [m2,setMabcd]=useState({})
    const [results,setResult]=useState([]);
    const [selected1,setSelected1]=useState([user]);
    const [input,setInput]=useState("");
    const [loading,setLoading]=useState(true)
    const [loading1,setLoading1]=useState(true)
    const [sortredFriends,setSoretedFriends]=useState([])

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
                setLoading1(false)
                
                //console.log(friends,"f")
                
            }catch(err){console.log(err)}
        }
        FriensdsArr()
    },[])
    useEffect(()=>{const getUser=async()=>{
        try{    const userDocs=await Promise.all(friends.map(k=>getDoc(doc(db,"users",k))))
                
                userDocs.map((k)=>{
                    
                    const mt=m1;
                    const mt1=m2;
                    mt[k.id]=k.data().name
                    mt1[k.id]=k.data().profile_pic
                    setMabc(mt)
                    setMabcd(mt1)
                })
        const friends2=friends
        friends2.sort((a,b)=>{m1[a]>m1[b]?-1:1})
        console.log(friends2)
        setSoretedFriends(friends2)
        //console.log(m1,'m1')
        }catch(err){console.error(err)}
        }
        getUser()
        
    },[loading1])
    useEffect(()=>{
        const x3=[];
        const z=sortredFriends
        console.log(sortredFriends)
        z.map((k) => {
            
                if(k!==user){
                    x3.push(k);
                }
        });
        setResult(x3);
        
        
        setLoading(false)
    },[sortredFriends])

    useEffect(()=>{
        const x3=[];
        const z=sortredFriends
        z.map((k) => {
            
                if(m1[k].includes(input) && !(selected1.includes(k)) && k!==user){
                    x3.push(k);
                }
        });
        setResult(x3);
    },[input,selected1])
    function changeHandler(input1){
        
        setInput(input1);
        
    }
    function removeFromSelected(k){
        const x4 = selected1.filter(item => item !== k)
        setSelected1(x4);
    }
    function Display123(){
        
        return(<><h3 className="text-lg justify-center border-b-2 border-green-400 mb-8">Selected Members</h3>
        <div className="flex p-3 space-x-6 items-center"><img src={m2[user]} className="inline w-12 border-2 rounded-full "/><p className="text-lg">{m1[user]}</p>
        </div>
        <div className="max-h-72 overflow-y-auto">{selected1.map((k) => k===user? <p></p>:
            <div className="flex space-x-6 items-center">
                <img src={m2[k]} className="inline w-12 border-2 rounded-full "/>
                <h5 className="text-lg">{m1[k]}</h5>
                <button className="text-4xl text-red-600" onClick={()=> removeFromSelected(k)}><span class="material-icons">person_remove</span></button>
            </div>)}</div></>);
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

    if(loading && loading1){return(<div>Loading</div>)}
    return(
        <><h1 className="text-3xl font-bold text-center mt-5 my-5">New Group</h1>
        <div className="flex mx-10 mt-8 justify-center">
            <label className="text-lg">Group Name :</label>
            <input className="mx-5 border-b-2 border-blue-500 p-2 outline-none" placeholder="Group Name ....." value={groupName} onChange={(e) => ChangeGroupName(e.target.value)} />
        </div>
        <div className="flex justify-evenly">
            <div>
                <div className="">
                    <div>
                    <label className="text-lg">Select Members</label>
                    <input className="mx-5 border-b-2 border-blue-500 p-2 outline-none my-8" placeholder="Search here.." value={input} onChange={(e) => changeHandler(e.target.value)} />
                    </div>
                </div>
                <div className="mx-10 max-h-96 overflow-y-auto">{results.map((k) => 
                <div className="flex space-x-6 p-3 items-center">
                    <div>
                        <img src={m2[k]} className="inline w-12 border-2 rounded-full "/>
                    </div>
                    <p>{m1[k]}</p>
                    <button onClick={() => addToSelected(k)} className="text-4xl text-green-500 ">
                        <span class="material-icons">person_add</span>
                    </button></div>)}
                </div>
                </div>
                <div className="my-8  ">
            <Display123 x4={selected1} />
            </div>
            </div>
            
        
        <div className="text-center my-5">
            <button className="felx items-center text-lg bg-cyan-900 px-3 py-1 font-sans rounded-lg text-white text-center" onClick={()=> CreateGroups()}><span class="material-icons pr-3">groups</span><span>Create Group</span></button>   
        </div>
        </>
    )
}
export default CreateGroup;
