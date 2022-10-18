import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { actionAddSpot, actionAddImageUrl } from "../../store/spots"
import SpotDetail from "../SpotDetail"

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
   const [url, setUrl] = useState("")
   const [img, setImg] = useState("")
   const [errors, setErrors] = useState([]);
   const [validationErrors, setValidationErrors] = useState([]);

   // useEffect(() => {
   //    let errors = []
   //    if (!url.includes('.com') && !url.includes('.jpg') && !url.includes('.png') && !url.includes('.jpeg')) {
   //       errors.push('please provide a valide image URL!')
   //     }
   //     setValidationErrors(errors)
   // }, [url])
   const handleSubmit = async (e) => {
      console.log("IMAGWEEEE", img)
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
      const payloadImg = {
         url: img,
         preview: true
      }
      // console.log("PAYLOADSPOT!", payload)
      let createdSpot = await dispatch(actionAddSpot(payload))
         .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
         });
         // console.log("PAYLOAD!!!!", payloadImg)
         // console.log("CREATESDSPOT", createdSpot)
         // console.log("CREATEDSPOTID!!!!", createdSpot.id)

      if(createdSpot){
         let newImg = await dispatch(actionAddImageUrl(payloadImg, createdSpot.id)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors)
          })
      }


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
            <input
              placeholder="Latitude"
               type='number'
               value={lat}
               onChange={e => setLat(Number(e.target.value))}

            />
         </label>

         <label>
            <input
              placeholder="Longitude"
               type='number'
               value={lng}
               onChange={e => setLng(Number(e.target.value))}

            />
         </label>

         <label>

            <input
            placeholder="Name"
               type='text'
               value={name}
               onChange={e => setName(e.target.value)}

            />
         </label>

         <label>

            <textarea
            placeholder="Description"
               type='text'
               value={description}
               onChange={e => setDescription(e.target.value)}

            />
         </label>

         <label>

            <input
            placeholder="Price"
               type='number'
               value={price}
               onChange={e => setPrice(Number(e.target.value))}

            />
         </label>
         <label>
            <input
             placeholder="Image URL"
             type='text'
             value={img}
             onChange={e => setImg(e.target.value)}
            />
         </label>

         <button type="submit" disabled={sessionUser ? false: true}>Create Spot</button>

      </form>
   )
}


export default CreateSpotForm
