import React,{useState} from 'react'
import Sidebar from '../../../components/AdminSidebar/Sidebar'
import Header from '../../../components/AdminHeader/Header'
import Footer from '../../../components/AdminFooter/Footer'
import AdminDashboard from '../../../components/AdminDashboard/AdminDashboard'


 function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-row" style={{minHeight:'100vh'}}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <AdminDashboard/>
        </div>
      <Footer/>
    </div>
  )
}

export default Dashboard
