import React, { useState, useEffect } from 'react';
import { socket } from '../socket'

export function Menu(props) {

  return (
    <div className="Menu">
      {/* <div className="Username">Welcome, {name}</div> */}
      <ul className="options">
        {/*<li className="notOption">Welcome, <span className='Username'>{username}</span></li>*/}
        {props.items.map((item, index) => (
          <li className="option" key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );   
}