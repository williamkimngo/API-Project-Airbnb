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
    let currentSpotArr = Object.values(currentSpot)

    // console.log("CURRRENT SPOT!!!!!!", currentSpot)
    const spotReview = useSelector(state => Object.values(state.reviews.spot))
    // let imgSpot = useSelector(state => state.spots.allSpots[spotId])
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
        if((sessionUser.id !==currentSpot.ownerId) && !ownerReview){
            allowCreate = true
        }
    }
    // console.log("IMAGEPLS!!!!", currentSpot.SpotImages)
    // let extraImagesArr = specificSpot.SpotImages?.slice(1);
    if(!currentSpotArr.length){
        return null
    }
    let avgRatingTwoDec;
    // console.log(currentSpot.avgStarRating.toString().split(""))
    if(currentSpot.avgStarRating === 0){
        avgRatingTwoDec = "No Reviews present for this listing"
    } else if(Number.isInteger(currentSpot.avgStarRating)){
        avgRatingTwoDec = `${currentSpot.avgStarRating}.0`
    } else if(currentSpot.avgStarRating.toString().split("").slice(2).length === 1){
        // let ratingArray = currentSpot.avgStarRating.toString().split("")
        avgRatingTwoDec = currentSpot.avgStarRating
    } else {
        avgRatingTwoDec = parseFloat(currentSpot.avgStarRating).toFixed(2)
    }
    return (
        <div className="Spot-Detail-container">
            <h1>{currentSpot.name}</h1>
            <div className="title-container">
                <span> &#9733; </span>
                <span> {avgRatingTwoDec} </span>
                <span> · </span>
                <span> {currentSpot.numReviews} reviews </span>
                {currentSpot.city}, {currentSpot.state}, {currentSpot.country}
            </div>
            <div className="img-container">

                <img className="first-img" src={currentSpot?.SpotImages[0].url} alt='SpotImage'/>
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
                    <span> {avgRatingTwoDec} · {currentSpot.numReviews} reviews</span>
                </span>
            </div>
            <div>
                <div className="price-line-container">
                    <span>
                        <span>${currentSpot.price}</span>
                        <span> x3 nights</span>
                    </span>
                    <span>${currentSpot.price * 3}</span>
                </div>
                <div className="price-line-container">
                    <span>Cleaning Fee</span>
                    <span>${currentSpot.price / 5}</span>
                </div>
                <div className="price-line-container">
                    <span>Service Fee</span>
                    <span>${currentSpot.price / 10}</span>
                </div>
                <div className="price-line-container">
                    <span>Total before taxes</span>
                    <span>${(currentSpot.price * 3) + (currentSpot.price / 5) + (currentSpot.price / 10)}</span>
                </div>
            </div>
            <div className="spot-detail-review-container"></div>
            <div>
                <h2>
                <span> &#9733; </span>
                <span> {avgRatingTwoDec} </span>
                <span> · </span>
                <span> {currentSpot.numReviews} reviews </span>
                </h2>
                {allowCreate && <NavLink to={`/spots/${spotId}/reviews/new`}> Leave a Review</NavLink>}
                {spotReview.map(review => (
                    <div className='single-review-container' key={review.id}>
                        <div className='review-name'>{review?.User?.firstName || "You Just posted"}</div>
                        <div className='review-date'>{review?.createdAt.slice(0, 7)}</div>
                        <div className='review-text'>{review.review}</div>
                        <div>{review.stars} star</div>
                        </div>

                ))}

            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )

}

export default SpotDetail
