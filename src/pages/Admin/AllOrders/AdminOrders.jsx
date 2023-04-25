import React from 'react'
import Header from '../../../components/AdminHeader/Header'
import Footer from '../../../components/AdminFooter/Footer'
import Sidebar from '../../../components/AdminSidebar/Sidebar';
import { useState } from 'react';
import AllOrders from '../../../components/AdminOrders/AllOrders';
 function AdminOrders() {
 const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
       <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
       <div className="flex flex-row" style={{minHeight:'100vh'}}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <AllOrders/>
        </div>
      <Footer/>
    </div>
  )
}

export default AdminOrders