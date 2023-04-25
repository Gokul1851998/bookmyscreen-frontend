import React,{useState} from 'react'
import OwnerScreen from '../../../components/OwnerScreen/OwnerScreen'
import OwnerHeader from '../../../components/OwnerHeader/OwnerHeader';
import OwnerFooter from '../../../components/OwnerFooter/OwnerFooter';
import OwnerSidebar from '../../../components/OwnerSidebar/OwnerSidebar'

 function OwnerScreenMangement() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <OwnerHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-row" style={{minHeight:'100vh'}}>
      <OwnerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <OwnerScreen/>
      </div>
      <OwnerFooter/>
    </div>
  )
}

export default OwnerScreenMangement
