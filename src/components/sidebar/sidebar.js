import { useNavigate } from 'react-router-dom';
import {AiOutlineClose} from 'react-icons/ai'
import { useGlobalState } from '../../state/context';
import './sidebar.css';

const Sidebar = () =>{
    const navigate = useNavigate();
    const {setMainSidebar, user}= useGlobalState();

    const toggleSideBar =()=>{
        setMainSidebar(false);
    }

    return(
        <div id="sidebarContainer">
            <div >
                <div>
                 <button style={{color:"white", float:"right"}} onClick={toggleSideBar}><AiOutlineClose/></button>
                </div>
               
                {
                  user?.isAdmin && 
                <>
                <button style={{color:"white"}} onClick={()=> {navigate(`/admin`); setMainSidebar(false)}}> ADMIN </button>
                <hr/>
                <button style={{color:"white"}} onClick={()=> {navigate(`/allBookings`); setMainSidebar(false)}}>ADMIN VIEW BOOKING</button>
                <hr/>
                <button style={{color:"white"}} onClick={()=> {navigate(`/userBooking`); setMainSidebar(false)}}>MY BOOKING</button>
                <hr/>

                </> 
                }
                <button style={{color:"white"}} onClick={()=> {navigate(`/home`); setMainSidebar(false)}}>SELECT BUS</button>
                <hr/>
                <button style={{color:"white"}} onClick={()=> {navigate(`/userBooking`); setMainSidebar(false)}}>MY BOOKING</button>
                {/* <button style={{color:"white"}} onClick={()=> {navigate(`/selectBus`); setMainSidebar(false)}}>EDIT PROFILE</button> */}
                <hr/>
            </div>
        </div>
    )
};
export default Sidebar;