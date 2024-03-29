import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import FadeLoader from "react-spinners/FadeLoader";
import './App.css';
import { PieChart, Pie, Cell, Label } from 'recharts';
import { LineChart, Line, XAxis, YAxis, Tooltip, } from 'recharts';
import { ResponsiveContainer, CartesianGrid } from 'recharts';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';

let max = 90; //maximální počet aut z  nastaveného intervalu na parkovišti
let min = 0; //minimální počet aut z  nastaveného intervalu na parkovišti

let statText = "Statisky za posledních 5 hodin"; //text zobrazený nad grafem

let vyska;
vyska = 500;
if (window.innerWidth < 800) 
vyska = 300;

// React Leaflet Mapka zobrazující místo kde se nachází parkoviště
const Mapka = () => {

  const [center] = useState([50.6813617, 14.0078506]); // Pozoce parkoviště v UL
  return (
    <MapContainer center={center} zoom={15} className="map-container">
        <TileLayer
          //url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
          attribution= '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          styles="mapbox://styles/mapbox/dark-v10"
        />
        <Marker position={center}>
        <Popup>Parkoviště</Popup>
        </Marker>.
    </MapContainer>
  );
}


// Graf zobrazující historii obsazenosti parkoviště v daném intervalu
function CarCount(props)  {
  const [value] = useState(props.count);

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

//Aplikace
function App() {
  const [dataG, setDataG] = useState([
  ]); //data pro graf

  let [loading, setLoading] = useState(true); //nastavení že se při načítání stránky zobrazí loading

  let [miniLoading, setMiniLoading] = useState(false); //nastavení že se při načítání grafu zobrazí loading

  const [parkingData, setParkingData] = useState([]); //data pro aktuální počet aut na parkovišti

  useEffect(() => { //načtení dat z API
    const fetchData = async () => {
      try {
        const responseNOW = await fetch('https://parkingapi.node.cloud.bagros.eu/getdata/usti_pennyrondel/?timerange=1m&window=1m'); //aktuální počet aut na parkovišti
        const response = await fetch('https://parkingapi.node.cloud.bagros.eu/getdata/usti_pennyrondel/?timerange=5h&window=30m'); //za posledních 5 hodin po 30 min
        const data = await response.json();
        const dataNOW = await responseNOW.json();
        const mappedData = data.data.map(item => ({ //mapování dat pro graf ve správném formátu
          name: parseInt(item.time.substring(11, 13)) + 2 + ":" + item.time.substring(14, 16),
          aut: item.full,
        }));
        max = Math.max(...mappedData.map(item => item.aut)); //nastavení maximálního a minimálního počtu aut na parkovišti
        min = Math.min(...mappedData.map(item => item.aut));
        setDataG(mappedData); //nastavení dat pro graf
        setParkingData(dataNOW.data); //nastavení dat pro aktuální počet aut na parkovišti
        setLoading(false); //poté co proběhne API request se nastaví loading na false
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  function Show5H(){
    statText = "Statisky za posledních 5 hodin";
    setMiniLoading(true);
    const response = fetch('https://parkingapi.node.cloud.bagros.eu/getdata/usti_pennyrondel/?timerange=5h&window=30m');
    response.then(res => res.json()).then(data => {
      const mappedData = data.data.map(item => ({
        name: parseInt(item.time.substring(11, 13)) + 2 + ":" + item.time.substring(14, 16),
        aut: item.full,
      }));
      max = Math.max(...mappedData.map(item => item.aut));
      min = Math.min(...mappedData.map(item => item.aut));
      setDataG(mappedData);
      setMiniLoading(false);
    });
  }

  function Show1D(){
    statText = "Statisky za posledních 24 hodin";
    setMiniLoading(true);
    const response = fetch('https://parkingapi.node.cloud.bagros.eu/getdata/usti_pennyrondel/?timerange=1d&window=2h');
    response.then(res => res.json()).then(data => {
      const mappedData = data.data.map(item => ({
        name: parseInt(item.time.substring(11, 13)) + 2 + ":" + item.time.substring(14, 16),
        aut: item.full,
      }));
      max = Math.max(...mappedData.map(item => item.aut));
      min = Math.min(...mappedData.map(item => item.aut));
      setDataG(mappedData);
      setMiniLoading(false);
    });
  }

  function Show1W(){
    statText = "Statisky za posledních 7 dní";
    setMiniLoading(true);
    const response = fetch('https://parkingapi.node.cloud.bagros.eu/getdata/usti_pennyrondel/?timerange=1w&window=1d');
    response.then(res => res.json()).then(data => {
      const mappedData = data.data.map(item => ({
        name: item.time.substring(0, 10),
        aut: item.full,
      }));
      const sum = mappedData.reduce((total, item) => total + item.aut, 0);
      const average = sum / mappedData.length;
      max = Math.max(...mappedData.map(item => item.aut));
      min = Math.min(...mappedData.map(item => item.aut));
      setDataG(mappedData);
      setMiniLoading(false);
      console.log("Průměr za týden: " + average);
    });
  }
  
  function Show1M(){
    statText = "Statisky za posledních 30 dní";
    setMiniLoading(true);
    const response = fetch('https://parkingapi.node.cloud.bagros.eu/getdata/usti_pennyrondel/?timerange=1mo&window=1d');
    response.then(res => res.json()).then(data => {
      const mappedData = data.data.map(item => ({
        name: parseInt(item.time.substring(8, 10)) + "." + item.time.substring(5, 7),
        aut: data.data.reduce((sum, current) => sum + current.full, 0),
      }));
      max = Math.max(...mappedData.map(item => item.aut));
      min = Math.min(...mappedData.map(item => item.aut));
      setDataG(mappedData);
      setMiniLoading(false);
    });
  }
  
  

  /*
  function Show1M(){
    statText = "Statisky za posledních 30 dní";
    setMiniLoading(true);
    const response = fetch('https://parkingapi.node.cloud.bagros.eu/getdata/usti_pennyrondel/?timerange=1m&window=1d');
    response.then(res => res.json()).then(data => {
      const mappedData = data.data.map(item => ({
        name: parseInt(item.time.substring(8, 10)) + "." + item.time.substring(5, 7),
        aut: data.data.reduce((sum, current) => sum + current.full, 0),
      }));
      max = Math.max(...mappedData.map(item => item.aut));
      min = Math.min(...mappedData.map(item => item.aut));
      setDataG(mappedData);
      setMiniLoading(false);
    });
  }
  */
  
  
  
  

  return (<>
  <Container maxWidth="xl">
  {loading ? <div className="loading"><FadeLoader color="#27beffcf"/></div>: 
    <div className="Container">
      <div className="LeftContainer">
        <h1>Ústí nad Labem - Penny Rondel</h1>	
        <div className="TopContainer">
          <div className="CarCount">
          <CarCount count={parkingData[0].full}/>
          </div>
          <div className="infoDiv">
            <h2>Informace o parkovišti</h2>
            <p>Plná místa: {parkingData[0].full}</p> <br/>
            <p>Volná místa: {90 - parseInt(parkingData[0].full)}</p>	<br/>
            <p>Obsazenost: {Math.round(parkingData[0].full / 90 * 100)}%</p><br/>
            <p>Poslední aktualizace: {(parseInt(parkingData[0].time.substring(11, 13)) + 2 )+ ":" + parseInt(parkingData[0].time.substring(14, 16))}</p>
          </div>
        </div>

        <Mapka/>

     </div>

      <div className="RightContainer">
        <h1>{statText}</h1>
        
        <ResponsiveContainer width={"100%"} height={vyska} className="Graf">
        {miniLoading ? <div className="miniLoading"><FadeLoader color="#27beffcf"/></div>: 
          <LineChart data={dataG}>
          <Line type="monotone" dataKey="aut" stroke="#27beff" strokeWidth={3}/>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            domain={[min -1, max + 1]}
          />
          <Tooltip contentStyle={{backgroundColor: "black"}} itemStyle={{ color: "white" }} />
          </LineChart>
                  }
        </ResponsiveContainer>

        <button onClick={Show5H}>Za 5 hodin</button>

        <button onClick={Show1D}>Za den</button>

        <button onClick={Show1W}>Za týden</button>

        <button onClick={Show1M}>Za měsíc</button>
      </div>
    </div>
    }
    </Container>
    </>
  );
}

export default App;