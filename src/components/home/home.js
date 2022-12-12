import React from "react";
import {useNavigate} from "react-router-dom";
// import uuid4 from "uuid4";
import { useGlobalState } from "../../state/context";
import {useSelector } from "react-redux";
import {Grid, Button } from "@mui/material";
// import GIG from '../../images/GIG.png'
import './home.css'


const Home=()=>{
    const {welcome,}= useSelector((state)=> state.auth)
    const { bookDetail, setBookDetail, user,booking, setBooking,trip, setTrip, FormatDate}= useGlobalState();
    const { departureTerminal,arrivalTerminal, adults, date}= bookDetail;
    
    const navigate = useNavigate()
    const creator = user?.id
    const bookingNumber = `ALX-${Math.ceil(Math.random()*10000000000)}` 

    const bookUtils = [
        {terminal: "Aba => Abia"},
        {terminal: "Enugu => Enugu"},
        {terminal: "PH => PortHarcourt"},
        {terminal: "Imo => Owerri"},
        {terminal: "Benin => Edo"},
    ]

    const Adults =[
        {number: 1},
        {number: 2},
        {number: 3},
        {number: 4},
        {number: 5},
        {number: 6},
        {number: 7},
        {number: 8},
        {number: 9},
        {number: 10},
        {number: 11},
        {number: 12},
    ]

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
    
console.log({"current date": date, });
    return(
        <div className="homeContainer" >
            {welcome && <h1 style={{colour: "blue", margin:"1rem 0rem 1 rem 2rem"}}>{welcome}</h1>}
         <div style={{display: "flex", gap:"4rem"}}>
            <div 
            style={{
                margin:"12rem 0rem 0rem 1rem", 
                width:"100%", 
                color:"white",
                }}>
               <p style={{fontSize:"40px", fontWeight:"900"}}>
               The modern way to  <br/>
               commute across cities
               </p>
               <br/>
               GIGM is an African technology powered company, <br/>
               providing seamless mobility services to <br/>
               commuters across Africa
            </div>
            {/* INPUT FIELD DIV BELOW */}
            <div style={{
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
            <select type="string" style={{background:"inherit", borderRadius:"0.5rem",height:"3rem", border:"1px solid gray",color:"white",width: "30rem", margin: "1rem 0rem 0.2rem 1rem"}}
            label="Departure Terminal" name="departureTerminal" value={departureTerminal} onChange={handleChange}>
                <option >Departure Terminal</option>
                {bookUtils.map((travel,i)=>(
                   <option style={{background:"white",color:"black"}} value={travel.terminal} key={i}>{travel.terminal}</option>
                ))}
                {/* <hr/> */}
            </select>
            <span style={{margin:"3rem 0rem 0rem 1rem",}}> Travelling To</span>
            <select type="string" style={{background:"inherit", borderRadius:"0.5rem",height:"3rem",color:"white", border:"1px solid gray",width: "30rem", margin: "0.5rem 0rem 0.2rem 1rem"}}
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
            <input type="date" className="date" min={FormatDate}
             name="date" value={date} onChange={handleChange}/>
            </div>
            <div style={{display: "flex", flexDirection:"column"}}>
             <span style={{margin:"0rem 0rem 0rem 1rem"}}>Adults</span>
            <select type="number" className="adults"
            label="Adult" name="adults" value={adults} onChange={handleChange}>
                {
                    Adults.map((p, i)=>(
                        <option  key={i} value={p.number}>{p.number}</option>
                        )) 
                    }
            </select>
            </div>
          </div>
            
            <Grid>
            <Button variant="contained"
            sx={{margin: "1rem 0rem 1rem 1rem", width: "30rem"}}
            onClick={handleProceed}>
                Proceed
            </Button>
            </Grid>
            </div>
        </div>
            

        </div>
    )
}
export default Home;
