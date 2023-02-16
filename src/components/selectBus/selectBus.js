import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../state/context";
import {adminGetVehicleQuery } from '../actions/actions';
import GIG2 from '../../images/GIG2.png'
import './selectBus.css';
import ViewSeat from "./viewSeat";



const SelectBus =()=>{ 
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, viewSeats, setViewSeats}=useGlobalState()
    const {Loading, query,}= useSelector((state)=> state.posts)


    const adults = location.state.adults;
    const arrivalTerminal = location.state.arrivalTerminal;
    const departureTerminal = location.state.departureTerminal;
    const bookingNumber = location.state.bookingNumber;


    const handleOpen=()=> setViewSeats(true)                       


     useEffect(()=>{
        dispatch(adminGetVehicleQuery(departureTerminal, arrivalTerminal))
     },[dispatch, arrivalTerminal, departureTerminal])



    return(
        <div className="selectBusContainer">
            <div>
                <img src={GIG2} alt={"BUS"} style={{padding: "1rem 1rem 0rem 2rem", borderRadius:"0.2rem"}}/>
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
              { viewSeats &&   <ViewSeat p={p}/> }
                </div>
              ))
            }
        </div>
    </div>
    )
}

export default SelectBus;