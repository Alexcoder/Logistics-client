import React,{useState} from "react";
import { Grid, TextField, Button} from "@mui/material";
import { useGlobalState } from "../../state/context";
import { useDispatch, useSelector } from "react-redux";
import { register, signIn } from "../actions/actions";
import { useNavigate } from "react-router-dom";
import './login.css';


const Login=()=>{ 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {createAccount, AuthInitialState, setCreateAccount, } = useGlobalState();
    const [form, setForm]= useState(AuthInitialState)
    const {error, Loading}= useSelector((state)=> state.auth)
  

    function handleAuth(e){
     e.preventDefault();
     if(createAccount) {dispatch(register({...form}, navigate))}
     else{ dispatch(signIn({...form}, navigate)) }
    //  setMainSidebar(true);
    }

    return(
      <div className="lContainer">

       <Grid container gap={1} ml={0.5} p={4} 
       sx={{border: "1px solid gray",
       borderRadius: "0.5rem",
       boxShadow: "1px 0px 0.5rem 0px gray"
      }}>

        {Loading && "Loading..."}

       <Grid item xs={12} sm={12} md={12}>
        <TextField
         id="email" 
         label="email *"
         type="email *"
         value={form.email} 
         onChange={(e)=>setForm({...form, email:e.target.value})}
         />
         </Grid>
       <Grid item xs={12} sm={12} md={12}>
        <TextField
         id="password" 
         label="password *"
         type="password"
         value={form.password} 
         onChange={(e)=>setForm({...form, password:e.target.value})}
         />
         </Grid>
         {
          createAccount &&
        <>
       <Grid item xs={12} sm={12} md={12}>
        <TextField
         id="confirm password" 
         label="confirm password *"
         type="password"
         value={form.confirmPassword} 
         onChange={(e)=>setForm({...form, confirmPassword:e.target.value})}
         />
         </Grid>
       <Grid item xs={12} sm={12} md={12}>
        <TextField
         sx={{
          // margin: "3rem 0rem 0rem 0.5rem"
         }}
         id="first Name" 
         label="first Name *"
         type="string"
         value={form.firstName} 
         onChange={(e)=>setForm({...form, firstName:e.target.value})}
         />
         </Grid>
       <Grid item xs={12} sm={12} md={12}>
        <TextField
         sx={{
          // margin: "3rem 0rem 0rem 0.5rem"
         }}
         id="last Name" 
         label="last Name *"
         type="string"
         value={form.lastName} 
         onChange={(e)=>setForm({...form, lastName:e.target.value})}
         />
         </Grid>
         </>
         }
       <Grid item xs={12} sm={12} md={12}>
        <Grid
         item xs={12} sm={12} md={12}>
        {
        error && 
         <span
          style={{
          color:"red",
          textAlign:"center",
          margin:"2rem 0rem 0rem 2rem",
          }}>
          {error}
         </span>
          }
        </Grid>
         <Button
         disabled={Loading}
         onClick={handleAuth}
         variant="contained"
         sx={{
          width:"70%",
          marginTop:"1rem",
        }}
         >{createAccount? "CREATE ACCOUNT": "SIGN IN"}
         </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
         <Button
         onClick={()=>setCreateAccount((prev)=> !prev)}
         sx={{width:"60%"}}
         >{!createAccount? "CREATE ACCOUNT": "CLICK TO SIGN IN"}
         </Button>
        </Grid>
 
       </Grid>

      </div>   
    )
}
export default Login;
