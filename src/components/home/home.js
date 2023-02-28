import React from "react";
import HOME_MODERN_WAY_TO from "./home_modern_way_to";
import HOME_INPUT_FIELD from "./home_input_field";
// import './home.css'
import './home2.css'


const Home=()=>{
    
    return(
        <main className="homeContainer" >
         <div className="homePic">
            <HOME_MODERN_WAY_TO/>
            <HOME_INPUT_FIELD/>
        </div>
        </main>
    )
}
export default Home;
