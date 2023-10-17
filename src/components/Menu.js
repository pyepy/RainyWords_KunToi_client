import React, { useState, useEffect } from 'react';
import { socket } from '../socket'
import { NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export function Menu(props) {
  const Create_room = 'Create room';
  const Join_room = 'Join room';

  return (
    <div className="Menu">
      <ul className="options">
        {props.items.map((item, index) => (
          <li className="option" key={index}>
            {item[0] === Create_room ? (
              <>
                {item[0]}
                {/* <NavItem tag={Link} to={item[1]}> */}
                  <div className="room">
                    Classic
                  </div>
                {/* </NavItem> */}
                <div className="room">
                  Arcade
                </div>
              </>
            ) : null}

            {item[0] === Join_room ? (
              <>
                {item[0]}
                <div className="roomNumber">
                  Room No.

                  <input className="roomNumberInput" placeholder='00000' maxLength={5}/>
                  {/* <NavItem tag={Link} to={item[1]}> */}
                    <button className="submitRoom">Join</button>
                  {/* </NavItem> */}
                </div>
              </>
            ) : null}

            {item[0] !== Create_room && item[0] !== Join_room ? (
              <>
                <NavItem tag={Link} to={item[1]}>
                  {item[0]}
                </NavItem>
              </>
            ) : null}

          </li> 
        
        ))}
      </ul>

    </div>
  );   
}