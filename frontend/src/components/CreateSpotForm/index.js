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
    const [url, setUrl] = useState("");
    const [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
      let errors = [];

      if (!url.includes('.com') && !url.includes('.jpg') && !url.includes('.png') && !url.includes('.jpeg')) {
        errors.push('please provide a valide image URL!')
      }
      if (!(Number(price) > 0)) {
        errors.push('please provide a valide price!')
      }
      if (!(Number(lat) > -90) && !(Number(lat) < 90)) {
        errors.push('please provide a valide latitude!')
      }
      if (!(Number(lng) > -180) && !(Number(lng) < 180)) {
        errors.push('please provide a valide Longitude!')
      }
      setValidationErrors(errors)
    }, [url, price, lat, lng])

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

        let createdSpot = await dispatch(actionAddSpot(payload))
        if(createdSpot){
            history.push('/')
        }

    }
    return(
        <form className="Create-Spot-Form" onSubmit={handleSubmit}>
            <h2>Create a Spot(change later)</h2>
            <label> Address </label>
            <input
            type={'text'}
            value={address}
            onChange={e => setAddress(e.target.value)}
            />
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

         <button type="submit">Create Spot</button>

        </form>
    )
}


export default CreateSpotForm
