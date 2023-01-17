import { LineChart, Line, XAxis, YAxis, Tooltip, } from 'recharts';
import { ResponsiveContainer, CartesianGrid } from 'recharts';
import './Graf.css';
import React from 'react';

let sirka;
sirka = 500;
if (window.innerWidth < 600) 
  sirka = 300;


function Graf() {

    const data = [
        { name: '12:00', aut: 35},
        { name: '13:00', aut: 30},
        { name: '14:00', aut: 40},
        { name: '15:00', aut: 20},
        { name: '16:00', aut: 11},
        { name: '17:00', aut: 5},
        { name: '18:00', aut: 20},
      
      ];


    



    return (
      <ResponsiveContainer width={"100%"} height={sirka} className="Graf">
        <LineChart data={data}>
          <Line type="monotone" dataKey="aut" stroke="#8884d8" strokeWidth={3}/>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip/>
        </LineChart>
      </ResponsiveContainer>
   );
  }


  export default Graf;


