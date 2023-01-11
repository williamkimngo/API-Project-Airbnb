import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { actionAddSpot, actionAddImageUrl } from "../../store/spots"
import SpotDetail from "../SpotDetail"
import './createForm.css'

const CreateSpotForm = () => {
   const dispatch = useDispatch()
   const history = useHistory()

   const sessionUser = useSelector(state => state.session.user)
   const [address, setAddress] = useState('')
   const [city, setCity] = useState("");
   const [state, setState] = useState("");
   const [country, setCountry] = useState("");
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [img, setImg] = useState("")
   const [lat, setLat] = useState("")
   const [lng, setLng] = useState("")
   // const [hasSubmit, setHasSubmit] = useState("")
   const [errors, setErrors] = useState([]);
   const [validationErrors, setValidationsErrors] = useState([])

   const handleSubmit = async (e) => {
      e.preventDefault()

      let errors = []
      if(errors.length > 0) {
         return
      }
      if (!/^https?:\/\/.+\.(jpg|jpeg|png|JPG|JPEG|PNG|gif)$/.test(img)) errors.push('Image must be a proper link that starts with https:// and ends with jpg, jpeg, png')

      setValidationsErrors(errors)
      setErrors([]);
      const payload = {
         name,
         address,
         city,
         state,
         country,
         description,
         price,
         lng,
         lat,
      }
      const payloadImg = {
         url: img,
         preview: true
      }

      let createdSpot ={}
      if (!errors.length){
         createdSpot = await dispatch(actionAddSpot(payload))
            .catch(async (res) => {
               const data = await res.json();

               if (data && data.errors) setErrors(data.errors);
            })
         }



      if (createdSpot && !errors.length) {
         let newImg = await dispatch(actionAddImageUrl(payloadImg, createdSpot.id))
         .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors)
         })
      }


      if (createdSpot && !errors.length) {
         history.push('/current');
      }
   }

   let allErrors = [...errors, ...validationErrors]

   return (
      <div className="Create-Spot-Form-container">
         <form className="form-wrap" onSubmit={handleSubmit}>
            <h2>Create Your Listing</h2>
            {!sessionUser && <span className="no-user-error">Please login or signup to host your Stadium/Arena.</span>}

            <ul className="error-list">
               {allErrors?.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>

            <label>

               <input
                  placeholder="Name"
                  type='text'
                  value={name}
                  onChange={e => setName(e.target.value)}

               />
            </label>
            <label>

               <input
                  placeholder="Address"
                  type='text'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
               />
            </label>
            <label>

               <input
                  placeholder="City"
                  type='text'
                  value={city}
                  onChange={e => setCity(e.target.value)}

               />
            </label>

            <label>
               <input
                  placeholder="State"
                  type='text'
                  value={state}
                  onChange={e => setState(e.target.value)}

               />
            </label>

            <label>

               <input
                  placeholder="Country"
                  type='text'
                  value={country}
                  onChange={e => setCountry(e.target.value)}

               />
            </label>


            <label>

               <textarea
                  placeholder="Description"
                  type='text'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  style= {{resize: "none", fontFamily: "Helvetica"}}
               />
            </label>

            <label>

               <input
                  placeholder="Price"
                  type='number'
                  value={price}
                  onChange={e => setPrice(e.target.value)}

               />
            </label>
            <label>

               <input
                  placeholder="Latitude"
                  type='text'
                  value={lat}
                  onChange={e => setLat(e.target.value)}

               />
            </label>
            <label>

               <input
                  placeholder="Longitude"
                  type='text'
                  value={lng}
                  onChange={e => setLng(e.target.value)}

               />
            </label>
            <label>
               <input
                  placeholder="Image URL"
                  type='text'
                  value={img}
                  onChange={e => setImg(e.target.value)}
                  required
               />
            </label>

            <button type="submit" disabled={sessionUser ? false : true}>Create Spot</button>

         </form>
      </div>
   )
}


export default CreateSpotForm
