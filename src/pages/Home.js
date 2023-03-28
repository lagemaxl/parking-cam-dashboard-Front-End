import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import FadeLoader from "react-spinners/FadeLoader";
import './App.css';
import { PieChart, Pie, Cell, Label } from 'recharts';
import { LineChart, Line, XAxis, YAxis, Tooltip, } from 'recharts';
import { ResponsiveContainer, CartesianGrid } from 'recharts';

let vyska;
vyska = 500;
if (window.innerWidth < 600) 
vyska = 300;



function CarCount(props)  {
  const [value] = useState(props.count);
  //setVal ue(props.count);
  const data = [
      { name: 'Group A', value: value },
      { name: 'Group B', value: 90-value },
    ];
    const COLORS = ['#27beff', '#282c34'];

  return (
    <>
    <PieChart width={170} height={170}>
      <Pie
        data={data}
        cx={80}
        cy={80}
        innerRadius={60}
        outerRadius={80}
        paddingAngle={5}
        dataKey="value"
        startAngle={90}
        endAngle={450}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
  <Label
    value={`${value}`}ffffff
    position="center"
    style={{ fontSize: 50, fill: '#ffffff' }}
  />
  <Label
    value={`/90`}
    position="center"
    dy={30}
    dx={0}
    style={{ fontSize: 15, fill: '#ffffff'}}
  />
      </Pie>
    </PieChart>
    </>
  );
};

function App() {
  const [dataG, setDataG] = useState([
  ]);

  let [loading, setLoading] = useState(true);

  const [parkingData, setParkingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://parkingapi.node.cloud.bagros.eu/getdata/usti_pennyrondel/?timerange=10m&window=1m'); //aktuální počet aut na parkovišti
        const data = await response.json();
        const mappedData = data.data.map(item => ({
          name: item.time.substring(11, 16),
          aut: item.full,
        }));
        setDataG(mappedData);
        setParkingData(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);



  return (<>
  <Container maxWidth="xl">
  {loading ? <div className="loading"><FadeLoader color="#36d7b7"/></div>: 
    <div>
      <h1>Parking Data</h1>
      <CarCount count={parkingData[0].full} />
      <ResponsiveContainer width={"100%"} height={vyska} className="Graf">
      <LineChart data={dataG}>
        <Line type="monotone" dataKey="aut" stroke="#27beff" strokeWidth={3}/>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
       <YAxis />
        <YAxis />
        <Tooltip/>
      </LineChart>
    </ResponsiveContainer>

    </div>
    }
    </Container>
    </>
  );
}

export default App;
/*
<ul>
{parkingData.map((item, index) => (
  <li key={index}>
    <p>Time: {item.time}</p>
    <p>Full: {item.full}</p>
  </li>
))}
</ul>

*/