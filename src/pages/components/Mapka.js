import React, { useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import './MapObject.css'
//import 'leaflet/dist/leaflet.css'; // import leaflet css

const Mapka = () => {
  const [center] = useState([50.6813617, 14.0078506]); // National Theatre's location in Prague
  return (
    <MapContainer center={center} zoom={15} className="leaflet-container">
        <TileLayer
          //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
          attribution= '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          //attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center} />
    </MapContainer>
  );
}

export default Mapka;
