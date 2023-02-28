import React from 'react';
import {useNavigate} from "react-router-dom";
import { useGlobalState } from "../../state/context";
import {Grid, Button } from "@mui/material";
import { bookUtils, Adults } from './utils_home';

import './home2.css'
// import './home.css'

const Home_input_field = () => {
  const { bookDetail, setBookDetail, user,booking, setBooking,trip, setTrip, FormatDate}= useGlobalState();
  const { departureTerminal,arrivalTerminal, adults, date}= bookDetail;
  
  const navigate = useNavigate()
  const creator = user?.id
  const bookingNumber = `ALX-${Math.ceil(Math.random()*10000000000)}` 


  const handleChange=(e)=>{
     setBookDetail((prev)=> ({...prev, [e.target.name]: e.target.value}))
  }
  
  const handleProceed=(e)=>{
      e.preventDefault();
      if(!departureTerminal || !arrivalTerminal || !date || !adults){
          alert("Empty Field Not Allowed")
      } else{
          navigate('/select-bus', 
          {state:{departureTerminal,arrivalTerminal, date,adults, bookingNumber, creator }})
      }
  }

  return (
    <main>
        <div className='home-input-field'>
            <div style={{color:"white"}}>
            <div className="booking" >
              <button onClick={()=> setBooking("bookASit")} className={booking==="bookASit"? "bookASit blueBorderBelow" : "bookASit"}>Book a Seat</button>
              <button onClick={()=> setBooking("hireABus")} className={booking==="hireABus"? "hireABus blueBorderBelow" : "hireABus"}>Hire a bus</button>
              <button onClick={()=> setBooking("bookingStatus")} className={booking==="bookingStatus"? "bookingStatus blueBorderBelow" : "bookingStatus"}>Booking Status</button>
            </div>
            <hr/>
            </div>
            <div style={{margin:"1rem 0rem 1rem 0rem"}}>
              <div style={{display:"flex", gap:"1rem",justifyContent:"start",height: "3rem", margin:"0rem 0rem 0rem 1rem"}}>
              <button onClick={()=> setTrip("oneWay")} className={trip==="oneWay"? "oneWay tripColor": "oneWay"} >One Way</button>
              <button onClick={()=> setTrip("roundTrip")} className={trip==="roundTrip"? "roundTrip tripColor": "roundTrip"} >Round Trip</button>
             </div>
            </div>

            <div className="destination-container">
             <label htmlFor='travellingFrom' style={{marginRight:"1rem",}}> Travelling From</label>
            <select 
              id="travellingFrom"
              className="travellingFrom" 
              type="string"
              label="Departure Terminal" 
              name="departureTerminal" 
              value={departureTerminal} 
              onChange={handleChange}>
                <option >Departure Terminal</option>
                {bookUtils.map((travel,i)=>(
                   <option style={{background:"white",color:"black"}} value={travel.terminal} key={i}>{travel.terminal}</option>
                ))}  
            </select>
            </div> 

            <div className="destination-container">
            <label htmlFor='travellingFrom' style={{marginRight:"1rem",}}> Travelling To</label>
            <select className="travellingTo" type="string"
            label="Arrival Terminal" name="arrivalTerminal" value={arrivalTerminal} onChange={handleChange}>
                <option >Arrival Terminal</option>
                { departureTerminal? 
                bookUtils.filter((p)=>departureTerminal &&  p.terminal !==departureTerminal).map((travel,i)=>(
                   <option style={{background:"white",color:"black"}} value={travel.terminal} key={i}>{travel.terminal}</option>
                )) :
                <option style={{color:"white", background:"white", height:"3rem"}}>Select Departure Terminal</option>
                }
            </select>
            </div>

          <div style={{display: "flex", justifyContent:"space-between", color:"white", padding:"0rem 1rem"}}>
            <div style={{display: "flex", flexDirection:"column"}}>
             <label htmlFor='date_home'>Date</label>
            <input 
             className="date_home" 
             id="date_home" 
             type="date" 
             min={FormatDate}
             name="date" 
             value={date} 
             onChange={handleChange}/>
            </div>

            <div style={{display: "flex", flexDirection:"column"}}>
             <label htmlFor='adults_select'>Adults</label>
            <select 
            className="adults_select"
            id="adults_select"
            type="number" 
            label="Adult" 
            name="adults" 
            value={adults} 
            onChange={handleChange}>
                {
                    Adults.map((p, i)=>(
                        <option style={{color:"black"}} key={i} value={p.number}>{p.number}</option>
                        )) 
                    }
            </select>
            </div>
          </div>
            
            <Grid sx={{textAlign: "center"}}>
            <Button 
            variant="contained"
            sx={{margin: "1rem 0rem 1rem 1rem", width:{md:"15rem",sm:"90%", xs: "60%"} }}
            onClick={handleProceed}>
                Proceed
            </Button>
            </Grid>
            </div>

    </main>
    
  )
}

export default Home_input_field