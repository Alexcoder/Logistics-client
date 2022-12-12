import React, {useEffect} from "react";
import {useGlobalState} from './state/context';
import {Routes, Route, Navigate} from 'react-router-dom';
import {useDispatch } from "react-redux";
import {Home, CreateVehicleInfo, Login, Navbar, Sidebar, SelectBus, SelectSeat, Pay, AllBookings,UserBooking, NavSmall} from './components/index';
import {adminGetAllVehicleInfo, adminGetVehicleQuery, getOneBookedInfo,getAllBookedInfo} from "./components/actions/actions";
import './App.css';

function App() {
  const {user, mainSidebar, creator}  = useGlobalState();
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(adminGetAllVehicleInfo())
    dispatch(adminGetVehicleQuery())
    dispatch(getOneBookedInfo(creator))
    dispatch(getAllBookedInfo())
  },[dispatch, creator])


  
  const AdminRoute=({children})=>{
    if(user?.isAdmin) return children;
    else return <Navigate to="/"/>
  }
  const ProtectedRoute=({children})=>{
    if(user?.id) return children;
    else return <Navigate to="/home"/>
  }
  const LoginRoute=({children})=>{
    if(user?.isAdmin) return <Navigate to="/admin"/>;
    else if (user?.id) return <Navigate to="/home"/>
    else return children;
  }
  const HomeRoute=()=>{
    if(user?.isAdmin) return <Navigate to="/admin"/>;
    else if(user?.id) return <Navigate to="/home"/>;
    else return <Navigate to="/login"/>
  }


  return (
  
    <div >
      <div className="largeDevice"> <Navbar /> </div>  
      <div className="smallDevice"> <NavSmall /> </div>  
      <div style={{display: "flex",}}>
        <div>
          {
            mainSidebar ? <Sidebar/> : null
          }
        </div >
          <div style={{display: "flex", padding:"0rem"}}>
        <Routes>
         <Route path="/" element={<HomeRoute/>}/>
         <Route path="/login" element={<LoginRoute><Login/></LoginRoute>}/>
         <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
         <Route path="/admin" element={<AdminRoute><CreateVehicleInfo/></AdminRoute>}/>
         <Route path="/allBookings" element={<AdminRoute><AllBookings/></AdminRoute>}/>
         <Route path="/userBooking" element={<ProtectedRoute><UserBooking/></ProtectedRoute>}/>
         <Route path="/select-bus" element={<ProtectedRoute><SelectBus/></ProtectedRoute>}/>
         <Route path="/select-seat" element={<ProtectedRoute><SelectSeat/></ProtectedRoute>}/>
         <Route path="/pay" element={<ProtectedRoute><Pay/></ProtectedRoute>}/>

       </Routes>
          </div>
     </div>
    </div>

  );
}

export default App;
