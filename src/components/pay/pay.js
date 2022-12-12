// import { useState, useEffect } from "react";
import { useDispatch,  } from "react-redux";
import { useLocation, useNavigate, } from "react-router-dom";
import { useGlobalState } from "../../state/context";
import {bookVehicle  } from '../actions/actions';
import './pay.css';
import axios from "axios";



const Pay =()=>{ 
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user,}=useGlobalState()
    // const {Loading}= useSelector((state)=> state.posts)


    const date = location.state.date;
    const adults = location.state.adults;
    const arrivalTerminal = location.state.arrivalTerminal;
    const departureTerminal = location.state.departureTerminal;
    const bookingNumber = location.state.bookingNumber;
    const creator = location.state.creator;
    const price = location.state.price;
    const selectedSeatId = location.state.selectedSeatId;
    const selectedSeatNumber = location.state.selectedSeatNumber;

console.log({
    "date": date,
    "adults": adults,
    "departureTerminal": departureTerminal,
    "arrivalTerminal": arrivalTerminal,
    "bookingNumber": bookingNumber,
    "creator": creator,
    "price": price,
    "selectedSeatId": selectedSeatId,
    "selectedSeatNumber(s)": selectedSeatNumber
});

const bookingDetail ={
    creator,
    departureTerminal,
    arrivalTerminal,
    date,
    adults,
    price,
    amount: price*adults,
    bookingNumber,
    seat: selectedSeatNumber,
    firstName: user?.firstName,
    lastName: user?.lastName,
}



const Payment=()=>{
    // PAYMENT INFO
}

const Booking=()=>{
    // DISPATCH BOOKING DETAILS TO USER SCHEMA IN BACK-END
    dispatch(bookVehicle(bookingDetail))
}

const updateSeat= async()=>{
    // DISPATCH SELECTED SEAT ID WITH DATE IN DATA BASE
    try{
        const {data} = await Promise.all(
            selectedSeatId?.map((seatId)=>{
             return(
             axios.put(`https://logistics-api.onrender.com/api/addDate/${seatId}`, {date})
            )})
            )
            navigate(`/userBooking`)
             return data

    }catch(err){
     console.log(err);
    }
}


    return(
        <div style={{margin:"4rem 0rem 0rem 2rem",}}>
            <div style={{display:"grid", gap:"0.3rem", opacity:"0.8", border: "0.4px solid lightgray", width:"110%", borderRadius:"0.4rem", background: "lightGreen", padding:"0rem 1rem 2rem 1rem"}}>
                <p style={{textAlign:"center", fontSize:"1.6rem", fontWeight:"500", marginBottom:"1rem"}}>Trip Summary</p>
                <div style={{display:"flex", gap: "8.8rem"}}>
                    <span>From</span>
                    <span>{departureTerminal}</span>
                </div>
                <div style={{display:"flex", gap: "10rem"}}>
                    <span>To</span>
                    <span>{arrivalTerminal}</span>
                </div>
                <div style={{display:"flex", gap: "9rem"}}>
                    <span>Date</span>
                    <span>{date}</span>
                </div>
                <div style={{display:"flex", gap: "9rem"}}>
                    <span>Time</span>
                    <span>{"07:45 AM"}</span>
                </div>
                <div style={{display:"flex", gap: "4rem"}}>
                    <span>Seat Number(s)</span>
                    <span style={{display:"flex"}}>
                        {selectedSeatNumber.map((seat, i)=>(
                        <div key={i} >
                            <div>
                                {seat},
                            </div>
                        </div>
                    ))}</span>
                </div>
                <div style={{display:"flex", gap: "7.5rem"}}>
                    <span>Adult(s)</span>
                    <span>{adults}</span>
                </div>
                <div style={{display:"flex", gap: "9rem"}}>
                    <span>Price</span>
                    <span>NGN {Intl.NumberFormat().format(price)}.00</span>
                </div>
                <div style={{display:"flex", gap: "8rem"}}>
                    <span>Discount</span>
                    <span> {Intl.NumberFormat().format(price*adults*0)}</span>
                </div>
                <div style={{display:"flex", gap: "5rem"}}>
                    <span  style={{marginTop:"0.3rem"}}>Total Amount</span>
                    <span style={{fontSize:"1.4rem", fontWeight:"500"}}>NGN {Intl.NumberFormat().format(price*adults)}.00</span>
                </div>
             <button
             onClick={()=> {Payment(); Booking(); updateSeat()}}
             style={{margin:"1rem 0rem 0rem 1rem",color:"white", background: "black",width:"85%", padding:"0.5rem", borderRadius:"0.4rem", border:"1px solid gray"}}>Pay</button>
            </div>
        </div>
    )
}

export default Pay;