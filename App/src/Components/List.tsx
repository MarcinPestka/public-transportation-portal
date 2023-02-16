import React from "react"
import busInfo from "../model/buses"
import { List } from 'semantic-ui-react'

export default function ListOfDeparture(props:{Departures:busInfo[]}){
    if (props.Departures[0]!=undefined) {
        const listItems = props.Departures.map((text) =>(
            <List.Item>{text.busNumber} - {text.headSign} - {text.displayedTime}</List.Item>
          )
    
          );
        return(
            <List>
                {listItems}
            </List>
        )
    }
    else{
        return(
            <></>
        )
    }
}