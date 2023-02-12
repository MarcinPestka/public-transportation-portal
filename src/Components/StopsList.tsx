import React from "react"
import { DaneStopow } from "../model/stop";

export default function StopsList(props:{Stops:DaneStopow[]}){


    if (props.Stops[0]!=undefined) {
        const listItems = props.Stops.map((text) =>(
            <li>{text.stopDesc} - {text.stopId} </li>
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