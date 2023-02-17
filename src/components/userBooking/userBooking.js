import React, {useState} from 'react';
import { useSelector} from 'react-redux';
import './userBooking.css';

const UserBooking = () => {
    const {singleBooking, Loading} = useSelector((state)=> state.booking)
    const pageNumbers=[]
    const postsPerPage = 15;
    const [background, setBackground] = useState(0)
    const [currentPage, setcurrentPage] = useState(1)
    const totalPages = Math.ceil(singleBooking.length/postsPerPage)

    for(let i=1; i<= totalPages ; i++){
        pageNumbers.push(i)
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const slicedBooking = singleBooking.slice(indexOfFirstPost, indexOfLastPost)

    const handlePage=(number, index)=>{
        setcurrentPage(number)
        setBackground(index)
    }

    const handleBackGround=(index)=>{
        if(background===index) return "blue"
        else return "white"
    }

    const handleSerial= (item)=>{
        const index = singleBooking.findIndex((p)=>
          p._id===item._id
        )
        return index+1
    }

  return (
    <section className='userBooking'>
            <div className="booking-my-booking">MY BOOKINGS</div>
        <main>
            <div className="userTopic">
                <div className="booking-serial">#</div>
                <div className="booking-number">Booking Number</div>
                <div className="booking-name">Name</div>
                <div className="booking-travelling-from">Travelling From</div>
                <div className="booking-travelling-to">Travelling To</div>
                <div className="booking-date">Date</div>
                <div className="booking-adults">Adult(s)</div>
                <div className="booking-price">Price</div>
                <div className="booking-amount">Amount</div>
            </div>
            {
            Loading ? "Loading ..." :
            <div className='userContainer' style={{background:"orange"}}>
                {singleBooking?.length<1 ? "NO BOOKING FOUND" :
                 slicedBooking?.map((user)=>(
                    <div key={user._id} className="userBody">
                        <div className="booking-serial1">{handleSerial(user)}</div>
                        <div className="booking-number1">{user.bookingNumber}</div>
                        <div className='booking-name1'>{`${user.firstName} ${user.lastName}`}</div>
                        <div className='booking-travelling-from1'> {user.departureTerminal}</div>
                        <div className='booking-travelling-to1'>{user.arrivalTerminal}</div>
                        <div className='booking-date1'>{user.date}</div>
                        <div className='booking-adults1'>{user.adults}</div>
                        <div className='booking-price1'> &#8358; {Intl.NumberFormat().format(user.price)}.00</div>
                        <div className='booking-amount1'> &#8358; {Intl.NumberFormat().format(user.amount)}.00</div>
                    </div>
                ))}
            </div>
            }

        </main>
            <div style={{display:"flex", alignItems:"center", width:"fit-content", }}>
            {pageNumbers.map((number, index)=>
                <div key={index} >
                  <div onClick={()=> {handlePage(number, index)}} style={{ border:"1px solid gray", padding:"0.5rem", color:"black", background: handleBackGround(index)}}>{number}</div>
                </div>
                    )}
            <div style={{marginLeft:"2rem"}}>{`page ${currentPage} of ${totalPages}`}</div>
            </div> 
    </section>
  )
}

export default UserBooking