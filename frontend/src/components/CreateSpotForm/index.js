import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { actionAddSpot } from "../../store/spots"

const CreateSpotForm = () => {
   const dispatch = useDispatch()
   const history = useHistory()
   const sessionUser = useSelector(state => state.session.user)
   const [address, setAddress] = useState('')
   const [city, setCity] = useState("");
   const [state, setState] = useState("");
   const [country, setCountry] = useState("");
   const [lat, setLat] = useState(0);
   const [lng, setLng] = useState(0);
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState(0);
   const [errors, setErrors] = useState([]);
   const [validationErrors, setValidationErrors] = useState([]);

   const handleSubmit = async (e) => {
      e.preventDefault()
      if (validationErrors.length) {
         return
      }
      setErrors([]);
      setValidationErrors([]);
      const payload = {
         address,
         city,
         state,
         country,
         lat,
         lng,
         name,
         description,
         price
      }

      let createdSpot = dispatch(actionAddSpot(payload))
         .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
         });
      if (createdSpot && !errors.length) {
         history.push('/current');
      }
   }
   return (
      <form className="Create-Spot-Form-container" onSubmit={handleSubmit}>
         <h2>Create a Spot</h2>
         {!sessionUser && <span>Please login or signup to host your Stadium.</span>}
         <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
         </ul>
         <label>
            Address
            <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            />
         </label>
         <label>
            City
            <input
               type='text'
               value={city}
               onChange={e => setCity(e.target.value)}

            />
         </label>

         <label>
            State
            <input
               type='text'
               value={state}
               onChange={e => setState(e.target.value)}

            />
         </label>

         <label>
            Country
            <input
               type='text'
               value={country}
               onChange={e => setCountry(e.target.value)}

            />
         </label>

         <label>
            Latitude
            <input
               type='number'
               value={lat}
               onChange={e => setLat(Number(e.target.value))}

            />
         </label>

         <label>
            Longitude
            <input
               type='number'
               value={lng}
               onChange={e => setLng(Number(e.target.value))}

            />
         </label>

         <label>
            Name
            <input
               type='text'
               value={name}
               onChange={e => setName(e.target.value)}

            />
         </label>

         <label>
            Description
            <textarea
               type='text'
               value={description}
               onChange={e => setDescription(e.target.value)}

            />
         </label>

         <label>
            Price
            <input
               type='number'
               value={price}
               onChange={e => setPrice(Number(e.target.value))}

            />
         </label>

         <button type="submit" disabled={sessionUser ? false: true}>Create Spot</button>

      </form>
   )
}


export default CreateSpotForm
