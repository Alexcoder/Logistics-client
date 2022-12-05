import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGlobalState } from "../../state/context";
import { adminCreateVehicle, adminDeleteVehicleInfo,adminUpDateVehicleInfo } from "../actions/actions";

const CreateVehicleInfo=()=>{ 
    const {error, }= useSelector((state)=> state.auth)
    const {allPosts}= useSelector((state)=> state.posts)
    const {Loading, currentId, setCurrentId} = useGlobalState();
    const dispatch = useDispatch();
    const [vehicleDetail, setVehicleDetail]= useState({ departureTerminal: "",
    arrivalTerminal: "",
    seat: [],
    price: "",
  })
  const { departureTerminal,arrivalTerminal, price}= vehicleDetail;
  
  
  const toUpdate = allPosts.find((p)=> currentId? p._id===currentId : null) 

  useEffect(() => {
  if(toUpdate) setVehicleDetail(toUpdate)
  }, [toUpdate])
  
    const bookUtils = [
      {terminal: "Aba => Abia"},
      {terminal: "Enugu => Enugu"},
      {terminal: "PH => PortHarcourt"},
      {terminal: "Imo => Owerri"},
      {terminal: "Benin => Edo"},
  ]

    
    const handleBook =async(e)=>{
      e.preventDefault();
      if(currentId){
        dispatch(adminUpDateVehicleInfo(currentId, {
          departureTerminal,
          arrivalTerminal,
          price,
        }))
      }
      else{
          const createdSeat = vehicleDetail.seat.split(",").map((p)=>({number:p}))
          dispatch(adminCreateVehicle({
            departureTerminal,
            arrivalTerminal,
            price,
            seatNumber: createdSeat
          }))
        }
    }

    const handleChange =(e)=>{
      
        setVehicleDetail({...vehicleDetail, [e.target.name]: e.target.value})
    }


    return(
      <div >
        <div style={{marginTop:"3rem"}}>
          <div style={{display:"grid", gap:"0.3rem", width:"15rem", margin:"1rem 0rem 0rem 2rem",
           border:"1px solid gray", padding:"0.5rem",
           background: "linear-gradient(to bottom right, blue, brown)",
           boxShadow:"0rem 0rem 10rem 2rem lightgreen",
          maxHeight:"12rem",
          overflow:"auto"
            }}>
            <select name="departureTerminal" value={vehicleDetail.departureTerminal} onChange={handleChange} placeholder={"departureTerminal"}>
              {
                bookUtils.map((p, i)=>(
                  <option value={p.terminal} key={i}>{p.terminal}</option>
                )
                )
              }
              </select>
            <select name={"arrivalTerminal"} value={vehicleDetail.arrivalTerminal} onChange={handleChange} placeholder={"arrivalTerminal"}>
            { 
                bookUtils.map((t,i)=>(
                  <option value={t.terminal} key={i}>{t.terminal}</option>
                )) 
              }
              </select>
            <input name="price" value={vehicleDetail.price} onChange={handleChange} placeholder={"price"}/>
            {
            !currentId &&
            <textarea name="seat" value={vehicleDetail.seat} onChange={handleChange} placeholder={"seat"}/>
            }
            <button onClick={handleBook}
             style={{height:"3rem", marginTop:"0.5rem", borderRadius: "0.3rem",
              border: "1px solid gray"}}>CreateVehiceInfo</button>
          </div>
          {
            error && error
          }
        </div>
        
        {Loading? "Fetching Vehicle Details..," :
        <div style={{display: "grid", gap:"1rem", gridTemplateColumns:"repeat(4, 1fr)", border:"1px solid gray"}}>
        {allPosts?.map((p, i)=>(
          <div key={i} style={{border: "1px solid gray"}}>
            <div>departure Terminal : {p.departureTerminal}</div>
            <div>arrival Terminal : {p.arrivalTerminal}</div>
            <div>{p.price}</div>
            <div style={{display:"flex"}}>
              seat Number :
            {p.seatNumber.map((t,i)=>
            <div key={i}>
             <div>{t.number},</div>
             </div>
            )}
            </div>
            <button 
            onClick={()=> dispatch(adminDeleteVehicleInfo(p._id))}
            className="delete" style={{border: "1px solid gray"}}>delete</button>
            <button 
            onClick={()=> {setCurrentId(p._id)}}
            className="delete" style={{border: "1px solid gray"}}>Update</button>
          </div>
        ))}
        </div>
      }
        </div>
    )
}
export default CreateVehicleInfo;