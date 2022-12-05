import React from 'react';
import { useNavigate } from 'react-router-dom';
import {BiMenu} from 'react-icons/bi'
import {AiOutlineHome} from 'react-icons/ai'
// import {AiOutlineSearch} from 'react-icons/ai'
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
            <div>
                <div>
                    {user?.id ? 
                    <button 
                    onClick={()=> setMainSidebar((prev)=>!prev)}
                    style={{margin:"0.3rem 0rem 0rem 0rem"}}> 
                       <BiMenu style={{color:"black"}}/>
                       </button> : null
                    }
                    <button style={{margin:"0rem 8rem 0rem 1rem", color:"black",}}>
                    <AiOutlineHome /></button>
                    <button style={{margin:"0rem 7rem 0rem 3rem", color:"black", fontWeight:"500"}}> Anyi Booking</button>
                 </div>

                 <div style={{margin:"0rem 0rem 0rem 0rem", display:"flex"}}>
                  <div style={{display:"flex", gap:"2rem"}}>
                    <div>
                      <button 
                      onMouseEnter={()=> setNavDropDown("1")} 
                      onMouseLeave={()=> setNavDropDown("")} 
                      className="dropButton"
                      >Move Freely 
                      <span style={{marginTop:"0.2rem"}}>
                        <AiOutlineCaretDown/>
                      </span>
                     </button>
                      <div  className="dropBox">

                          <>
                        <button>Pick up Service</button>
                        <button>Hire a Bus</button>
                          </>
                      </div>
                    </div>
                    <div >
                      <button 
                      className="dropButton"
                      >Do Freely 
                      <span 
                      style={{marginTop:"0.2rem"}}>
                        <AiOutlineCaretDown/>
                        </span>
                        </button>
                      <div className="dropBox">
                        <button>Bills Payment</button>
                        <button>EnterPrise Partner</button>
                      </div>
                    </div>
                    <div style={{fontWeight:"420"}}> Suggest Route </div>

                    {/* <input 
                       style={{
                       width:"8rem",
                       border: "1px solid black",
                       margin: "0rem 3rem 0rem 0rem",
                       borderRadius: "0.2rem",
                      }} 
                      placeholder="search"/> */}
                 {user?.id ?
                  <button 
                  className="navBotton" 
                  onClick={logOut}>
                     LOGOUT
                  </button> : null}     
                  </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;