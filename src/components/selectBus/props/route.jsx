export const RouteProp=({desc,departureTerminal, red, blue})=>{

    return(
    <div style={{display:"flex",justifyContent:"space-between"}}>
        <span
          style={{color: red ? "red" : blue? "blue" : ""}}>
            {desc}
        </span>
              {departureTerminal}  
   </div>

    )
}