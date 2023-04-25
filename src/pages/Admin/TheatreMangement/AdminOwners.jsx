import React,{useState} from 'react'
import Footer from '../../../components/AdminFooter/Footer'
import Header from '../../../components/AdminHeader/Header'
import TheatreManagement from '../../../components/TheatreManagement/TheatreManagement'
import Sidebar from '../../../components/AdminSidebar/Sidebar'

 function AdminOwners() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
    return(
        <div>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex flex-row" style={{minHeight:'100vh'}}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <TheatreManagement/>
        </div>
        <Footer/>
        </div>
  )
}

export default AdminOwners
