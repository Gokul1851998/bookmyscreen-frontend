import React,{useState} from "react";
import Footer from "../../../components/AdminFooter/Footer";
import Header from "../../../components/AdminHeader/Header";
import Sidebar from "../../../components/AdminSidebar/Sidebar";
import AdminMovies from "../../../components/AdminMovies/AdminMovies";

function MovieManagement(){
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return(
        <div>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex flex-row" style={{minHeight:'100vh'}}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <AdminMovies/>
        </div>
        <Footer/>
        </div>
    )
}

export default MovieManagement