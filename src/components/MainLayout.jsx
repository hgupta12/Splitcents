import React from "react"
import { Outlet } from "react-router-dom"

export default function MainLayout () {
    return (
        <div className="h-screen flex flex-col">
            <div className="h-16 bg-slate-700 text-white flex items-center text-2xl">
                <h1 className="font-bold ml-8">SplitCents</h1>
            </div>

            <div className="flex-grow">
                <Outlet />
            </div>
            
            <div className="h-12 bg-slate-700 text-white flex justify-evenly">
                <a href="/group">groups</a>
                <a href="/friends">friends</a>
                <a href="/history">history</a>
                <a href="/profile">profile</a>
            </div>
        </div>
    )
}