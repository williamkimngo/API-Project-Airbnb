import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, NavLink } from "react-router-dom"
import { actionGetSpotReview } from "../../store/reviews"
import { getOneSpot } from "../../store/spots"

const SpotDetail = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    let currentSpot = useSelector(state => state.spots.specificSpot)
    const spotReview = useSelector(state => Object.values(state.reviews.spot))

    useEffect(() => {
        dispatch(getOneSpot(spotId))
        dispatch(actionGetSpotReview(spotId))
    }, [dispatch, spotId])

    if(!currentSpot || !spotReview){
        return null
    }

    let allowCreate = false
    if(sessionUser){
        let ownerReview = spotReview.find(review => review.userId === sessionUser.id)
        if((sessionUser.id !==specificSpot.ownerId) && !ownerReview){
            allowCreate = true
        }
    }

    return (
        <div className="Spot-Detail-container">
            <h1>{currentSpot.name}</h1>
            <div className="title-container">
                <span> &#9733; </span>
                <span> {currentSpot.avgStarRating} </span>
                <span> · </span>
                <span> {currentSpot.numReviews} reviews </span>
                {currentSpot.city}, {currentSpot.state}, {currentSpot.country}
            </div>
            <div className="Spot-detail-description-container">
                <h2 className="spot-detail-name">{currentSpot.name} hosted by {currentSpot.Owner?.firstName}</h2>

            </div>
            <div className="spot-detail-name">{currentSpot.description}</div>
            <div className="Second Container Space"></div>
            <div className="spot-detail-price container">
                <span>
                    <span className="spot-detail-price">${currentSpot.price}</span>
                    <span>per night</span>
                </span>
                <span className="price-with-review-top-right">
                    <span id='next-to-right'> &#9733; </span>
                    <span> {currentSpot.avgStarRating} · {currentSpot.numReviews} reviews</span>
                </span>
            </div>
            <div className="spot-detail-review-container"></div>
            <div>
                <h2>
                <span> &#9733; </span>
                <span> {currentSpot.avgStarRating} </span>
                <span> · </span>
                <span> {currentSpot.numReviews} reviews </span>
                </h2>

            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )

}

export default SpotDetail
