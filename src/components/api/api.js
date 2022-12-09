import axios from "axios";

// const API = axios.create({baseURL: `http://localhost:5000/api`})
const API = axios.create({baseURL: `https://logistics-api.onrender.com`})

API.interceptors.request.use((req)=>{
    const user = JSON.parse(localStorage.getItem("profile"))
    if(user){
        req.headers.Authorization = `Bearer ${user.token}`
    };
    return req
})

// AdminRoute
export const adminCreateVehicle = (VehicleInfo)=> API.post(`/vehicleInfo`, VehicleInfo)
export const adminGetAllVehicleInfo = ()=> API.get(`/vehicleInfo`)
export const adminGetOneVehicleInfo = (id)=> API.get(`/vehicleInfo/${id}`)
export const adminGetVehicleQuery = (departure, arrival)=> API.get(`/vehicleInfo?departureTerminal=${departure}&arrivalTerminal=${arrival}`)
export const adminUpDateVehicleInfo = (id, newVehicleInfo)=> API.put(`/vehicleInfo/${id}`, newVehicleInfo)
export const adminDeleteVehicleInfo = (id)=> API.delete(`/vehicleInfo/${id}`)

export const updateBookedDate = (id, date)=> API.put(`/addDate/${id}`, date)

// userRoute
export const bookVehicle = (BookingInfo)=> API.post(`/bookSeat`, BookingInfo)
export const getAllBookedInfo = ()=> API.get(`/bookSeat`)
export const getOneBookedInfo = (id)=> API.get(`/bookSeat/${id}`)
export const upDateBookedInfo = (id, newBookingInfo)=> API.put(`/bookSeat/${id}`, newBookingInfo)
export const deleteBookedInfo = (id)=> API.delete(`/bookSeat/${id}`)

// SignIn-SignUp
export const signIn = (UserInfo)=> API.post(`/auth/signIn`, UserInfo)
export const register = (UserInfo)=> API.post(`/auth/signUp`, UserInfo)

// User
export const getAllUserInfo = ()=> API.get(`/userInfo`)
export const getOneUserInfo = (id)=> API.get(`/userInfo/${id}`)
export const upDateUserInfo = (id, newUserInfo)=> API.put(`/userInfo/${id}`, newUserInfo)
export const deleteUserInfo = (id)=> API.delete(`/userInfo/${id}`)
