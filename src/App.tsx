import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import busInfo from './model/buses';
import List from './Components/List';
import { DaneStopow } from './model/stop';
import StopsList from './Components/StopsList';
import AutoComplete from './Components/AutoComplete';

function mapDepartures(responseData:busInfo[]) {
  const busDelays = (responseData.map(busDelays => ({
    busNumber: busDelays.busNumber,
    headSign: busDelays.headSign,
    delaySeconds: busDelays.delaySeconds,
    displayedTime: busDelays.displayedTime,
  })))
  return busDelays;
}

function mapStops(responseData:DaneStopow[]) {
  const DaneStopow = (responseData.map(DaneStopow => ({
    stopDesc: DaneStopow.stopDesc,
    stopId: DaneStopow.stopId,
  })))
  return DaneStopow;
}

function getDepartures({setDepartures}:any,stopId:string) {
  axios({
    method: 'get',
    url: 'http://localhost:5045/departures/GetDepartures?id='+stopId,
  })
    .then(function (response) {
     setDepartures(mapDepartures(response.data));
    });
}

function getStops({setStops}:any) {
  axios({
    method: 'get',
    url: 'http://localhost:5045/departures/GetAllStops',
  })
    .then(function (response) {
      setStops(mapStops(response.data));
    });
}


function App() {
const [departures, setDepartures] = useState<busInfo[]>([]);
const [stop, setStop] = useState<DaneStopow>({stopDesc:"",stopId:""});
const [stops, setStops] = useState<DaneStopow[]>([]);

  useEffect(() => {
    setTimeout(() => {
      getDepartures({setDepartures},stop.stopId.toString());
    }, 10000);
  }, [departures]);

  useEffect(() => {
      getStops({setStops});
  }, []);

  return (
    <div >
      <AutoComplete Stops={stops} setStopId={setStop}></AutoComplete>
      <p>{stop.stopDesc}</p>
      <List Departures={departures}></List>
    </div>
  );
}

export default App;
