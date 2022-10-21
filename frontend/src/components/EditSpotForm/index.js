import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import {actionUpdateSpot, getOneSpot } from "../../store/spots"
import './editSpot.css'


const EditSpotForm = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()
    const {spotId} = useParams()
   //  console.log("THIS is SPOTID", spotId)
    const targetSpot = useSelector(state => state.spots.allSpots[spotId])
   //  console.log("THIS IS targetSpot", targetSpot)
   //  const specificSpot = targetSpot[spotId]
   //  console.log("THIS IS SPECFIC", specificSpot)
   //  const targetSpot = targetSpot.spotId
   // console.log("This is specific spot", targetSpot)
   // console.log("BLAH ADDRESS", targetSpot.address)
    const [address, setAddress] = useState(targetSpot?.address)
    const [city, setCity] = useState(targetSpot?.city);
    const [state, setState] = useState(targetSpot?.state);
    const [country, setCountry] = useState(targetSpot?.country);
    const [lat, setLat] = useState(targetSpot?.lat);
    const [lng, setLng] = useState(targetSpot?.lng);
    const [name, setName] = useState(targetSpot?.name);
    const [description, setDescription] = useState(targetSpot?.description);
    const [price, setPrice] = useState(targetSpot?.price);
    const [errors, setErrors] = useState([])
   //  const [validationErrors, setValidationErrors] = useState([])
   useEffect(() => {
      dispatch(getOneSpot(spotId))
   }, [spotId, dispatch])

   // useEffect(()=> {
   //    let errors = [];

   //      if (!(Number(price) > 0)) {
   //          errors.push('please provide a valide price!')
   //      }
   //      if (!(Number(lat) > -90) && !(Number(lat) < 90)) {
   //          errors.push('please provide a valide latitude!')
   //      }
   //      if (!(Number(lng) > -180) && !(Number(lng) < 180)) {
   //          errors.push('please provide a valide Longitude!')
   //      }
   //      // console.log(typeof price)
   //      setValidationErrors(errors)
   //  }, [price, lat, lng])
    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            // id: spotId,
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

        let editedSpot = await dispatch(actionUpdateSpot(payload, spotId))
        .catch(async (res) => {
         const data = await res.json();
         if (data && data.errors) {
            setErrors(data.errors)
         }
         });

        if(editedSpot){
            history.push('/current')
        }
    }

    return (
      <div className="Edit-Spot-Container">
        <form className='Edit-Spot-Form' onSubmit={handleSubmit}>
        <h2>Edit a Spot</h2>
        <ul className="error">
        {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label><div className="title">
         Address
        </div>

           <input
           type='text'
           value={address}
           onChange={(e) => setAddress(e.target.value)}
           placeholder="Address"

           />
        </label>

        <label><div className="title">
           City</div>
           <input
           type='text'
           value={city}
           onChange={(e) => setCity(e.target.value)}

           />
        </label>

        <label><div className="title">
           State</div>
           <input
           type='text'
           value={state}
           onChange={(e) => setState(e.target.value)}

           />
        </label>

        <label><div className="title">
           Country</div>
           <input
           type='text'
           value={country}
           onChange={(e) => setCountry(e.target.value)}

           />
        </label>

        <label><div  className="title">
           Name</div>
           <input
           type='text'
           value={name}
           onChange={(e) => setName(e.target.value)}

           />
        </label>

        <label><div className="title">
           Description</div>
           <textarea
           type='text'
           value={description}
           onChange={(e) => setDescription(e.target.value)}

           />
        </label>

        <label><div className="title">
           Price</div>
           <input
           type='number'
           value={price}
           onChange={(e) => setPrice(Number(e.target.value))}

           />
        </label>

        <button type="submit">Edit Spot</button>
     </form>
   </div>

    )
}

export default EditSpotForm
