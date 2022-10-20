import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, NavLink } from "react-router-dom"
import { actionGetSpotReview } from "../../store/reviews"
import { getOneSpot } from "../../store/spots"
import './spotId.css';

const SpotDetail = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    let currentSpot = useSelector(state => state.spots.specificSpot)
    // console.log(currentSpot)
    // let currentSpotArr = Object.values(currentSpot)

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
    if(!(Object.values(currentSpot).length)){
        return null
    }
    let avgRatingTwoDec;
    // console.log(currentSpot.avgStarRating.toString().split(""))
    if(currentSpot.avgStarRating === 0){
        avgRatingTwoDec = "No Reviews present for this listing"
    } else if(Number.isInteger(currentSpot.avgStarRating)){
        avgRatingTwoDec = `${currentSpot.avgStarRating}.0`
    } else if(currentSpot?.avgStarRating?.toString().split("").slice(2).length === 1){
        // let ratingArray = currentSpot.avgStarRating.toString().split("")
        avgRatingTwoDec = currentSpot.avgStarRating
    } else {
        avgRatingTwoDec = parseFloat(currentSpot.avgStarRating).toFixed(2)
    }
    // <div className='review-name'>{review?.createdAt.slice(0, 9)}</div>
    return (
        <div className="Spot-Detail-container">
            <div className="header">
            <h1>{currentSpot.name}</h1>
            </div>
            <div className="title-container">
                <span> &#9733; </span>
                <span className="rating"> {avgRatingTwoDec} </span>
                <span> · </span>
                <span> {currentSpot.numReviews} reviews </span>
                <span> · </span>
                <span> 🎖️ </span>
                <span>  Superhost </span>
                <span> · </span>
                <span className="location">{currentSpot.city}, {currentSpot.state}, {currentSpot.country}</span>
            </div>
            <div className="img-container">

                <img className="first-img" src={currentSpot?.SpotImages[0].url} alt='SpotImage'/>
            </div>

              <div className="big-middle-div">
              <div className="Spot-detail-description-container">
              <h2 className="spot-detail-name">{currentSpot.name} hosted by {currentSpot.Owner?.firstName}</h2>
              <div className="extra-info">
                <div>

                    <div className="info-title">🚪Self Check in
                    <p>Check yourself in with the lockbox.</p>
                    </div>

                </div>
                <div>
                    <div className="info-title"> 🎖️{currentSpot.Owner.firstName} is a Superhost
                    <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                    </div>

                </div>
                <div className="info-title">📆 Free Cancellation within 48 hours of your expected arrival</div>
              </div>
              <p className="spot-detail-description-left">{currentSpot.description}</p>
              </div>
            <div className="Right-Container">
            <div className="spot-detail-price-container">
                <span>
                    <span className="spot-detail-price">${currentSpot.price}</span>
                    <span className="per-night">per night</span>
                </span>
                <span className="price-with-review-top-right">
                    <span id='next-to-right'> &#9733; </span>
                    <span> {avgRatingTwoDec} · {currentSpot.numReviews} reviews</span>
                </span>
            </div>

            <div>
                <div className="price-line-container">
                    <div>
                        <div className="left-price">${currentSpot.price} x3 nights</div>
                    </div>
                    <div className="right-price">${currentSpot.price * 3}</div>
                </div>
                <div className="price-line-container">
                    <div className="left-price">Cleaning Fee</div>
                    <div className="right-price">${currentSpot.price / 5}</div>
                </div>
                <div className="price-line-container">
                    <div className="left-price">Service Fee</div>
                    <div className="right-price">${currentSpot.price / 10}</div>
                </div>
                <div className="total-price-line-container">
                    <div>Total before taxes</div>
                    <div>${(currentSpot.price * 3) + (currentSpot.price / 5) + (currentSpot.price / 10)}</div>
                </div>

                </div>
            </div>
            </div>


            <div className="spot-detail-review-container">
                <h2>
                <span> &#9733; </span>
                <span> {avgRatingTwoDec} </span>
                <span> · </span>
                <span> {currentSpot.numReviews} reviews </span>
                </h2>
                </div>
                <div className="review-link">
                {allowCreate && <NavLink to={`/spots/${spotId}/reviews/new`}> Leave a Review</NavLink>}</div>
                {spotReview.map(review => (
                    <div className='single-review-container' key={review.id}>

                        <div className="review-group"><i className="fas fa-user-circle" />
                        <div className="review-name">{review?.User?.firstName || "You Just posted"}
                        <div className="review-date"> {review?.createdAt.slice(0, 9)}</div></div>
                        </div>
                        <div className='review-text'>{review.review}</div>
                        <div>{review.stars} &#9733;</div>
                        </div>
                ))}

        </div>
    )

}

export default SpotDetail
