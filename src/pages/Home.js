import React from 'react';
import ShowBox from './components/ShowBox';
import Graf from './components/Graf';
import Mapka from "./components/Mapka";






const Home = () => {
  //const position = [50.0880, 14.4208]; // pozice Národního divadla v Praze

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
        <div className="Mapka">
        <Mapka />
        </div>
      </div>
    );
  };
  
  export default Home;