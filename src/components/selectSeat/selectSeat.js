// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import { useGlobalState } from "../../state/context";
// import {bookVehicle ,adminGetVehicleQuery } from '../actions/actions';
// import GIG2 from '../../images/GIG2.png'





const SelectSeat = () => {
    const location = useLocation();
    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    // const { selectedSeat, setSelectedSeat, }=useGlobalState()
    // const {Loading, allPosts, query}= useSelector((state)=> state.posts)
    
    
    const id = location.state.id;
    console.log(id);
    // const unAvailableDate = location.state.unAvailableDate;
    // const date = location.state.date;
    // const seat = location.state.seat;
    // const adults = location.state.adults;
    // const arrivalTerminal = location.state.arrivalTerminal;
    // const departureTerminal = location.state.departureTerminal;
    // const bookingNumber = location.state.bookingNumber;
    // const creator = location.state.creator;

    // const handleChange = (e)=>{
    //     if(e.target.checked){
    //       setSelectedSeat(selectedSeat.push(e.target.value))
    //     }
    //     else{
    //       setSelectedSeat(selectedSeat.filter((p)=> p !== e.target.value))
    //     }
    //   }

    //   useEffect(()=>{
        
    //   },[])

  return (
    <div>
        <div>
          {/* {unAvailableDate} */}
        </div>
    </div>
  )
}

export default SelectSeat;