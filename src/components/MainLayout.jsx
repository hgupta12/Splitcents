import React from "react"
import { Link, Outlet } from "react-router-dom"
import MainNavigation from './navbar'



{/* <div className="h-16 bg-slate-700 text-white flex items-center text-2xl">
                <h1 className="font-bold ml-8">SplitCents</h1>
            </div> */}

export default function MainLayout () {
    return (
       
        <div className="h-screen flex flex-col">
            


            <div className="flex-grow">
                <Outlet />
            </div>
            
            <div className="h-12 bg-slate-700 text-white flex justify-evenly">
                <Link to="/group">groups</Link>
                <Link to="/friends">friends</Link>
                <Link to="/history">history</Link>
                <Link to="/profile">profile</Link>
            </div>
        </div>
        
    )
}