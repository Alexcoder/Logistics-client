import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../state/context";
import {TbSteeringWheel} from "react-icons/tb"
import './selectBus.css';



const ViewSeat =({p})=>{ 
    const location = useLocation();
    const navigate = useNavigate()
    const {
        selectedSeatId, 
        setSelectedSeatId, 
        selectedSeatNumber, 
        setSelectedSeatNumber,
        setViewSeats} = useGlobalState()


    const date = location.state.date;
    const adults = location.state.adults;
    const arrivalTerminal = location.state.arrivalTerminal;
    const departureTerminal = location.state.departureTerminal;
    const bookingNumber = location.state.bookingNumber;
    const creator = location.state.creator;

    const handleSelectedSeat = (seatId, seatNo)=>{
        const checkId= selectedSeatId.find((item)=> item=== seatId);

        if (!checkId){
          let data=[...selectedSeatId];
          data.push(seatId);
          setSelectedSeatId(data)
          setSelectedSeatNumber([...selectedSeatNumber, seatNo])
         }else{
           let data=[...selectedSeatId];
           data.filter(item=> item !==seatId)
           setSelectedSeatId(data);
           } 
       };

     const ReserveSeat = (vehicle)=>{
       if(selectedSeatNumber.length===Number(adults)){
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
     
     const handleClear =()=>{
        setViewSeats(false); 
        setSelectedSeatId([]); 
        setSelectedSeatNumber([])
     }

     const handleBackgroundColor = (item) =>{
      const clickedSeat = item._id;
      const check = selectedSeatId.find((seatId)=> seatId === clickedSeat);
       if(check) return "orange"
       else if(unAvailableDate(item)) return "gray"
       else return "blue"
     }




    return(
              <div className="seatSelection">

                <div >
                    <button onClick={handleClear} style={{justifyContent:"right",padding:"0.2rem 1rem", marginBottom:"0.5rem",borderRadius:"0.2rem", background:"white"}}>Back</button>
                  
                    <div className="checkBox">
                      <div  style={{float:"right", color:"black",fontSize:"4rem", fontWeight:"600"}}><TbSteeringWheel/></div>
                      <div><button></button></div>
                        {
                          p.seatNumber.map((item)=>(
                            <div key={item._id}>
                            <div style={{display:"flex", gap:"0.2rem"}}>
                                <button
                                    disabled={unAvailableDate(item)}
                                    onClick={()=>handleSelectedSeat(item._id, item.number)}
                                    style={
                                        {width:"3rem",
                                         background: handleBackgroundColor(item), 
                                         color:"white", 
                                         borderRadius:"0.2rem", 
                                         padding:"0.3rem"
                                        }}
                                        >{item.number}
                                </button>
                            </div>
                        </div>
                                        ))
                           } 
                    </div> 
                        <button 
                          onClick={()=>ReserveSeat(p)}
                          className="reserveSeats">Reserve Seat
                        </button>
                </div> 
              </div> 

)
}

export default ViewSeat;