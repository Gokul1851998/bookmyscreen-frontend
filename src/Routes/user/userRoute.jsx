import React from 'react'
import Home from '../../pages/User/Home/Home'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import PublicRouteUser from '../../components/PublicRouteUser/PublicRouteUser'
import ProtectedRouteUser from '../../components/ProtectRouteUser/ProtectRouteUser'
import MoviePage from '../../pages/User/MoviePage/MoviePage'
import Movies from '../../pages/User/Movies/Movies'
import ShowDetails from '../../pages/User/ShowDetails/ShowDetails'
import SelectSeats from '../../pages/User/SelectSeats/SelectSeats'
import Payment from '../../pages/User/Payment/Payment'
import UserOrder from '../../pages/User/Orders/UserOrder'
import UserTicket from '../../pages/User/Ticket/UserTicket'
import UserWallet from '../../pages/User/Wallet/UserWallet'
import Success from '../../pages/User/PaymentSuccess/Success'
import UserChat from '../../pages/User/UserChat/UserChat'
import UserProfile from '../../pages/User/Profile/UserProfile'
import SingleChat from '../../pages/User/Chat/SingleChat'

 function UserRoute() {
  return (
    <div>
        <Routes>
        <Route exact path='/' element={<PublicRouteUser><Home/></PublicRouteUser>}/>
        <Route exact path='/singleMoviePage' element={<PublicRouteUser><MoviePage/></PublicRouteUser>}/>
        <Route exact path='/allMovies' element={<PublicRouteUser><Movies/></PublicRouteUser>}/>
        <Route exact path='/shows' element={<PublicRouteUser><ShowDetails/></PublicRouteUser>}/>
        <Route exact path='/selectSeats' element={<PublicRouteUser><SelectSeats/></PublicRouteUser>}/>
        <Route exact path='/payment' element={<ProtectedRouteUser><Payment/></ProtectedRouteUser>}/>
        <Route exact path='/orders' element={<ProtectedRouteUser><UserOrder/></ProtectedRouteUser>}/>
        <Route exact path='/ticket' element={<ProtectedRouteUser><UserTicket/></ProtectedRouteUser>}/>
        <Route exact path='/wallet' element={<ProtectedRouteUser><UserWallet/></ProtectedRouteUser>}/>
        <Route exact path='/success' element={<ProtectedRouteUser><Success/></ProtectedRouteUser>}/>
        <Route exact path='/chatList' element={<ProtectedRouteUser><UserChat/></ProtectedRouteUser>}/>
        <Route exact path='/profile' element={<ProtectedRouteUser><UserProfile/></ProtectedRouteUser>}/>
        <Route exact path='/chat' element={<ProtectedRouteUser><SingleChat/></ProtectedRouteUser>}/>
        
        </Routes>
      
    </div>
  )
}

export default UserRoute
