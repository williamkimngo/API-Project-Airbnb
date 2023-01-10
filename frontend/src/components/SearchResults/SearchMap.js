import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import './SearchMap.css'
import { getAPIKey } from '../../store/maps'
import mapOptions from '../Maps/MapStyle'
import priceMarker from './price-marker.png'
import selectedPriceMarker from './selected-price-marker.png'

const SearchMap = ({ searchRooms }) => {
  let { destination } = useParams()
  let { guests } = useParams()
  const dispatch = useDispatch()
  const APIKey = useSelector(state => state.map.APIKey)
  const [map, setMap] = useState(null)
  const [zoom, setZoom] = useState(5)
  const [midLat, setMidLat] = useState(0)
  const [midLng, setMidLng] = useState(0)
  const [selected, setSelected] = useState({})
  const [selectedId, setSelectedId] = useState()


  useEffect(() => {
    dispatch(getAPIKey())

    if (searchRooms.length > 0) {

      const allLats = searchRooms?.map((room) => room.lat)
      const allLngs = searchRooms?.map((room) => room.lng)

      const maxLat = Math.max(...allLats)
      const minLat = Math.min(...allLats)
      const maxLng = Math.max(...allLngs)
      const minLng = Math.min(...allLngs)

      const avgLat = (maxLat + minLat) / 2
      const avgLng = (maxLng + minLng) / 2

      setMidLat(avgLat)
      setMidLng(avgLng)
    }

    if (searchRooms?.length > 15) {
      setZoom(2)
    } else {
      setZoom(5)
    }

    if (destination === 'indonesia') setZoom(9)

  }, [destination, guests])

  // useEffect(() => {
  //   if (map) {
  //     const bounds = new window.google.maps.LatLngBounds();
  //     searchRooms.map(marker => {
  //       bounds.extend({
  //         lat: marker.lat,
  //         lng: marker.lng,
  //       });
  //     });
  //     map.fitBounds(bounds);
  //   }
  // }, [map]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: APIKey,
    id: 'google-maps-script'
  })

  // const onLoad = React.useCallback((map) => setMap(map), []);

  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  const center = {
    lat: Number(midLat),
    lng: Number(midLng)
  };

  // const bounds = {
  //   north: maxLng,
  //   south: minLng,
  //   east: maxLat,
  //   west: minLat
  // }

  return (
    <div className='search-google-map-outer'>
      {isLoaded &&
        (<GoogleMap
          // onLoad={onLoad}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          options={{
            styles: mapOptions,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            scrollwheel: true,
            clickableIcons: false
            // restriction: {
            //   latLngBounds: bounds,
            //   strictBounds: false
            // }
          }}
        >
          {searchRooms.map((room) => {
            return (
              <>
                <Marker
                  position={{
                    key: room.id,
                    lat: Number(room.lat),
                    lng: Number(room.lng)
                  }}
                  onClick={() => { setSelected(room); setSelectedId(room.id) }}
                  label={{ text: `$${room.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, color: room.id === selectedId ? 'white' : 'black' }}
                  icon={{
                    url: room.id === selectedId ? selectedPriceMarker : priceMarker,
                    scaledSize: { width: 60, height: 26 },
                    anchor: { x: 20, y: 0 },
                  }}
                />
              </>
            )
          })}
          {selected.id &&
            (<InfoWindow
              position={{
                lat: Number(selected.lat),
                lng: Number(selected.lng)
              }}
              onCloseClick={() => { setSelected({}); setSelectedId(0) }}
            >
              <div className='selected-room-info'>
                <Link to={`/rooms/${selected?.id}`}>
                  <img src={selected?.images[0]?.url} className='selected-room-img'></img>
                </Link>
                <div>
                  <div className='selected-room-name'>{selected?.name}</div>
                  <div><span className='selected-room-price'>{`$${selected?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span> <span>night</span></div>
                </div>
              </div>
            </InfoWindow>
            )}
        </GoogleMap>
        )}
    </div>
  )
}

// React.memo prevents rerenders if props are unchanged
export default React.memo(SearchMap)
