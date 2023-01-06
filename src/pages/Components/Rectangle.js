import React from 'react';
import './App.css';

function Rectangle({ number, text }) {
  return (
    <div className='pocetsmg'>
      <div style={{ fontSize: 32 }}>{number}</div>
      <div style={{ fontSize: 14 }}>{text}</div>
    </div>
  );
}

export default Rectangle;
