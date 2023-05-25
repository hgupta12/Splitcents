import React from "react"
import { Link, Outlet } from "react-router-dom"
import MainNavigation from './navbar'

export default function MainLayout () {
    return (
        <div>

            <MainNavigation/>

            <div className="pb-12">
                <Outlet />
            </div>
        </div>
        
    )
}