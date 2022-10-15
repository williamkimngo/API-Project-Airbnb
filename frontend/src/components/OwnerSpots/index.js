import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { actionDeleteSpot, getSpots } from "../../store/spots"

const OwnerSpots = () => {
    const dispatch = useDispatch()
    const allSpots = useSelector(state => Object.values(state.spots.allSpots))
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    const spots = allSpots.filter(spot => spot.ownerId === sessionUser.id)
    if (!spots) {
        return null
    }
    return (
        <div className="Owner-spot-container">
            <h1>{sessionUser.username}</h1>
            <h2>Current Listings</h2>
            <ul>
                {spots.map(spot => (
                    <li key={spot.id}>{spot.name}
                    <Link to={`/spots/${spot.id}/edit`}>Edit Listing</Link>
                    <button onClick={() => dispatch(actionDeleteSpot(spot.id))}>Delete Listing</button>
                        </li>
                ))}
            </ul>
        </div>
    )
}

export default OwnerSpots
