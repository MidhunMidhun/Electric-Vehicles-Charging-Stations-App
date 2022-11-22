import React, { useEffect, useState, useRef } from 'react';
import Map, { GeolocateControl, NavigationControl, Marker, Popup, Source, Layer } from 'react-map-gl';

import { EvStation, Star, Directions } from "@material-ui/icons";
import "./Maparea.css"
import axios from "axios";
import Navbar from './Navbar';




// import mapboxgl from 'mapbox/mapbox-gl-directions';
// import DeckGL, { GeoJsonLayer } from "deck.gl";
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

function Maparea() {
  const [pins, setPins] = useState([]);
  const [pathCords, setPathCords] = useState({
    long1: 76.93792505109217, lat1: 8.525794306303943, long2: 76.07970165554286, lat2: 10.784700155435644
  })
  const [points, setPoints] = useState({
    type: "Feature",
    properties: {},
    geometry: {}
  });
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const [viewport, setViewport] = React.useState({});
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

    const getPoints = async () => {
      const allpath = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pathCords.long1},${pathCords.lat1};${pathCords.long2},${pathCords.lat2}?geometries=geojson&access_token=pk.eyJ1IjoibW1pZGh1biIsImEiOiJjbGFxYTIxODcxNDB0M3ZucGlmcWp3cHpuIn0.4ekFwyhXAkUt-zYu9ePDpQ`
      )
      console.log("Points", points)
      setPoints({ ...points, geometry: allpath.data.routes[0].geometry })
      console.log("All Path", allpath)
    }
    getPoints()
  }, [pathCords])


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

  // const getUserLocation
  return (
    <div>
      {}
      <Navbar />
      {console.log(points)}
      <Map
      // onLoad={}
        mapboxAccessToken="pk.eyJ1IjoibW1pZGh1biIsImEiOiJjbGFxYTIxODcxNDB0M3ZucGlmcWp3cHpuIn0.4ekFwyhXAkUt-zYu9ePDpQ"
        initialViewState={{
          longitude: 76.93792505109217,
          latitude: 8.525794306303943,
          zoom: 12
        }}
        // ref={mapRef}
        style={{ width: "100%", height: "89vh" }}
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
      </Map>
    </div>
  )
}

export default Maparea;
