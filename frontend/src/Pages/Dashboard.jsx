import React from 'react'
import Sidebar from '../components/core/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
    <Sidebar/>
    <div className="min-h-[calc(100vh-3.5rem)] overflow-x-hidden overflow-y-hidden">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10 relative">
            <Outlet/>
        </div>
    </div>
</div>
  )
}

export default Dashboard
