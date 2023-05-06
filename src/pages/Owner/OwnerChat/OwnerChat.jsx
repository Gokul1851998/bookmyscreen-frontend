import React,{useState} from 'react'
import OwnerHeader from '../../../components/OwnerHeader/OwnerHeader';
import OwnerFooter from '../../../components/OwnerFooter/OwnerFooter';
import OwnerSidebar from '../../../components/OwnerSidebar/OwnerSidebar'
import OwnerChatList from '../../../components/OwnerChat/OwnerChatList';

 function OwnerChat() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <OwnerHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-row" style={{minHeight:'100vh'}}>
      <OwnerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <OwnerChatList/>
      </div>
      <OwnerFooter/>
    </div>
  )
}

export default OwnerChat
