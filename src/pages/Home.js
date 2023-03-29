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
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx={150}
        cy={150}
        innerRadius={100}
        outerRadius={130}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        startAngle={90}
        endAngle={450}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
    <Label
    value={`Obsazeno`}
    position="center"
    dy={-50}
    dx={-10}
    style={{ fontSize: 20, fill: '#ffffff'}}
  />
  <Label
    value={`${value}`}ffffff
    position="center"
    style={{ fontSize: 80, fill: '#ffffff' }}
  />
  <Label
    value={`z 90`}
    position="center"
    dy={50}
    dx={10}
    style={{ fontSize: 20, fill: '#ffffff'}}
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
        const responseNOW = await fetch('https://parkingapi.node.cloud.bagros.eu/getdata/usti_pennyrondel/?timerange=1m&window=1m'); //aktuální počet aut na parkovišti
        const response = await fetch('https://parkingapi.node.cloud.bagros.eu/getdata/usti_pennyrondel/?timerange=5h&window=30m'); 
        const data = await response.json();
        const dataNOW = await responseNOW.json();
        const mappedData = data.data.map(item => ({
          name: parseInt(item.time.substring(11, 13)) + 2 + ":" + item.time.substring(14, 16),
          aut: item.full,
        }));
        setDataG(mappedData);
        setParkingData(dataNOW.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);



  return (<>
  <Container maxWidth="xl">
  {loading ? <div className="loading"><FadeLoader color="#27beffcf"/></div>: 
    <div className="Container">
      <div className="LeftContainer">
        <h1>Usti nad Labem - Penny Rondel</h1>	
        <CarCount count={parkingData[0].full}/>
        <div className="infoDiv">
          <h2>Informace o parkovišti</h2>
          <p>Adresa: <a href="https://goo.gl/maps/8Z8Z9Z8Z9Z8Z9Z8Z9">Penny Rondel, Usti nad Labem</a></p>
          <p>Obsazenost: {parkingData[0].full} z 90</p>
          <p>Poslední aktualizace: {parkingData[0].time}</p>
        </div>


      


     </div>

      <div className="RightContainer">
        <h1>Statisky za posledních 5 hodin</h1>
        <ResponsiveContainer width={"100%"} height={vyska} className="Graf">
          <LineChart data={dataG}>
          <Line type="monotone" dataKey="aut" stroke="#27beff" strokeWidth={3}/>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            domain={[41, 47]}
          />
          <Tooltip contentStyle={{backgroundColor: "black"}} itemStyle={{ color: "white" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
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