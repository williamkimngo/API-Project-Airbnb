import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {actionUpdateSpot, getOneSpot } from "../../store/spots"
import './editSpot.css'

const EditSpotForm = ({listingId, returnToListing}) => {
   const dispatch = useDispatch()
   const currentSpot = useSelector(state => state.spots.specificSpot)
   const currentSpotArr = Object.values(currentSpot)

   const [spotId, setSpotId] = useState(listingId)
  const [ownerId, setOwnerId] = useState(currentSpot.Owner.id)

  const [address, setAddress] = useState(currentSpot.address)
  const [city, setCity] = useState(currentSpot.city)
  const [state, setState] = useState(currentSpot.state)
  const [country, setCountry] = useState(currentSpot.country)
  const [lat, setLat] = useState(currentSpot.lat)
  const [lng, setLng] = useState(currentSpot.lng)
  const [name, setName] = useState(currentSpot.name)
  const [description, setDescription] = useState(currentSpot.description)
  const [price, setPrice] = useState(currentSpot.price)
  const [errors, setErrors] = useState([]);
  const [disableButton, setDisableButton] = useState(false)

  useEffect(() => {
   const errors = [];
   if (name.trim().length < 10) errors.push("Title must be between 10 and 50 characters")
   if (address.trim().length < 6) errors.push("Valid address required")
   if (city.trim().length < 4) errors.push("Valid city required")
   if (state.trim().length < 4) errors.push("Valid state required")
   if (country.trim().length < 4) errors.push("Valid country required")
   if (lat === "" || lat > 90 || lat < -90) errors.push("Latitude must be between - 90 to 90")
   if (lng === "" || lng > 180 || lng < -180) errors.push("Longitude must be between - 180 to 180")
   if (description.trim().length < 10) errors.push("Description required between 10 and 1000 characters")
   if (price > 1000000 || price < 1) errors.push("Price must be between $1 and $1,000,000")

   if (errors.length > 0) {
     setErrors(errors)
     setDisableButton(true)
   } else {
     setErrors([])
     setDisableButton(false)
   }

 }, [name, address, city, state, country, lat, lng, description, price])
 const handleSubmit = async (e) => {
   e.preventDefault()

   const roomData = {
     spotId,
     ownerId,
     address,
     city,
     state,
     country,
     lat,
     lng,
     name,
     description,
     price,
   }
   const response = await dispatch(actionUpdateSpot(roomData))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors)
          if (data) {
            const errors = Object.values(data.errors)
            setErrors(errors)
          }
      })

    if (response) {
      dispatch(getOneSpot(listingId))
      return returnToListing()
    }
  }
  return (
   <div className="edit-listing-page">
     <div className="return-div">
       <button onClick={returnToListing} className="return-to-listing-button">Return to Listing</button>
     </div>
     <div className="edit-listing-header">Edit your Listing</div>
     <form onSubmit={handleSubmit} className="edit-listing-form">
       <div>
         <label className="edit-listing-title">Edit your Title</label>
       </div>
       <input
         type="text"
         className="edit-listing-input title-input"
         value={name}
         onChange={e => setName(e.target.value)}
         maxLength={50}
         required
       />
       <div className="edit-listing-label">
         <label>Update your Location</label>
       </div>
       <div className="edit-listing-address">
         <input
           type="text"
           className="edit-listing-input address-input"
           value={address}
           onChange={e => setAddress(e.target.value)}
           required
           maxLength={100}
         />
       </div>
       <div className="edit-listing-location">
         <div>
           <input
             type="text"
             className="edit-listing-input city-state-country"
             value={city}
             onChange={e => setCity(e.target.value)}
             required
             maxLength={50}
           />
         </div>
         <div>
           <input
             type="text"
             className="edit-listing-input city-state-country"
             value={state}
             onChange={e => setState(e.target.value)}
             required
             maxLength={50}
           />
         </div>
         <div>
           <input
             type="text"
             className="edit-listing-input city-state-country"
             value={country}
             onChange={e => setCountry(e.target.value)}
             required
             maxLength={50}
           />
         </div>
       </div>

       <div className="edit-listing-coordinates">
         <div>
           <div className="edit-listing-lat">
             <label>Latitude</label>
           </div>
           <input
             type="number"
             className="edit-listing-input lat"
             value={lat}
             onChange={e => setLat(e.target.value)}
           />
         </div>
         <div>
           <div className="edit-listing-lng">
             <label>Longitude</label>
           </div>
           <input
             type="number"
             className="edit-listing-input lng"
             value={lng}
             onChange={e => setLng(e.target.value)}
           />
         </div>
       </div>
       <div>
         <div className="edit-listing-label">
           <label>Update your Description</label>
         </div>
         <textarea
           value={description}
           className="edit-listing-input description"
           onChange={e => setDescription(e.target.value)}
           required
           maxLength={1000}
         ></textarea>
       </div>
       <div>
         <div className="edit-listing-label">
           <label>Price per Night</label>
         </div>
         <input
           type="number"
           value={price}
           className="edit-listing-input price-input"
           onChange={e => setPrice(e.target.value)}
           required
           min={1}
           max={100000}
         />
       </div>
       {errors.length > 0 && (<ul>
         {errors.map((error, i) => <li key={i} className='update-error'>{error}</li>)}
       </ul>)}
       <button type="submit" disabled={disableButton} className="update-listing-button">Confirm</button>
     </form>
   </div >
 )
}

export default EditSpotForm
