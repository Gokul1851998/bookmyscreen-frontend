import React,{useState} from 'react'
import SailsReport from '../../../components/OwnerSailsReport/SailsReport';
import OwnerHeader from '../../../components/OwnerHeader/OwnerHeader';
import OwnerFooter from '../../../components/OwnerFooter/OwnerFooter';
import OwnerSidebar from '../../../components/OwnerSidebar/OwnerSidebar'

 function OwnerSailsReport() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <OwnerHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-row" style={{minHeight:'100vh'}}>
      <OwnerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <SailsReport/>
      </div>
      <OwnerFooter/>
    </div>
  )
}

export default OwnerSailsReport
