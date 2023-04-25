import React,{useState} from 'react'
import AddShowList from '../../../components/OwnerShows/AddShowList';
import OwnerHeader from '../../../components/OwnerHeader/OwnerHeader';
import OwnerFooter from '../../../components/OwnerFooter/OwnerFooter';
import OwnerSidebar from '../../../components/OwnerSidebar/OwnerSidebar'

 function OwnerShows() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <OwnerHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-row" style={{minHeight:'100vh'}}>
      <OwnerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <AddShowList/>
      </div>
      <OwnerFooter/>
    </div>
  )
}

export default OwnerShows
