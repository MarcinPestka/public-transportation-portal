import React from "react"
import busInfo from "../model/buses"
import { DaneStopow } from "../model/stop";
import { Autocomplete, TextField } from "@mui/material";

export default function AutoComplete(props:{setStopId:any,Stops:DaneStopow[]}){
    if (props.Stops[0]!=undefined) {
        return(
            <Autocomplete
            isOptionEqualToValue={(option, value) => option.stopId === value.stopId}
            disablePortal
            id="combo-box-demo"
            getOptionLabel={(option) => option.stopDesc}
            options={props.Stops}
            sx={{ width: 300 }}
            onChange={(event, value) => 
                props.setStopId(value)}
            renderInput={(params) => <TextField {...params} label="Przystanki" />}
          />
        )
    }
    else{
        return(
            <></>
        )
    }
}