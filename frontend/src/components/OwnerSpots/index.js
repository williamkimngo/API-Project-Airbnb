import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { actionDeleteReview, actionGetUserReview } from "../../store/reviews"
import { actionDeleteSpot, getSpots } from "../../store/spots"

const OwnerSpots = () => {
    const dispatch = useDispatch()
    const allSpots = useSelector(state => Object.values(state.spots.allSpots))
    const sessionUser = useSelector(state => state.session.user)
    const userReviews = useSelector(state => Object.values(state.reviews.user))

    useEffect(() => {
        dispatch(getSpots())
        dispatch(actionGetUserReview)
    }, [dispatch])

    const spots = allSpots.filter(spot => spot.ownerId === sessionUser.id)
    // if (!spots) {
    //     return null
    // }
    return (
        <div className="Owner-spot-container">
            <h1>{sessionUser.username}</h1>
            <h2>Current Listings</h2>
            <ul>
                {spots?.map(spot => (
                    <li key={spot.id}>
                    <NavLink key={spot.id} to={`/spots/${spot.id}`}>{spot.name}</NavLink>
                    <Link to={`/spots/${spot.id}/edit`}>Edit Listing</Link>
                    <button onClick={() => dispatch(actionDeleteSpot(spot.id))}>Delete Button</button>
                 </li>
                ))}
            </ul>
            <h2>Your Current Reviews</h2>
            <ul>
                {userReviews.map(review => (
                    <li key={review.id}>{review.review}{review.rating}
                    <button onClick={() => dispatch(actionDeleteReview(review.id))} > Delete Review</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default OwnerSpots