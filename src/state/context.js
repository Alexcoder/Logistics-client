import { useContext, createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AuthInitialState={
    email: "",
    firstName: "",
    lastName: "",
    password:"",
    confirmPassword:"",
    bio: "",
    isAdmin: false
}
const FormatDate = (date)=>{
    const d = new Date(date);
    const day = `${d.getDate()}`
    const month = `${d.getMonth() + 1}`
    const year = d.getFullYear()

    return (
      [year, month, day].join("-")
    )
  }


export const StateContext = createContext();

export const CreateContext=({children})=>{
    const BookInitialState={
        departureTerminal: " ",
        arrivalTerminal: "",
        seat: [],
        date: FormatDate(new Date()),
        adults: "1",
        price: "",
    }
    
    const location = useLocation();
    const [createAccount, setCreateAccount]= useState(false)
    const [selectedSeatId, setSelectedSeatId]= useState([])
    const [mainSidebar, setMainSidebar]= useState(false)
    const [navDropDown, setNavDropDown]= useState("")
    const [currentId, setCurrentId] = useState();
    const [booking, setBooking]= useState("bookASit")
    const [trip, setTrip]= useState("oneWay")
    const user = JSON.parse(localStorage.getItem("profile"))
    const creator = user?.id;
    const [bookDetail, setBookDetail]= useState(BookInitialState)
    const API = axios.create({baseURL :`http://127.0.0.1:5000/api`})
    const [vehicleDetail, setVehicleDetail]= useState({ departureTerminal: "",
    arrivalTerminal: "",
    seat: [],
    price: "",
})
 
    useEffect(()=>{
        JSON.parse(localStorage.getItem("profile"))
    },[location])
    

    return(
        <StateContext.Provider
        value={{
          user, creator, vehicleDetail, setVehicleDetail,
          bookDetail, setBookDetail, API, mainSidebar, setMainSidebar,
          createAccount, setCreateAccount, selectedSeatId, setSelectedSeatId,
          AuthInitialState, booking, setBooking,trip, setTrip,currentId, setCurrentId,
          navDropDown, setNavDropDown, FormatDate: FormatDate(new Date())
        }}>
            {children}
        </StateContext.Provider>
    )

}


export const useGlobalState=()=> useContext(StateContext)