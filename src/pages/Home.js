import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import FadeLoader from "react-spinners/FadeLoader";
import './App.css';



function App() {
    let [loading, setLoading] = useState(true);

  const [parkingData, setParkingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://parkingapi.node.cloud.bagros.eu/getdata/usti_pennyrondel/?timerange=1mo&window=1m');
      const data = await response.json();
      setParkingData(data.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (<>
  <Container maxWidth="xl">
  {loading ? <div className="loading"><FadeLoader color="#36d7b7"/><div/> </div>: 
    <div>
      <h1>Parking Data</h1>
      <ul>
        {parkingData.map((item, index) => (
          <li key={index}>
            <p>Time: {item.time}</p>
            <p>Full: {item.full}</p>
          </li>
        ))}
      </ul>
    </div>
    }
    </Container>
    </>
  );
}

export default App;
