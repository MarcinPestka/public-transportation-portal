import React from "react"
import busInfo from "../model/buses"


export default function List(props:{Departures:busInfo[]}){


    if (props.Departures[0]!=undefined) {
        const listItems = props.Departures.map((text) =>(
            <li>{text.busNumber} - {text.headSign} - {text.displayedTime}</li>
          )
    
          );
        return(
            <ul>
                {listItems}
            </ul>
        )
    }
    else{
        return(
            <></>
        )
    }
}