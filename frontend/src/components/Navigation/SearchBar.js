
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import searchIcon from './MagnifyingGlass.svg'
import './SearchBar.css'
import clock from './clock.svg'

function SearchBar() {
  const [guests, setGuests] = useState(1)
  const [showDestinations, setShowDestinations] = useState(false)

  const openMenu = () => {
    if (showDestinations) return;
    setShowDestinations(true);
  };

  useEffect(() => {
    if (!showDestinations) return;

    const closeMenu = () => {
      setShowDestinations(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showDestinations]);


  const tomorrow = new Date()
  const nextDay = new Date()
  tomorrow.setDate(tomorrow.getDate() + 2)
  nextDay.setDate(nextDay.getDate() + 5)

  const [checkIn, setCheckIn] = useState(tomorrow.toISOString().slice(0, 10))
  const [checkOut, setCheckOut] = useState(nextDay.toISOString().slice(0, 10))

  const history = useHistory()
  const [destination, setDestination] = useState()

  const handleSearch = (e) => {

    if (!destination) return

    e.preventDefault()
    history.push(`/search/${destination}/${guests}`)
  }

  return (
    <div className='searchBar-outer'>
      <form onSubmit={handleSearch} className="searchBar-form">
        <div className="searchBar-outer" onClick={openMenu}>
          <label className="searchBar-label">Where</label>
          <input
            type='text'
            placeholder='Search destinations'
            className='searchBar-input'
            value={destination}
            onChange={e => setDestination(e.target.value)}
            maxLength="140"
          />
          {showDestinations && (
            <div className="where-dropdown">
              <div className="where-dropdown-header">Popular Searches</div>
              <div className="where-selection" onClick={() => { setDestination("California"); history.push(`/search/indonesia/${guests}`) }}>
                <img className='dropdown-clock' src={clock}></img>
                <div className="where-destination-outer">
                  <div className="where-destination-header">California · Stays</div>
                  <div className="where-destination-date">Any week</div>
                </div>
              </div>
              <div className="where-selection" onClick={() => { setDestination("Florida"); history.push(`/search/thailand/${guests}`) }}>
                <img className='dropdown-clock' src={clock}></img>
                <div className="where-destination-outer">
                  <div className="where-destination-header">Florida · Stays</div>
                  <div className="where-destination-date">Any week</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="searchBar-outer searchBar-hidden">
          <label className="searchBar-label">Check In</label>
          <input
            type='date'
            className='searchBar-input-date'
            min={new Date().toISOString().split('T')[0]}
            value={new Date(checkIn).toISOString().slice(0, 10)}
            onChange={(e) => setCheckIn(new Date(e.target.value).toISOString().slice(0, 10))}
          />
        </div>
        <div className="searchBar-outer searchBar-hidden">
          <label className="searchBar-label">Check Out</label>
          <input
            type='date'
            className='searchBar-input-date'
            min={new Date().toISOString().split('T')[0]}
            value={new Date(checkOut).toISOString().slice(0, 10)}
            onChange={(e) => setCheckOut(new Date(e.target.value).toISOString().slice(0, 10))}
          />
        </div>
        <div className="searchBar-outer searchBar-hidden">
          <label className="searchBar-label">Who</label>
          <div className="searchBar-guests-outer">
            <button type='button' onClick={() => { if (guests > 0) setGuests(guests - 1) }} disabled={guests === 0} className='searchBar-guests-minus'>-</button>
            {guests}
            <button type='button' onClick={() => setGuests(guests + 1)} disabled={guests === 16} className='searchBar-guests-plus'>+</button>
          </div>
        </div>
        <div>
          <button type='submit' className='searchBar-button'><img src={searchIcon} className='searchBar-glass' alt='search'></img></button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar
