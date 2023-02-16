import React from 'react';
import { useNavigate } from 'react-router-dom';
// import {BiMenu} from 'react-icons/bi'
import MenuIcon from '@mui/icons-material/Menu';
import {AiOutlineHome} from 'react-icons/ai'
import {AiOutlineCaretDown} from 'react-icons/ai'
import './navbar.css';
import { useGlobalState } from '../../state/context';

const Navbar =()=>{ 
   const {user, setMainSidebar, setNavDropDown}= useGlobalState();
   const navigate = useNavigate();

    function logOut(e){
        e.preventDefault();
        localStorage.clear("profile");
        setMainSidebar(false);
        navigate(`/`)
    }

    return(
        <div id="navBarContainer">
                <div className="navMenuCont">
                    {user?.id ? 
                     <div 
                       onClick={()=> setMainSidebar((prev)=>!prev)}
                       style={{flex:"", }}> 
                       <MenuIcon sx={{color:"black",fontSize:"2rem"}}/>
                       </div> : null
                    }
                    <div style={{fontSize:"2rem", color:"black",}}>
                    <AiOutlineHome />
                    </div>
                    <button style={{ color:"black", fontWeight:"500"}}> ANYI BOOKING SERVICES</button>
                </div>

                 <div style={{ display:"flex"}}>
                  <div style={{display:"flex", gap:"2rem"}}>
                    <div>
                      <button 
                      onMouseEnter={()=> setNavDropDown("1")} 
                      onMouseLeave={()=> setNavDropDown("")} 
                      className="dropButton"
                      >Move Freely 
                      <span style={{marginTop:"0.4rem"}}>
                        <AiOutlineCaretDown/>
                      </span>
                     </button>
                      <div  className="dropBox">

                          {/* <> */}
                        <button>Pick up Service</button>
                        <button>Hire a Bus</button>
                          {/* </> */}
                      </div>
                    </div>
                    <div >
                      <button 
                        className="dropButton"
                       >Do Freely 
                      <span 
                      style={{marginTop:"0.4rem"}}>
                        <AiOutlineCaretDown/>
                        </span>
                        </button>
                      <div className="dropBox">
                        <button>Bills Payment</button>
                        <button>EnterPrise Partner</button>
                      </div>
                    </div>
                    <div style={{fontWeight:"420"}}> Suggest Route </div>

                 {user?.id ?
                  <button 
                  className="navBotton" 
                  onClick={logOut}>
                     LOGOUT
                  </button> : null}     
                  </div>
                </div>
        </div>
    )
}

export default Navbar;