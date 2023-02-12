import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Dimmer, Segment, Loader } from 'semantic-ui-react';
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

function getStops({setStops}:any, {setDimmer}:any) {
  axios({
    method: 'get',
    url: 'http://localhost:5045/departures/GetAllStops',
  })
    .then(function (response) {
      setStops(mapStops(response.data));
      setDimmer(false);
    });
}


function App() {
const [departures, setDepartures] = useState<busInfo[]>([]);
const [stop, setStop] = useState<DaneStopow>({stopDesc:"",stopId:""});
const [stops, setStops] = useState<DaneStopow[]>([]);
const [dim, setDimmer] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      getDepartures({setDepartures},stop.stopId.toString());
    }, 10000);
  }, [departures]);

  useEffect(() => {
      getStops({setStops},{setDimmer});
  }, []);

  return (
    <>
    <Dimmer active={dim} page>
      <Loader>Loading</Loader>
    </Dimmer>
    <div id="separatorL">
    <div id="center">
      <AutoComplete Stops={stops} setStopId={setStop}></AutoComplete>
    </div>
    <div id="center">
      <h3>{stop.stopDesc}</h3>
    </div>
    <div id="center">
      <List Departures={departures}></List>
    </div>
    </div>
      </>
  );
}

export default App;
