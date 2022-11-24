import React, { useEffect, useState, useRef } from 'react';
import Map, { GeolocateControl, NavigationControl, Marker, Popup, Source, Layer } from 'react-map-gl';
import {SearchBox} from '@mapbox/search-js-react';
import { EvStation, Star, Directions } from "@material-ui/icons";
import { Card } from '@material-ui/core';
import {TextField, Button} from '@material-ui/core';

import "./Maparea.css"
import axios from "axios";
import Navbar from './Navbar';

function Maparea() {
  
  const [search,setSearch]=useState(false);
  const [mySource, setMySource]=useState("");
  const [myDest, setMyDest]=useState("");
  const [arrayLength, setArrayLength]=useState("");
  const [nearbyList, setNearbyList]=useState([]);
 console.log(search);
  

  
  const [pins, setPins] = useState([]);
  const [pathCords, setPathCords] = useState({
    long1: undefined, lat1: undefined, long2: undefined, lat2: undefined
  })
  const [points, setPoints] = useState({
    type: "Feature",
    properties: {},
    geometry: {}
  });
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const [viewport, setViewport] = React.useState({});


  /////Haversine Function
  function getDistanceFromLatLng(lat1, lng1, lat2, lng2, miles) { // miles optional
    if (typeof miles === "undefined"){miles=false;}
    function deg2rad(deg){return deg * (Math.PI/180);}
    function square(x){return Math.pow(x, 2);}
    var r=6371; // radius of the earth in km
    lat1=deg2rad(lat1);
    lat2=deg2rad(lat2);
    var lat_dif=lat2-lat1;
    var lng_dif=deg2rad(lng2-lng1);
    var a=square(Math.sin(lat_dif/2))+Math.cos(lat1)*Math.cos(lat2)*square(Math.sin(lng_dif/2));
    var d=2*r*Math.asin(Math.sqrt(a));
    if (miles){return d * 0.621371;} //return miles
    else{return d;} //return km
  }


  console.log("Distace BW TVM TCR",getDistanceFromLatLng(8.4882267,76.947551,10.5256264,76.2132542));
const nearbyEV = () => {
  console.log(pins,"PINS FROMSERVER:::::::::::::::");
  if(arrayLength>0){
    for(var i=0;i<arrayLength;i++){

      pins.forEach((pin) => { 
        // console.log("crsh points",points.geometry.coordinates[i][0])
        const distance = getDistanceFromLatLng(pin.lat,pin.long,points.geometry.coordinates[i][1],points.geometry.coordinates[i][0])
        if (distance<=3){
          // console.log(nearbyList.includes(pin.title),"inclu::::::::")
          if(!(nearbyList.includes(pin))){
          console.log("Charging Station:",pin.title,"City:",pin.city,"Distance:",distance);
          nearbyList.push(pin);
          console.log(nearbyList);
          }
        }
        //  console.log("Distance Function",i);
      })
    }
    
  }
  setNearbyList(nearbyList);
  console.log("out",nearbyList);
}




 




  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  useEffect(() => {

   
    getPoints();
    nearbyEV();
  }, [pathCords])

  const getPoints = async () => {
    const allpath = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pathCords.long1},${pathCords.lat1};${pathCords.long2},${pathCords.lat2}?geometries=geojson&access_token=pk.eyJ1IjoibW1pZGh1biIsImEiOiJjbGFxYTIxODcxNDB0M3ZucGlmcWp3cHpuIn0.4ekFwyhXAkUt-zYu9ePDpQ`
    )
    console.log("Points", points)
    setPoints({ ...points, geometry: allpath.data.routes[0].geometry })
    setArrayLength(allpath.data.routes[0].geometry.coordinates.length);
    console.log("All Path", allpath)
    console.log("Array Length",arrayLength);
  }
  

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [-122.41510269913951, 37.77909036739809],
        [39.5423, -77.0564]
      ]
    }
  };
  function handlego(e){
    setSearch(true);
    e.preventDefault()
   
    console.log(mySource,"mysource");
  
    console.log(myDest,"mydest");
    function apicallfrom(search){

      const params = {
        key: 'pk.464c86ee7b05ccf8063d89f1238704b9',
        q: `${mySource}`,
        format: 'json',
        limit: '1'
      }

      
      
      axios.get('https://eu1.locationiq.com/v1/search',{params})
        .then(response => {
          
          console.log("Response from lat",response.data[0].lat);
          
         
          console.log("Response from lon",response.data[0].lon);

          setPathCords({
            ...pathCords,lat1:response.data[0].lat,long1:response.data[0].lon
          })
          console.log("Path CORDS",pathCords);
        }).catch(error => {
          console.log(error);
        });
      }
      apicallfrom();

      function apicallto(search){  
        const params = {
          key: 'pk.464c86ee7b05ccf8063d89f1238704b9',
          q: `${myDest}`,
          format: 'json',
          limit: '1'
        }
        
        console.log(params)
        
        axios.get('https://eu1.locationiq.com/v1/search', {params})
          .then(response => {
            
           
            console.log("Response to lat",response.data[0].lat);
           
            console.log("Response to lon",response.data[0].lon);
            setPathCords({
              ...pathCords,lat2:response.data[0].lat,long2:response.data[0].lon
            })
          }).catch(error => {
            console.log(error);
          });
        }
        console.log("calling To")
        apicallto();
        
  }
  function handlereset(){
    setNearbyList([]);
  }
  return (
    <div>
    
      <Navbar />
      {console.log(points)}
      <Map
        mapboxAccessToken="pk.eyJ1IjoibW1pZGh1biIsImEiOiJjbGFxYTIxODcxNDB0M3ZucGlmcWp3cHpuIn0.4ekFwyhXAkUt-zYu9ePDpQ"
        initialViewState={{
          longitude: 76.93792505109217,
          latitude: 8.525794306303943,
          zoom: 12
        }}
        style={{ width: "100%", height: "88vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Source id="polylineLayer" type="geojson" data={points}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              "line-join": "round",
              "line-cap": "round"
            }}
            paint={{
              "line-color": "rgb(224, 45, 203)",
              "line-width": 7
            }}
          />
        </Source>
        <NavigationControl position='bottom-right' />
        <Card className='card'
        sx={{color:'white', margin: '25px', padding:'25px'}}>
        <TextField id="outlined-basic" label="From" variant="outlined" 
            onChange={(e) => setMySource(e.target.value)}

        />
        <br/>
        <TextField id="outlined-basic" label="To" variant="outlined" 
            onChange={(e) => setMyDest(e.target.value)}

        /><br/>
        <Button className='start' variant="contained" onClick={handlego}>Go</Button>
        <Button className='start' variant="contained" onClick={handlereset}>Reset</Button>


        </Card>
        
        <GeolocateControl
        
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserHeading={true}
         onGeolocate={(loc)=>{
              setPathCords({
                ...pathCords,lat1:loc.coords.latitude,long1:loc.coords.longitude
              })
         }}
          // onClick={getUserLocation}
        />

        {pins.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <EvStation style={{ fontSize: 26, color: "red", cursor: "pointer", }}
                onClick={() => handleMarkerClick(p._id)}

              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <div className='popup'>
                  <label>Title</label>
                  <h4>{p.title}</h4>
                  <label>City</label>
                  <p>{p.city}</p>
                  <label>Charger_type</label>
                  <p>{p.charger_type}</p>
                  <div className='d1'>
                    <label>Ports</label>
                    <p className='p1'>{p.ports}</p>
                    <label>Price</label>
                    <p className='p1'>{p.price}</p>
                  </div>
                  <label>Rating</label>
                  <div className='go'>
                    <div className='stars'>
                      {Array(p.rating).fill(<Star className="star" />)}
                    </div>
                    <div onClick={e=>{setPathCords({
                          ...pathCords,lat2:p.lat,long2:p.long
                            })}} className='go1'>
                      <Directions  style={{ fontSize: 26, color: "blue", cursor: "pointer" }} />
                    </div>
                  </div>
                </div>
              </Popup>
            )}
          </>
        ))}

{nearbyList.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <EvStation style={{ fontSize: 26, color: "green", cursor: "pointer", }}
                onClick={() => handleMarkerClick(p._id)}

              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <div className='popup'>
                  <label>Title</label>
                  <h4>{p.title}</h4>
                  <label>City</label>
                  <p>{p.city}</p>
                  <label>Charger_type</label>
                  <p>{p.charger_type}</p>
                  <div className='d1'>
                    <label>Ports</label>
                    <p className='p1'>{p.ports}</p>
                    <label>Price</label>
                    <p className='p1'>{p.price}</p>
                  </div>
                  <label>Rating</label>
                  <div className='go'>
                    <div className='stars'>
                      {Array(p.rating).fill(<Star className="star" />)}
                    </div>
                    <div onClick={e=>{setPathCords({
                          ...pathCords,lat2:p.lat,long2:p.long
                            })}} className='go1'>
                      <Directions  style={{ fontSize: 26, color: "blue", cursor: "pointer" }} />
                    </div>
                  </div>
                </div>
              </Popup>
            )}
          </>
        ))}
      </Map>
    </div>
  )
}

export default Maparea;
