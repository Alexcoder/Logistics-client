import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../state/context";
import {adminGetVehicleQuery } from '../actions/actions';
// import {AiOutlineRollback} from 'react-icons/ai';
// import {IoArrowBackOutline} from 'react-icons/io'
import {IoIosArrowBack} from 'react-icons/io'
import GIG2 from '../../images/GIG2.png'
import './selectBus.css';



const SelectBus =()=>{ 
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [viewSeats, setViewSeats] = useState(false)
    const [selectedSeatId, setSelectedSeatId] = useState([])
    const [selectedSeatNumber, setSelectedSeatNumber] = useState([])
    const {user,}=useGlobalState()
    const {Loading, query,}= useSelector((state)=> state.posts)


    const date = location.state.date;
    const adults = location.state.adults;
    const arrivalTerminal = location.state.arrivalTerminal;
    const departureTerminal = location.state.departureTerminal;
    const bookingNumber = location.state.bookingNumber;
    const creator = location.state.creator;


     const handleOpen=()=>{
          setViewSeats(true)                       
     }

     const handleSelectedSeat = (e)=>{
        if(e.target.checked){
          setSelectedSeatId([...selectedSeatId, e.target.value]);
          setSelectedSeatNumber([...selectedSeatNumber, e.target.id]);
        }
        else{
          setSelectedSeatId(selectedSeatId.filter((p)=> p !== e.target.value))
          setSelectedSeatNumber(selectedSeatNumber.filter((p)=> p !== e.target.id));
        }
      }

     const ReserveSeat = (vehicle)=>{
       if(selectedSeatNumber.length>=adults){
        navigate(`/pay`, 
        {state:{
             date ,
             adults ,
             arrivalTerminal,
             departureTerminal,
             bookingNumber,
             creator ,
             price: vehicle.price,
             selectedSeatId,
             selectedSeatNumber,
        }})
      }else{
        return null
      }
      }

      const unAvailableDate = (booking) =>{
       const isFound =   booking.unAvailableDate.some((booked)=> booked.includes(date))
       return isFound
    }


     useEffect(()=>{
        dispatch(adminGetVehicleQuery(departureTerminal, arrivalTerminal))
     },[dispatch, arrivalTerminal, departureTerminal])


    return(
        <div className="selectBusContainer">
            <div>
                <img src={GIG2} alt={"BUS"} style={{padding: "1rem 1rem 0rem 2rem"}}/>
            </div>
            <div style={{marginTop:"4rem"}}>
                {
                Loading ? "Loading..." :
                 !query[0]? 
                 <div>
                 <div>SELECTION NOT FOUND</div>
                 <button
                 onClick={()=> {navigate(`/home`)}}
                 style={{
                    border:"1px solid gray", 
                    borderRadius:"0.3rem", 
                    padding:"0.5rem",
                    margin:"1rem 0rem 0rem 0rem",
                    width:"8rem",
                }}
                 >
                    Back
                 </button>
                 </div>:
                    query.map((p)=>(
                        <div key={p._id}>
                            <div>
                                <span
                                 style={{color:"blue", margin:"0rem 1rem 0rem 0rem"}}>
                                    Travelling From:
                                </span>
                                      {p.departureTerminal}  
                           </div>
                            <div>
                                <span
                                 style={{color:"red", margin:"0rem 1rem 0rem 0rem"}}>
                                    Travelling To:
                                </span>
                                      {p.arrivalTerminal}  
                           </div>
                            <div>Name :  {` ${user?.firstName} ${user?.lastName}`} </div>
                            <div> Booking Number : {bookingNumber}</div>
                            <div>Adults(s)  :  {adults} </div>
                            <div>Amount : NGN {Intl.NumberFormat().format(p.price)}.00</div>
                            <button 
                            className="viewSeats"
                            onClick={handleOpen}>
                                View Seats
                            </button>
              {/* SEAT SELECTION */}
              {viewSeats &&
              <div className="seatSelection">
                <div>
                  <button>close</button>
                    <div className="checkBox">
                        {
                        p.seatNumber.map((t)=>(
                         <div key={t._id}>
                          <div style={{display:"flex", gap:"0.2rem"}}>
                           <input
                            disabled={unAvailableDate(t)}
                            type="checkbox"
                            onChange={handleSelectedSeat}
                             style={{width:"1rem"}}
                             id={t.number} value={t._id}/>
                             <div>{t.number}</div>
                           </div>
                         </div>
                           ))
                           } 
                        <button 
                        onClick={()=>ReserveSeat(p)}
                        className="reserveSeats">Reserve Seat</button>
                        <button
                        onClick={()=> setViewSeats(false)}
                        className="closeSeats"><IoIosArrowBack/></button>
                    </div> 
                </div> 
              </div> 
            //   : null
             }
                </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SelectBus;