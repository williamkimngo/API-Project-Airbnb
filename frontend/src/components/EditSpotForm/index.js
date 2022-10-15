import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { actionDeleteSpot, actionUpdateSpot, getOneSpot } from "../../store/spots"


const EditSpotForm = ({spots}) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()
    const {spotId} = useParams()
    console.log("THIS is SPOTID", spotId)
    const targetSpot = useSelector(state => state.spots.allSpots[spotId])
    console.log("THIS IS targetSpot", targetSpot)
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
    const [validationErrors, setValidationErrors] = useState([])
   useEffect(() => {
      dispatch(getOneSpot(spotId))
   }, [spotId, dispatch])

   useEffect(()=> {
      let errors = [];

        if (!(Number(price) > 0)) {
            errors.push('please provide a valide price!')
        }
        if (!(Number(lat) > -90) && !(Number(lat) < 90)) {
            errors.push('please provide a valide latitude!')
        }
        if (!(Number(lng) > -180) && !(Number(lng) < 180)) {
            errors.push('please provide a valide Longitude!')
        }
        // console.log(typeof price)
        setValidationErrors(errors)
    }, [price, lat, lng])
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
        if (validationErrors.length || errors.length){
         return
        }
        setErrors([])
        if(editedSpot){
            history.push(`/spots/${spotId}`)
        }
    }

    const handleDelete = async (e) => {
      e.preventDefault()
      let deletedSpot = await dispatch(actionDeleteSpot(spotId))
      history.push('/')
    }
    return (
      <div>
        <form className='Edit-Spot-Form' onSubmit={handleSubmit}>
        <h2>Edit a Spot</h2>
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
           onChange={(e) => setCity(e.target.value)}

           />
        </label>

        <label>
           State
           <input
           type='text'
           value={state}
           onChange={(e) => setState(e.target.value)}

           />
        </label>

        <label>
           Country
           <input
           type='text'
           value={country}
           onChange={(e) => setCountry(e.target.value)}

           />
        </label>

        <label>
           Latitude
           <input
           type='number'
           value={lat}
           onChange={(e) => setLat(Number(e.target.value))}

           />
        </label>

        <label>
           Longitude
           <input
           type='number'
           value={lng}
           onChange={(e) => setLng(Number(e.target.value))}

           />
        </label>

        <label>
           Name
           <input
           type='text'
           value={name}
           onChange={(e) => setName(e.target.value)}

           />
        </label>

        <label>
           Description
           <textarea
           type='text'
           value={description}
           onChange={(e) => setDescription(e.target.value)}

           />
        </label>

        <label>
           Price
           <input
           type='number'
           value={price}
           onChange={(e) => setPrice(Number(e.target.value))}

           />
        </label>

        <button type="submit">Edit Spot</button>
     </form>

   <button onClick={handleDelete}>DELETE THIS SPOT!</button>
   </div>

    )
}

export default EditSpotForm
