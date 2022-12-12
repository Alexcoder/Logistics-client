import React from 'react';
import { useNavigate } from 'react-router-dom';
import {BiMenu} from 'react-icons/bi'
import {AiOutlineHome} from 'react-icons/ai'
import './navSmall.css';
import { useGlobalState } from '../../state/context';

const NavSmall =()=>{ 
   const {user, setMainSidebar}= useGlobalState();
   const navigate = useNavigate();

    function logOut(e){
        e.preventDefault();
        localStorage.clear("profile");
        setMainSidebar(false);
        navigate(`/`)
    }

    return(
        <div id="navBarContainer">
            <div>
                <div>
                    {user?.id ? 
                    <button 
                    onClick={()=> setMainSidebar((prev)=>!prev)}
                    style={{margin:"0.8rem 1rem 0rem -1rem",}}> 
                       <BiMenu style={{color:"black"}}/>
                       </button> : null
                    }
                    <button style={{margin:"0rem 1rem 0rem 0rem", color:"black",}}>
                    <AiOutlineHome /></button>
                    <button style={{margin:"0rem 1rem 0rem 0rem", color:"black", fontWeight:"500"}}> Anyi Booking</button>
                 </div>

                 {user?.id ?
                  <button 
                  className="navBotton" 
                  onClick={logOut}>
                     LOGOUT
                  </button> : null}     
             </div>
        </div>
    )
}

export default NavSmall;