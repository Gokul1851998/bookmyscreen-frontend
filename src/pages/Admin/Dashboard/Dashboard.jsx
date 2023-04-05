import React,{useState} from 'react'
import Sidebar from '../../../components/AdminSidebar/Sidebar'
import Header from '../../../components/AdminHeader/Header'
import Footer from '../../../components/AdminFooter/Footer'


 function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Footer/>
    </div>
  )
}

export default Dashboard
