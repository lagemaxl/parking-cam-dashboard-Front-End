import React, { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const spinner = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


function App() {
    let [loading, setLoading] = useState(true);
    let [color] = useState("#ffffff");

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
  {loading ?       <ClipLoader
        color={color}
        loading={loading}
        cssOverride={spinner}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> : 
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
    </>
  );
}

export default App;
