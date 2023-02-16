import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../state/context";
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
       console.log(selectedSeatId)
       console.log(selectedSeatNumber);
 

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




    return(
              <div className="seatSelection">

                <div >
                    <div onClick={handleClear} style={{justifyContent:"right"}}>X</div>
                  
                    <div className="checkBox">
                      <div  style={{float:"right", color:"black", fontWeight:"600"}}><button>DRIVER</button></div>
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
                                         background: unAvailableDate(item)? "gray" : "blue", 
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