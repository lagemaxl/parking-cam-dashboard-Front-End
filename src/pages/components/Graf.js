import { LineChart, Line, XAxis, YAxis, Tooltip, } from 'recharts';
import { ResponsiveContainer, CartesianGrid } from 'recharts';
import './Graf.css';
import React, { useState } from 'react';

let sirka;
sirka = 500;
if (window.innerWidth < 600) 
  sirka = 300;


function Graf() {

  const [yAxisDomain, setYAxisDomain] = useState([0, 50]);

  const [data, setData] = useState([
    { name: '12:00', aut: 35},
    { name: '13:00', aut: 30},
    { name: '14:00', aut: 40},
    { name: '15:00', aut: 20},
    { name: '16:00', aut: 11},
    { name: '17:00', aut: 5},
    { name: '18:00', aut: 20},
  ]);

  function ChangeDataYear() {

    setYAxisDomain([1500, 2000]);

    setData([
      { name: 'Leden', aut: 1679},
      { name: 'Únor', aut: 1571},
      { name: 'Březen', aut: 1827},
      { name: 'Duben', aut: 1679},
      { name: 'Květen', aut: 1567},
      { name: 'Červen', aut: 1940},
      { name: 'Červenec', aut: 1798},
      { name: 'Srpen', aut: 1890},
      { name: 'Zíří', aut: 1789},
      { name: 'Říjen', aut: 1962},
      { name: 'Listopad', aut: 1768},
      { name: 'Prosinec', aut: 1567},
    ]);
  }

  function ChangeDataWeek() {

    setYAxisDomain([150, 500]);

    setData([
      { name: 'Pondělí', aut: 309},
      { name: 'Úterý', aut: 378},
      { name: 'Středa', aut: 482},
      { name: 'Čtvrtek', aut: 273},
      { name: 'Pátek', aut: 408},
      { name: 'Sobota', aut: 378},
      { name: 'Neděle', aut: 384},
    ]);
  }

  function ChangeDataLast6Hours() {

    setYAxisDomain([0, 50]);

    setData([
      { name: '12:00', aut: 35},
      { name: '13:00', aut: 30},
      { name: '14:00', aut: 40},
      { name: '15:00', aut: 20},
      { name: '16:00', aut: 11},
      { name: '17:00', aut: 5},
      { name: '18:00', aut: 20},
    ]);
  }



    return (
      <>
      <ResponsiveContainer width={"100%"} height={sirka} className="Graf">
        <LineChart data={data}>
          <Line type="monotone" dataKey="aut" stroke="#8884d8" strokeWidth={3}/>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
         <YAxis domain={yAxisDomain} />
          <YAxis />
          <Tooltip/>
        </LineChart>
      </ResponsiveContainer>
      <button onClick={ChangeDataYear} className="btnGraf">Poslední Rok</button>
      <button onClick={ChangeDataWeek} className="btnGraf">Poslední Týden</button>
      <button onClick={ChangeDataLast6Hours} className="btnGraf">Posledních 6 hodin</button>
      </>
   );
  }


  export default Graf;


