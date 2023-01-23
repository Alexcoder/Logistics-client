import React from 'react';
import { useSelector} from 'react-redux';
// import { useGlobalState, } from '../../state/context';
import './userBooking.css';

const UserBooking = () => {
    // const {mainSidebar} = useGlobalState()
    const {singleBooking, Loading} = useSelector((state)=> state.booking)


  return (
    <section className='userBooking'>
        <main>
            <div className="userTopic">
                <div>Booking Number</div>
                <div>Name</div>
                <div>Travelling From</div>
                <div>Travelling To</div>
                <div>Date</div>
                <div>Adult(s)</div>
                <div>Price</div>
                <div>Amount</div>
            </div>
            {
                Loading ? "Loading ..." :
                <div className='userContainer'>
                    {singleBooking?.length<1 ? "NO BOOKING FOUND" :
                    singleBooking?.map((user)=>(
                        <div key={user._id} className="userBody">
                           <div className='space-between'>{user.bookingNumber}</div>
                           <div className='space-between'>{`${user.firstName} ${user.lastName}`}</div>
                            <div className='space-between'> {user.departureTerminal}</div>
                            <div className='space-between'>{user.arrivalTerminal}</div>
                            <div className='space-between'>{user.date}</div>
                            <div className='space-between'>{user.adults}</div>
                            <div className='space-between'> &#8358; {Intl.NumberFormat().format(user.price)}.00</div>
                            <div className='space-between'> &#8358; {Intl.NumberFormat().format(user.amount)}.00</div>
                       </div>
                    ))}

                </div>
            }
        </main>
    </section>
  )
}

export default UserBooking