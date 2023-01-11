import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSpots } from "../../store/spots";
import SearchMap from "./SearchMap";
import './SearchResults.css'

function SearchResults() {
  let { destination } = useParams()


  const dispatch = useDispatch()
  const allSpot = useSelector(state => state.spots.allSpots)

  const allSpotArr = Object.values(allSpot)

  useEffect(() => {
    dispatch(getSpots())
  }, [])

  const searchRooms = allSpotArr.filter(room => {
    destination = destination.toLowerCase()
    return room.city.toLowerCase().includes(destination) || room.state.toLowerCase().includes(destination) || room.country.toLowerCase().includes(destination)
  })

  return (
    <>
      <div className="search-rooms-main">
        <div className="search-rooms-left">
          {searchRooms.length > 0 ? <>
            {searchRooms?.map((room, i) => {

                // let sum = 0;
                // const reviews = room
                return (
                  <Link to={`/spots/${room?.id}`} className="room-link" key={room?.id}>
                    <div className={`search-room-outer`}>
                      <div className="search-room-img-outer">
                        <img className="search-room-img" src={`${room?.previewImage}`} alt="preview of room"></img>
                      </div>
                      <div className="search-room-detail">
                        <div className="search-room-info">
                          <div className="search-room-city-state">{`${room?.city}, ${room?.state}`}</div>
                          <div className="room-price-night">
                            <div className="room-price">{`$${room?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
                            <span className="room-night">night</span>
                          </div>
                        </div>
                        <div className="room-rating">
                          <div className="star-icon">
                            <i className="fa-solid fa-star star-design"></i>
                            <div className="number-rating">
                              {room?.avgRating != 0 ? room?.avgRating : "New"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )

            })} </> : <div className="no-search-results">0 search results matching "{destination}".</div>
          }
        </div>
        <div className="search-rooms-right">
          <SearchMap searchRooms={searchRooms} />
        </div>
      </div>
    </>
  )
}

export default SearchResults
