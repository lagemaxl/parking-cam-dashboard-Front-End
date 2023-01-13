import './ShowBox.css';
import React from 'react';

function ShowBox(props) {

    //const divelement = document.querySelector('.ShowBox');
    //const titleelement = document.querySelector('.ShowBoxTitle') 
    //const valueelement = document.querySelector('.ShowBoxValue');
    return (
    <>
    <div className= "ShowBox">
        <h3 className="ShowBoxTitle">
            {props.title}
        </h3>
        <h3 className="ShowBoxValue">
            {props.value}
        </h3>
    </div>
   </>
   );
  }
  
  export default ShowBox;