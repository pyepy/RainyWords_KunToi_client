import React, { useState, useEffect } from 'react';
import { socket } from '../socket'
import { NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export function Menu(props) {

  return (
    <div className="Menu">
      {/* <div className="Username">Welcome, {name}</div> */}
      <ul className="options">
        {/*<li className="notOption">Welcome, <span className='Username'>{username}</span></li>*/}
        {props.items.map((item, index) => (
          <NavItem tag={Link} to={item[1]}>
          <li className="option" key={index}>
          {item[0]}

          {index === 0? (
            <>
            <div className="room">
              Classic
            </div>
            <div className="room">
              Arcade
            </div>
            </>
          ) : null}

          {index === 1? (
            <>
            <div className="roomNumber">
              Room No.

              <input className="roomNumberInput" placeholder='00000' maxLength={5}/>
              <button className="submitRoom">Join</button>
            </div>
            </>
          ) : null}
        
        </li> 
        </NavItem>
        
        ))}
      </ul>

    </div>
  );   
}