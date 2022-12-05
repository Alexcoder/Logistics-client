
const booking = (booking={Loading:false, error:false, allBookings:[], query:[], singleBooking:[]}, action)=>{
    switch (action.type) {
    case "USER_LOADING_START":
    return {
    ...booking,
    Loading: true
    }
    case "USER_LOADING_STOP":
    return {
    ...booking,
    Loading: false
    }
    case "CREATE_BOOKING":
    return {
    ...booking,
    allBookings: [...booking.allBookings, action.payload]
    }
    case "GETALL_BOOKINGS":
    return{
     ...booking,
     allBookings: action.payload
    } 
    case "GETONE_BOOKING":
    return{
     ...booking,
     singleBooking: action.payload
    } 
    case "GET_QUERY":
    return{
     ...booking,
     query: action.payload
    } 
   
    case "UPDATE_POST":
    return {
    ...booking,
    allBookings: booking.allBookings.map((p)=> p._id === action.payload._id? action.payload : p)
    }
    case "DELETE_POST":
    return {
    ...booking,
    allBookings: booking.allBookings.filter((p)=> p._id !== action.payload)
    }
    case "ERROR":
    return {
    ...booking,
    error: action.payload
    }
 
    default:
    return booking
 }
 }
 
 export default booking;