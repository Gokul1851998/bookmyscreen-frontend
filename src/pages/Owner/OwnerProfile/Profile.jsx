import React,{useState} from 'react'
import OwnerProfile from '../../../components/OwnerProfile/OwnerProfile';
import OwnerHeader from '../../../components/OwnerHeader/OwnerHeader';
import OwnerFooter from '../../../components/OwnerFooter/OwnerFooter';
import OwnerSidebar from '../../../components/OwnerSidebar/OwnerSidebar'

 function Profile() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <OwnerHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-row" style={{minHeight:'100vh'}}>
      <OwnerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <OwnerProfile/>
      </div>
      <OwnerFooter/>
    </div>
  )
}

export default Profile
