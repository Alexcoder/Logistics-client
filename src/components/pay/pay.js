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
    const {user, setSelectedSeatNumber, setSelectedSeatId}=useGlobalState()


    const date = location.state.date;
    const adults = location.state.adults;
    const arrivalTerminal = location.state.arrivalTerminal;
    const departureTerminal = location.state.departureTerminal;
    const bookingNumber = location.state.bookingNumber;
    const creator = location.state.creator;
    const price = location.state.price;
    const selectedSeatId = location.state.selectedSeatId;
    const selectedSeatNumber = location.state.selectedSeatNumber;

// console.log({
//     "date": date,
//     "adults": adults,
//     "departureTerminal": departureTerminal,
//     "arrivalTerminal": arrivalTerminal,
//     "bookingNumber": bookingNumber,
//     "creator": creator,
//     "price": price,
//     "selectedSeatId": selectedSeatId,
//     "selectedSeatNumber(s)": selectedSeatNumber
// });

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
    dispatch(bookVehicle(bookingDetail));
    setSelectedSeatId([]);
    setSelectedSeatNumber([])
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
        <div className="payContainer">
            <div >
                <p style={{textAlign:"center", fontSize:"1.6rem", fontWeight:"500", marginBottom:"1rem"}}>Trip Summary</p>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <span>From</span>
                    <span>{departureTerminal}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <span>To</span>
                    <span>{arrivalTerminal}</span>
                </div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <span>Date</span>
                    <span>{date}</span>
                </div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <span>Time</span>
                    <span>{"07:45 AM"}</span>
                </div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <span>Seat Number(s)</span>
                    <span style={{display:"flex"}}>
                        {
                        selectedSeatNumber.join(",")
                        }
                  </span>
                </div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <span>Adult(s)</span>
                    <span>{adults}</span>
                </div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <span>Price</span>
                    <span>&#8358; {Intl.NumberFormat().format(price)}.00</span>
                </div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <span>Discount</span>
                    <span> {Intl.NumberFormat().format(price*adults*0)}</span>
                </div>
                <div style={{display:"flex", gap:"2rem",justifyContent:"space-between"}}>
                    <span  style={{marginTop:"0.3rem"}}>Total Amount</span>
                    <span style={{fontSize:"1.4rem", fontWeight:"500"}}>&#8358; {Intl.NumberFormat().format(price*adults)}.00</span>
                </div>
             <button
             onClick={()=> {Payment(); Booking(); updateSeat()}}
             style={{margin:"1rem 0rem 0rem 1rem",color:"white", background: "black",width:"85%", padding:"0.5rem", borderRadius:"0.4rem", border:"1px solid gray"}}>Pay</button>
            </div>
        </div>
    )
}

export default Pay;