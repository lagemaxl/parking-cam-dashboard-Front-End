import React from 'react';
//import { LineChart, Line, XAxis, YAxis, Tooltip, } from 'recharts';
//import { ResponsiveContainer } from 'recharts';
import ShowBox from './components/ShowBox';
import Graf from './components/Graf';
//import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';







const Home = () => {

    return (
      <div className="App">
        <h1 className="Title">Parking Dashboard</h1>
        <div className="ShowBoxs-box"> 
          <ShowBox title="Počet míst:" value={90} />
          <ShowBox title="Obsazená místa:" value={10} />
          <ShowBox title="Volná místa:" value={80} />
        </div>
        <div className="Graf">  
          <Graf />
        </div>
      </div>
    );
  };
  
  export default Home;