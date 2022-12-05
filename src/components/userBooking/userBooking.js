import React from 'react';
import { useSelector} from 'react-redux';
import { useGlobalState, } from '../../state/context';
import './userBooking.css';

const UserBooking = () => {
    const {mainSidebar} = useGlobalState()
    const {singleBooking, Loading} = useSelector((state)=> state.booking)


  return (
    <section className='allUsers'>
        <main>
            {
                Loading ? "Loading ..." :
                <div className={!mainSidebar ?'mapContainer' : 'mapContainer2'}>
                    {singleBooking?.length<1 ? "NO BOOKING FOUND" :
                    singleBooking?.map((user)=>(
                        <div key={user._id} className="mapBody">
                           <div className='space-between'><span>Booking Number</span>{user.bookingNumber}</div>
                           <div className='space-between'><span>Name</span>{`${user.firstName} ${user.lastName}`}</div>
                            <div className='space-between'><span>Travelling From</span> {user.departureTerminal}</div>
                            <div className='space-between'><span>Travelling To</span> {user.arrivalTerminal}</div>
                            <div className='space-between'><span>Date</span> {user.date}</div>
                            <div className='space-between'><span>Adult(s)</span> {user.adults}</div>
                            <div className='space-between'><span>Price</span> NGN {Intl.NumberFormat().format(user.price)}.00</div>
                            <div className='space-between'><span>Amount</span> NGN {Intl.NumberFormat().format(user.amount)}.00</div>
                       </div>
                    ))}

                </div>
            }
        </main>
    </section>
  )
}

export default UserBooking