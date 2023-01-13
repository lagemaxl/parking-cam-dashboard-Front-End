import './ShowBox.css';
import React from 'react';

function ShowBox(props) {

    //const divelement = document.querySelector('.ShowBox');
    const titleelement = document.querySelector('.ShowBoxTitle') 
    const valueelement = document.querySelector('.ShowBoxValue');

    const handleMouseEnter = () => {
        titleelement.style.display = "none";
        valueelement.style.fontSize = "5em";

    }
    const handleMouseLeave = () => {
        titleelement.style.display = "block";
        valueelement.style.fontSize = "4.5em";
    }
    return (
    <>
    <div className= "ShowBox" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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