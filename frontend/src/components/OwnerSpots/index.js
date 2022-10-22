import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
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
    // if(!userReviews.length){
    //     return null
    // }


    // console.log("ALLSPOTS!!!!!", allSpots)
    const spots = allSpots?.filter(spot => spot.ownerId === sessionUser.id)
    let noOwnedSpots = false;
    let noOwnedReviews = false;

    if(spots.length === 0) noOwnedSpots = true;
    if(noOwnedReviews.length === 0) noOwnedReviews = true;
    // console.log("SPOTS!!!!!!!!!", spots)
    // <img className="current-spot-img" src={spot.previewImage} alt='Loading'/>

    // console.log("ALLSPOTS!!",allSpots)
    // console.log("SESSIONUSEWR!!!", sessionUser)
    return (
        <div className="Owner-spot-container">
            <h1>Account</h1>
            <div className="info">
            <span className="info-name">Hello {sessionUser?.firstName} {sessionUser?.lastName}!</span>
            </div>
            <div className="intro"> Please review your current listings and reviews.</div>

            <h2>Your Current Listings</h2>
            {spots.length < 1 && (<h4 className="not-owned">You currently do not own any spots.</h4>)}
            <ul className="current-listings">

                {spots?.map(spot => (

                    <li key={spot?.id}>
                        <div className="Spot-card-owner">
                        <SpotCard key={spot.id} spot={spot}/>



                    <button className="edit-button">

                     <Link className="edit" to={`/spots/${spot.id}/edit`}>Edit Listing</Link></button>

                    <button className="delete-button" onClick={() => dispatch(actionDeleteSpot(spot.id))}>Delete Listing</button>
                    </div>
                 </li>
                ))}
            </ul>
            <h2>Your Current Reviews</h2>
            {userReviews < 1 && <h4>You currently do not have any reviews.</h4>}
            <ul className="current-reviews">
                {userReviews?.map(review => (

                    <li className="review-li" key={review.id}> <div>{review.stars}★<Link className="link" to={`/spots/${review.spotId}`}>🔗{allSpots[review.spotId - 1]?.name}</Link></div>
                    <div className="review">{review.review}</div>
                    <div className="del-button">
                    <button className="delete-button-review" onClick={() => dispatch(actionDeleteReview(review.id))} > Delete Review</button></div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default OwnerSpots
