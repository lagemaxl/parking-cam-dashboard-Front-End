import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: '12:00', aut: 35},
  { name: '13:00', aut: 30},
  { name: '14:00', aut: 40},
  { name: '15:00', aut: 20},
  { name: '16:00', aut: 11},
  { name: '17:00', aut: 5},
  { name: '18:00', aut: 20},

];

const Home = () => {
    return (
      <div className="App">
        <h1>Ahoj</h1>
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="aut" stroke="#8884d8" strokeWidth={3}/>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    );

  };
  
  export default Home;