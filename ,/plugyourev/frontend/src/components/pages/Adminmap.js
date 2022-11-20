import React,{ useEffect, useState } from 'react';
import Map,{ GeolocateControl, NavigationControl, Marker,Popup} from 'react-map-gl';
import {EvStation,Star} from "@material-ui/icons";
import "./Adminmap.css"
import axios from "axios";
import{Link} from 'react-router-dom';


function Adminmap() {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [viewport, setViewport] = useState({
    longitude: 76.93792505109217,
    latitude: 8.525794306303943,        
    zoom: 12
  });

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

  const handleMarkerClick =(id,lat,long)=>{
      setCurrentPlaceId(id);
      setViewport({ ...viewport, latitude: lat, longitude: long });
  };


  const handleAddClick = (e) => {
    e.preventDefault();
      console.log(e);;
    const lng = e.lngLat.lng;
    const lat = e.lngLat.lat;
    console.log("lng,lat : ", lng, lat);
    setNewPlace({ 
      lat:lat, 
      long:lng,
    });
    console.log(newPlace);
  };
  return (
    <div>
      <Map
      
        mapboxAccessToken="pk.eyJ1IjoibW1pZGh1biIsImEiOiJjbDlweHZ3eHAwM2kyM29sNzhpb3g0cjJoIn0.k7tqrkmM20x27lx3bXZ4Jw"
        initialViewState={{
          longitude: 76.93792505109217,
          latitude: 8.525794306303943,        
          zoom: 12
        }}
        style={{width: "100%", height: "100vh"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={(e) =>handleAddClick(e)}
      >
      <NavigationControl position='bottom-right' />
      <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserHeading= {true}
      />
      {pins.map((p) => (
        <>
        <Marker
          latitude={p.lat}
          longitude={p.long}
          offsetLeft={-20}
          offsetTop={-10}
        >
            <EvStation style={{ fontSize: 26 ,color:"red",cursor:"pointer",}}
              onClick={() => handleMarkerClick(p._id,p.lat,p.long)}

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
      {newPlace && (
      <Popup 
            longitude={newPlace.long} 
            latitude={newPlace.lat}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
            anchor="left"
      >
        <div>
          <form >
          {/* onSubmit={handleSubmit} */}
            <label className='title'>Title</label>
            <input
              placeholder="Enter a title"
              autoFocus
              // onChange={(e) => setTitle(e.target.value)}
            />
            <label>Description</label>
            <textarea
              placeholder="Say us something about this place."
              // onChange={(e) => setDesc(e.target.value)}
            />
            <label>Rating</label>
            <select >
            {/* onChange={(e) => setStar(e.target.value)} */}
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
            </select>
            <button type="submit" className="submitButton">
                Add Pin
            </button>
          </form>
        </div>
      </Popup>
      )}
      <Link to="/">
        <button className='logout'>Log Out</button>
      </Link>

      </Map>
    </div>  
  )
}

export default Adminmap;
