import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import {AiOutlineHome} from 'react-icons/ai'
import { useGlobalState } from '../../../state/context';
import './navSmall.css';

const Navbar =()=>{ 
   const {user, setMainSidebar, }= useGlobalState();
   const navigate = useNavigate();

    function logOut(e){
        localStorage.clear("profile");
        setMainSidebar(false);
        navigate(`/`)
    }

    return(
        <div className="navSmall">
                  <div style={{ color:"black", fontWeight:"500",fontSize:"1.3rem", textAlign:"center", background:"", width:"100vw", padding:"0.5rem 0rem" }}> ANYI BOOKING SERVICES</div>
                   <hr style={{border: "1px solid lightgray"}}/>
  
                <div className="navSmallCont">
                    <div onClick={()=> navigate(`/`)} style={{fontSize:"1.5rem", color:"black", display:"flex", alignItems:"center"}}>
                    <AiOutlineHome style={{color:"blue"}} /> <span style={{fontSize:"1rem", color:"black",}}>Home</span>
                    </div>
                    {/* <div style={{ color:"black", fontWeight:"500", }}> ANYI BOOKING SERVICES</div> */}
                    {user?.id &&
                        <div
                        style={{fontSize:"1.5rem", color:"black", display:"flex", alignItems:"center"}}
                          onClick={()=> setMainSidebar((prev)=>!prev)}> 
                         <MenuIcon sx={{color:"red",fontSize:"2rem"}}/>
                         <span style={{fontSize:"1rem", color:"black",}}>Menu</span>
                       </div> 
                    }
                    <div>
                        <button onClick={logOut}>logout</button>
                    </div>
                </div>

        </div>
    )
}

export default Navbar;