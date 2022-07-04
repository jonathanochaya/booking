import "./list.css";

import { format } from 'date-fns';
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { DateRange } from "react-date-range";

import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

const List = () => {

  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);

  return (
    <div>
      <Navbar/>
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="listSearchTitle">Search</h1>
            <div className="listSearchItem">
              <label htmlFor="">Destination</label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="listSearchItem">
              <label htmlFor="">Check-in Date</label>
              <span onClick={()=>setOpenDate(!openDate)}>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyy")}`}</span>
              {openDate? <DateRange
                minDate={new Date()}
                onChange={item => setDate([item.selection])}
                ranges={date}
              />: null}
            </div>
            <div className="listSearchItem">
              <label htmlFor="">Options</label>
              <div className="listSearchOptions">
                <div className="listSearchOptionItem">
                  <span className="optionText">Min Price <small>per night</small></span>
                  <input type="text" className="listSearchOptionInput" />
                </div>
                <div className="listSearchOptionItem">
                  <span className="optionText">Max Price <small>per night</small></span>
                  <input type="text" className="listSearchOptionInput" />
                </div>
                <div className="listSearchOptionItem">
                  <span className="optionText">Adult</span>
                  <input type="text" min={1} className="listSearchOptionInput" placeholder={options.adult} />
                </div>
                <div className="listSearchOptionItem">
                  <span className="optionText">Children</span>
                  <input type="text" min={0} className="listSearchOptionInput" placeholder={options.children} />
                </div>
                <div className="listSearchOptionItem">
                  <span className="optionText">Room</span>
                  <input type="text" min={1} className="listSearchOptionInput" placeholder={options.room} />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="listResult">
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  );
}

export default List;