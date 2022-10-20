import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { actionDeleteReview, actionGetUserReview } from "../../store/reviews"
import { actionDeleteSpot, getCurrentUserSpots, getSpots } from "../../store/spots"
import './ownerSpot.css'
import SpotCard from "../SpotCard"

const OwnerSpots = () => {
    const dispatch = useDispatch()
    const allSpots = useSelector(state => Object.values(state.spots.allSpots))

    const sessionUser = useSelector(state => state.session.user)
    const userReviews = useSelector(state => Object.values(state.reviews.user))


    useEffect(() => {
        dispatch(getSpots())
        dispatch(actionGetUserReview())
        // dispatch(getCurrentUserSpots())
    }, [dispatch])
    if(!allSpots.length){
        return null
    }
    if(!Object.keys(sessionUser).length){
        return null
    }
    if(!userReviews.length){
        return null
    }

    // console.log("ALLSPOTS!!!!!", allSpots)
    const spots = allSpots.filter(spot => spot.ownerId === sessionUser.id)
    // console.log("SPOTS!!!!!!!!!", spots)
    // <img className="current-spot-img" src={spot.previewImage} alt='Loading'/>
    if (spots.length === 0) {
        return null
    }
    console.log("ALLSPOTS!!",allSpots)
    return (
        <div className="Owner-spot-container">
            <h1>Account</h1>
            <div className="info">
            <span className="info-name">{sessionUser.firstName}</span>
            <span className="info-name"> {sessionUser.lastName},</span>
            <span> {sessionUser.email} </span>
            </div>

            <h2>Current Listings</h2>
            <ul className="current-listings">

                {spots?.map(spot => (

                    <li key={spot.id}>
                        <div className="Spot-card-owner">
                        <SpotCard key={spot.id} spot={spot}/>



                    <button className="delete-button">
                     <Link className="edit" to={`/spots/${spot.id}/edit`}>Edit Listing</Link></button>

                    <button className="delete-button" onClick={() => dispatch(actionDeleteSpot(spot.id))}>Delete Listing</button>
                    </div>
                 </li>
                ))}
            </ul>
            <h2>Your Current Reviews</h2>
            <ul className="current-reviews">
                {userReviews.map(review => (
                    <li key={review.id}>{review.stars}★<Link className="link" to={`/spots/${review.spotId}`}>{allSpots[review.spotId].name}</Link>
                    <div className="review">{review.review}</div>
                    <div className="del-button">
                    <button className="delete-button" onClick={() => dispatch(actionDeleteReview(review.id))} > Delete Review</button></div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default OwnerSpots
