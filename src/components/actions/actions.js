import * as api from '../api/api';

export const adminCreateVehicle=(VehicleInfo)=>async(dispatch)=>{
    try{
        dispatch({type:"LOADING_START"});
        const {data}= await api.adminCreateVehicle(VehicleInfo);
        dispatch({type:"CREATE_POST", payload: data});
        dispatch({type:"LOADING_STOP"})
    }catch(err){
        dispatch({type:"ERROR", payload: err.response.message.data});
    }
}

export const adminGetAllVehicleInfo=()=>async(dispatch)=>{
    try{
        dispatch({type:"LOADING_START"});
        const {data}= await api.adminGetAllVehicleInfo();
        dispatch({type:"GET_POSTS", payload: data});
        dispatch({type:"LOADING_STOP"})
    }catch(err){
        dispatch({type:"ERROR", payload: err.message});
    }
}

export const adminGetOneVehicleInfo=(id)=>async(dispatch)=>{
    try{
        dispatch({type:"LOADING_START"});
        const {data}= await api.adminGetOneVehicleInfo(id);
        dispatch({type:"GET_POST", payload: data});
        dispatch({type:"LOADING_STOP"})
    }catch(err){
        dispatch({type:"ERROR", payload: err.response.message.data});
    }
}
export const adminGetVehicleQuery=(departureTerminal, arrivalTerminal)=>async(dispatch)=>{
    try{
        dispatch({type:"LOADING_START"});
        const {data}= await api.adminGetVehicleQuery(departureTerminal, arrivalTerminal);
        dispatch({type:"GET_QUERY", payload: data});
        dispatch({type:"LOADING_STOP"})
    }catch(err){
        dispatch({type:"ERROR", payload: err.response.message.data});
    }
}
export const adminUpDateVehicleInfo=(id, newVehicleInfo)=>async(dispatch)=>{
    try{
        dispatch({type:"LOADING_START"});
        const {data}= await api.adminUpDateVehicleInfo(id, newVehicleInfo);
        dispatch({type:"UPDATE_POST", payload: data});
        dispatch({type:"LOADING_STOP"})
    }catch(err){
        dispatch({type:"ERROR", payload: err.response.message.data});
    }
}
export const adminDeleteVehicleInfo =(id)=>async(dispatch)=>{
    try{
        dispatch({type:"LOADING_START"});
        await api.adminDeleteVehicleInfo (id);
        dispatch({type:"DELETE_POST", payload: id});
        dispatch({type:"LOADING_STOP"})
    }catch(err){
        dispatch({type:"ERROR", payload: err.response.message.data});
    }
}

// BOOK VEHICLE
export const bookVehicle=(VehicleInfo)=>async(dispatch)=>{
    try{
        dispatch({type:"USER_LOADING_START"});
        const {data}= await api.bookVehicle(VehicleInfo);
        dispatch({type:"CREATE_BOOKING", payload: data});
        dispatch({type:"USER_LOADING_STOP"})
    }catch(err){
        dispatch({type:"ERROR", payload: err.response.message.data});
    }
}
export const getAllBookedInfo=()=>async(dispatch)=>{
    try{
        dispatch({type:"USER_LOADING_START"});
        const {data}= await api.getAllBookedInfo();
        dispatch({type:"GETALL_BOOKINGS", payload: data});
        dispatch({type:"USER_LOADING_STOP"})
    }catch(err){
        dispatch({type:"ERROR", payload: err.response.message.data});
    }
}
export const getOneBookedInfo=(id)=>async(dispatch)=>{
    try{
        dispatch({type:"USER_LOADING_START"});
        const {data}= await api.getOneBookedInfo(id);
        dispatch({type:"GETONE_BOOKING", payload: data});
        dispatch({type:"USER_LOADING_STOP"})
    }catch(err){
        dispatch({type:"ERROR", payload: err.message});
    }
}
export const upDateBookedInfo=(id, newUserInfo)=>async(dispatch)=>{
    try{
        dispatch({type:"USER_LOADING_START"});
        const {data}= await api.upDateBookedInfo(id, newUserInfo);
        dispatch({type:"UPDATE_BOOKING", payload: data});
        dispatch({type:"USER_LOADING_STOP"})
    }catch(err){
        dispatch({type:"ERROR", payload: err.response.message.data});
    }
}
export const deleteBookedInfo =(id)=>async(dispatch)=>{
    try{
        dispatch({type:"USER_LOADING_START"});
        await api.deleteBookedInfo(id);
        dispatch({type:"USER_LOADING_STOP"})
    }catch(err){
        dispatch({type:"ERROR", payload: err.response.message.data});
    }
}

// SIGN IN SIGN OUT
export const signIn=(loginDetail, navigate)=>async(dispatch)=>{
    try{
        dispatch({type:"START_LOADING"});
        const res= await api.signIn(loginDetail);
        localStorage.setItem("profile", JSON.stringify( {...res?.data}));
        dispatch({type:"SIGNIN", payload: res.data});
        dispatch({type:"ERROR", payload: res?.data.message });
        dispatch({type:"LOGGED_IN_PROMPT", payload: "You are logged in"});
        dispatch({type:"END_LOADING"});
        navigate('/')
    }catch(err){
        dispatch({type:"ERROR", payload: err.response.message.data});
    }
}
export const register=(VehicleInfo, navigate)=>async(dispatch)=>{
    try{
        dispatch({type:"START_LOADING"});
        const {data} = await api.register(VehicleInfo);
        localStorage.setItem("profile", JSON.stringify( {...data}));
        dispatch({type:"REGISTER", payload: {data}});
        dispatch({type:"ERROR", payload: data.message});
        dispatch({type:"WELCOME", payload: "Welcome to Booking App"});
        dispatch({type:"END_LOADING"});
        navigate('/')
    }catch(err){
        dispatch({type:"ERROR", payload: err.message});
    }
}


