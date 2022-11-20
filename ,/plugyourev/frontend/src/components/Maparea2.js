import React,{ useEffect, useState,useRef} from 'react';
import Map,{ GeolocateControl, NavigationControl, Marker,Popup, Source, Layer } from 'react-map-gl';

import {EvStation,Star} from "@material-ui/icons";
import "./Maparea.css"
import axios from "axios";
import Navbar from './Navbar';
// import mapboxgl from 'mapbox/mapbox-gl-directions';
// import DeckGL, { GeoJsonLayer } from "deck.gl";
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

function Maparea() {
  const [pins, setPins] = useState([]);
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
  // const [searchResultLayer, setSearchResult] = useState(null);
  // const mapRef = useRef();
  // const handleOnResult = (event) => {
  //   console.log(event.result);
  //   setSearchResult(
  //     new GeoJsonLayer({
  //       id: "search-result",
  //       data: event.result.geometry,
  //       getFillColor: [255, 0, 0, 128],
  //       getRadius: 1000,
  //       pointRadiusMinPixels: 10,
  //       pointRadiusMaxPixels: 10,
  //     })
  //   );
  // };
  // const handleGeocoderViewportChange = (viewport) => {
  //   const geocoderDefaultOverrides = { transitionDuration: 1000 };
  //   console.log("Updating");
  //   return setViewport({
  //     ...viewport,
  //     ...geocoderDefaultOverrides,
  //   });
  // };

  const handleMarkerClick =(id)=>{
      setCurrentPlaceId(id);
  };
  // const mapRef = React.useRef();

  // const onMapLoad = React.useCallback(() => {
  //   mapRef.current.on('move', () => {
  //     // do something
  //     var directions = new MapboxDirections({
  //       accessToken: mapboxgl.accessToken
  //     })
    
  //     mapRef.addControl(directions, "top-left")
  //   });
  // }, []);
  return (
    <div>
      <Navbar />
      <Map
      // ref={mapRef} 
      // onLoad={onMapLoad}
        mapboxAccessToken="pk.eyJ1IjoibW1pZGh1biIsImEiOiJjbDlweHZ3eHAwM2kyM29sNzhpb3g0cjJoIn0.k7tqrkmM20x27lx3bXZ4Jw"
        initialViewState={{
          longitude: 76.93792505109217,
          latitude: 8.525794306303943,        
          zoom: 12
        }}
        // ref={mapRef}
        style={{width: "100%", height: "89vh"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
      <NavigationControl position='bottom-right' />
      <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserHeading= {true}
      />  
      {/* <MapboxGeocoder
          mapRef={mapRef}
          onResult={handleOnResult}
          onViewportChange={handleGeocoderViewportChange}
          mapboxAccessToken="pk.eyJ1IjoibW1pZGh1biIsImEiOiJjbDlweHZ3eHAwM2kyM29sNzhpb3g0cjJoIn0.k7tqrkmM20x27lx3bXZ4Jw"
          position="top-left"
        /> */}
      {pins.map((p) => (
        <>
        <Marker
          latitude={p.lat}
          longitude={p.long}
          offsetLeft={-20}
          offsetTop={-10}
        >
            <EvStation style={{ fontSize: 26 ,color:"red",cursor:"pointer",}}
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
              <label>Ports</label>
              <p>{p.ports}</p>
              <label>Price</label>
              <p>{p.price}</p>
              <label>Rating</label>
              <div className='stars'>
                <Star className='star'/>
                <Star className='star'/>
                <Star className='star'/>
                <Star className='star'/>
                <Star className='star'/>
              </div>
            </div>
          </Popup>
        )}
        </>
      ))}
      </Map>
      {/* <DeckGL {...viewport} layers={[searchResultLayer]} /> */}
    </div>  
  )
}

export default Maparea;
