import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { actionUpdateSpot, getSpots } from "../../store/spots"


const EditSpotForm = ({spots}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {spotId} = useParams()
   //  const pokemon = useSelector(state => state.pokemon[pokemonId]);
    useEffect(() => {
      dispatch(getSpots())
    }, [dispatch])
    console.log("THIS is SPOTID", spotId)
    const targetSpot = useSelector(state => state.spots.allSpots[spotId])
    
    console.log("THIS IS SPOTSOBJ", targetSpot)
   //  const targetSpot = targetSpot.spotId
   // console.log("This is specific spot", targetSpot)
    const [address, setAddress] = useState(targetSpot.address)
    const [city, setCity] = useState(targetSpot.city);
    const [state, setState] = useState(targetSpot.state);
    const [country, setCountry] = useState(targetSpot.country);
    const [lat, setLat] = useState(targetSpot.lat);
    const [lng, setLng] = useState(targetSpot.lng);
    const [name, setName] = useState(targetSpot.name);
    const [description, setDescription] = useState(targetSpot.description);
    const [price, setPrice] = useState(targetSpot.price);

    const handleSubmit = (e) => {
        e.preventDefault()

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

        let editedSpot = dispatch(actionUpdateSpot(payload, targetSpot.id))
        if(editedSpot){
            history.push('/')
        }
    }
    return (
        <form className='Create-Spot-Form' onSubmit={handleSubmit}>
        <h2>Create a Spot</h2>
        <label>
           Address
           <input
           type='text'
           value={address}
           onChange={(e) => setAddress(e.target.value)}
           required
           />
        </label>

        <label>
           City
           <input
           type='text'
           value={city}
           onChange={(e) => setCity(e.target.value)}
           required
           />
        </label>

        <label>
           State
           <input
           type='text'
           value={state}
           onChange={(e) => setState(e.target.value)}
           required
           />
        </label>

        <label>
           Country
           <input
           type='text'
           value={country}
           onChange={(e) => setCountry(e.target.value)}
           required
           />
        </label>

        <label>
           Latitude
           <input
           type='number'
           value={lat}
           onChange={(e) => setLat(Number(e.target.value))}
           required
           />
        </label>

        <label>
           Longitude
           <input
           type='number'
           value={lng}
           onChange={(e) => setLng(Number(e.target.value))}
           required
           />
        </label>

        <label>
           Name
           <input
           type='text'
           value={name}
           onChange={(e) => setName(e.target.value)}
           required
           />
        </label>

        <label>
           Description
           <textarea
           type='text'
           value={description}
           onChange={(e) => setDescription(e.target.value)}
           required
           />
        </label>

        <label>
           Price
           <input
           type='number'
           value={price}
           onChange={(e) => setPrice(Number(e.target.value))}
           required
           />
        </label>

        <button type="submit">Edit Spot</button>
     </form>
    )
}

export default EditSpotForm
