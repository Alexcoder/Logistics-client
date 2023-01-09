import React from 'react';
import {useNavigate} from "react-router-dom";
import { useGlobalState } from "../../state/context";
import {Grid, Button } from "@mui/material";
import { bookUtils, Adults } from './utils_home';

import './home.css'


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
        <div 
        style={{
          border: "1px solid gray",
          width:"80%",
          background:"rgba(0, 0, 0, 0.600)",
          margin:"6rem 0rem 2rem 2rem",
          borderRadius:"1rem",
          color:"white",
                }}>
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
             
             <span style={{margin:"3rem 0rem 0rem 1rem",}}> Travelling From</span>
            <select 
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
            <span style={{margin:"3rem 0rem 0rem 1.36rem",}}> Travelling To</span>
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
            <div style={{display: "flex", gap:"1.1rem", color:"white"}}>
            <div style={{display: "flex", flexDirection:"column"}}>
             <span style={{margin:"0rem 0rem 0rem 1rem"}}>Date</span>
            <input 
             className="date_home" 
             type="date" 
             min={FormatDate}
             name="date" 
             value={date} 
             onChange={handleChange}/>
            </div>
            <div style={{display: "flex", flexDirection:"column"}}>
             <span style={{margin:"0rem 0rem 0rem 1rem"}}>Adults</span>
            <select 
            className="adults_select"
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