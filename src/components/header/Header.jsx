import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faBed, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import { format } from 'date-fns';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './header.css';

const Header = ({ type }) => {
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1
  });

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const handleOption = (name, operation) => {
    setOptions(prev => {
      return {
        ...prev,
        [name]: operation==="i"? options[name] +1: options[name]>1? options[name] -1: 0
      }
    });
  }

  return (
    <div className='header'>
      <div className={type === "list"? "headerContainer listPage": "headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>

        {type !== "list"? <>
          <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
          <p className="headerDesc">Get rewarded for your travels - unlock instant savings of 10% or more with a free Jbooking account</p>
          <button className="headerBtn">Sign in / Register</button>
        
          <div className="headerSearch">
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faBed} className="headerIcon" />
              <input type="text" placeholder='Where are you going?' className='headerSearchInput'/>
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
              <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>{`${format(date[0].startDate, "MM/dd/yyy")} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}</span> 
              {openDate? <DateRange
                editableDateInputs={true}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="dateComponent"
              />: null}
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faPerson} className="headerIcon" />
              <span onClick={()=>setOpenOptions(!openOptions)} className='headerSearchText'>{`${ options.adult } adult${options.adult>1? 's': ''} . ${options.children} children . ${options.room} room${options.room>1? 's': ''}`}</span>
              
              {openOptions? <div className="options">
                <div className="optionItem">
                  <span className="optionText">Adult</span>
                  <div className="optionCounter">
                    <button className="optionCounterButton" onClick={()=>handleOption("adult", "d")}>-</button>
                    <span>{options.adult<1? 0: options.adult}</span>
                    <button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Children</span>
                  <div className="optionCounter">
                    <button className="optionCounterButton" onClick={()=>handleOption("children", "d")}>-</button>
                    <span>{options.children<1? 0: options.children}</span>
                    <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Room</span>
                  <div className="optionCounter">
                    <button className="optionCounterButton" onClick={()=>handleOption("room", "d")}>-</button>
                    <span>{options.room<1? 0: options.room}</span>
                    <button className="optionCounterButton" onClick={()=>handleOption("room", "i")}>+</button>
                  </div>
                </div>
              </div>: null}
            </div>
            <div className="headerSearchItem">
              <button className="headerBtn">Search</button>
            </div>
          </div></>: null}
      </div>
    </div>
  );
}

export default Header;