import React, { useState } from 'react';
import Header from '../../../components/AdminHeader/Header';
import Footer from '../../../components/AdminFooter/Footer';
import Sidebar from '../../../components/AdminSidebar/Sidebar';
import SailsReport from '../../../components/AdminSailsReport/SailsReport';

function AdminSailsReport() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <SailsReport />
      </div>
      <Footer />
    </div>
  );
}

export default AdminSailsReport;
