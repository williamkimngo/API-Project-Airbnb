import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, NavLink, useHistory } from "react-router-dom"
import { actionGetSpotReview, actionDeleteReview } from "../../store/reviews"
import { getOneSpot } from "../../store/spots"
import './spotId.css';
import { listRoombookings, getAllbookings } from "../../store/bookings"
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { actionDeleteSpot, getCurrentUserSpots, getSpots } from "../../store/spots"
import { Modal } from "../../context/Modal";


const SpotDetail = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    const [confirmDelete, setConfirmDelete] = useState(false);
    const currRoomBookings = useSelector(getAllbookings)
    console.log(currRoomBookings, "HELLO?")
    const [selectDate, setSelectDate] = useState(false)
    const today = new Date()
    const tomorrow = new Date()
    const nextDay = new Date()
    tomorrow.setHours(tomorrow.getHours() + 7)
    nextDay.setHours(nextDay.getHours() + 31)

    const [checkIn, setCheckIn] = useState(tomorrow)
    const [checkOut, setCheckOut] = useState(nextDay)
    const [dates, setDates] = useState([
        {
            startDate: tomorrow,
            endDate: nextDay,
            key: 'selection'
        }
    ])
    useEffect(() => {
        if (dates[0].startDate !== tomorrow) {
            setCheckIn(dates[0].startDate.toISOString().slice(0, 10))
            setCheckOut(dates[0].endDate.toISOString().slice(0, 10))
        }
    }, [dates])

    useEffect(() => {
        if (checkIn !== today) {
            setDates([
                {
                    startDate: new Date(checkIn),
                    endDate: new Date(checkOut),
                    key: 'selection'
                }
            ])
        }

    }, [selectDate])

    useEffect(() => {
        dispatch(listRoombookings(spotId))
        getBookedDates()
    }, [spotId])

    const allStartDates = currRoomBookings.map(bookings => bookings.startDate)
    const allEndDates = currRoomBookings.map(bookings => bookings.endDate)

    const getDays = (start, end) => {
        for (var betweenDates = [], date = new Date(start); date <= new Date(end); date.setDate(date.getDate() + 1)) {
            betweenDates.push(new Date(date));
        }
        return betweenDates;
    };

    const getBookedDates = () => {
        let i = 0
        let bookedDates = []
        while (i < allStartDates.length) {
            let allDates = getDays(new Date(allStartDates[i]), new Date(allEndDates[i]));
            allDates.map((date) => date.toISOString().slice(0, 10)).join("")
            bookedDates.push(...allDates)
            i++
        }
        return bookedDates
    }

    const [page, setPage] = useState(1)

    let currentSpot = useSelector(state => state.spots.specificSpot)

    // console.log(currentSpot.ownerId, "CURRSPOT???")
    let avgRatingSpot = useSelector(state => state.spots.specificSpot.avgStarRating)
    // let spotRating = useSelector(state => state.specificSpot.avg)
    // console.log(currentSpot)
    // let currentSpotArr = Object.values(currentSpot)

    // console.log("CURRRENT SPOT!!!!!!", currentSpot)
    const spotReviewObj = useSelector(state => (state.reviews.spot))
    const spotReviewsArr = Object.values(spotReviewObj)
    console.log(spotReviewsArr, "BLAH@")
    // let imgSpot = useSelector(state => state.spots.allSpots[spotId])
    useEffect(() => {
        dispatch(getOneSpot(spotId))
        dispatch(listRoombookings(spotId))
        dispatch(actionGetSpotReview(spotId))
        document.documentElement.scrollTop = 0;

    }, [dispatch, spotId, avgRatingSpot])

    let spotReview = Object.values(spotReviewObj)

    if (!currentSpot || !spotReview) {
        return null
    }

    let allowCreate = false
    if (sessionUser) {
        let ownerReview = spotReview.find(review => review.userId === sessionUser.id)
        if ((sessionUser.id !== currentSpot.ownerId) && !ownerReview) {
            allowCreate = true
        }
    }
    // console.log("IMAGEPLS!!!!", currentSpot.SpotImages)
    // let extraImagesArr = specificSpot.SpotImages?.slice(1);
    if (!(Object.values(currentSpot).length)) {
        return null
    }
    let avgRatingTwoDec;
    // console.log(currentSpot.avgStarRating.toString().split(""))
    if (!currentSpot.avgStarRating) {
        avgRatingTwoDec = "0"
    } else if (Number.isInteger(currentSpot.avgStarRating)) {
        avgRatingTwoDec = `${currentSpot.avgStarRating}.0`
    } else if (currentSpot?.avgStarRating?.toString().split("").slice(2).length === 1) {
        // let ratingArray = currentSpot.avgStarRating.toString().split("")
        avgRatingTwoDec = currentSpot.avgStarRating
    } else {
        avgRatingTwoDec = parseFloat(currentSpot.avgStarRating).toFixed(2)
    }

    // let currentSpotPrice

    // if(Number.isInteger(currentSpot.price)){
    //     currentSpotPrice = `${currentSpot.price}.00`
    // } else {
    // currentSpotPrice  = parseFloat(currentSpot.price).toFixed(2)
    // }
    let finalPrice = ((currentSpot.price * 3) + (currentSpot.price / 5) + (currentSpot.price / 3))


    const returnToListing = () => {
        setPage(1)
      }

      const handleEdit = (e) => {
        e.preventDefault()
        setPage(2)
      }

      const handleConfirmDelete = () => {
        setConfirmDelete(true)
      }

      const handleDelete = async (e) => {
        e.preventDefault()
        const deleteResponse = await dispatch(actionDeleteSpot(spotId))

        if (deleteResponse) {
          history.push('/spots')
        }
      }

    // <div className='review-name'>{review?.createdAt.slice(0, 9)}</div>
    return (
        <div className="Spot-Detail-container">
            <div className="main-header">
            <div className="header">
                <h1>{currentSpot.name}</h1>
            </div>
            <div className="title-container">
                <span> &#9733; </span>
                <span className="rating"> {avgRatingTwoDec} </span>
                <span> · </span>
                <span className="room-reviews" onClick={() => { document.getElementsByClassName('review-link')[0].scrollIntoView() }}>{`${spotReviewsArr?.length ? spotReviewsArr?.length : 0} reviews`}
                    {/* {currentSpot.numReviews} reviews */}
                 </span>
                <span> · </span>
                <span> 🎖️ </span>
                <span>  Superhost </span>
                <span> · </span>
                <span className="location">{currentSpot.city}, {currentSpot.state}, {currentSpot.country}</span>
            </div>
            <div className="session-user-buttons">
                  {sessionUser ?
                    <>
                      {sessionUser?.id === currentSpot?.ownerId &&
                        <div>
                          <button onClick={handleEdit} className="edit-listing-button">Edit</button>
                          <button onClick={handleConfirmDelete} className="delete-listing-button">Delete</button>
                          {confirmDelete &&
                            <Modal onClose={() => setConfirmDelete(false)}>
                              <div className="delete-confirmation-modal">
                                Permanently remove listing?
                                <div className="delete-confirmation-button-outer">
                                  <button onClick={handleDelete} className='delete-confirm-button'>Delete</button>
                                </div>
                              </div>
                            </Modal>}
                        </div>}
                    </> : <></>}
                </div>
            </div>
            <div className="img-container">

                <img className="first-img" src={currentSpot?.SpotImages[0].url} alt='SpotImage' />
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
                            <span className="per-night"> night</span>
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
                            <div className="right-price">${Math.round(currentSpot.price * 3)}</div>
                        </div>
                        <div className="price-line-container">
                            <div className="left-price">Cleaning Fee</div>
                            <div className="right-price">${Math.round(currentSpot.price / 3)}</div>
                        </div>
                        <div className="price-line-container">
                            <div className="left-price">Service Fee</div>
                            <div className="right-price">${Math.round(currentSpot.price / 2)}</div>
                        </div>
                        <div className="total-price-line-container">
                            <div>Total before taxes</div>
                            <div>${Math.round(finalPrice)}</div>
                        </div>

                    </div>
                </div>
            </div>


            <div className="spot-detail-review-container">
                <h2>
                    <span>  </span>
                    <span> &#9733; {avgRatingTwoDec} · {currentSpot.numReviews} reviews </span>
                </h2>
            </div>
            <div className="review-link">
                {allowCreate && <NavLink className="leave-review" to={`/spots/${spotId}/reviews/new`}><div className="review-leave">Leave a Review</div> </NavLink>}</div>
            {spotReview.map(review => (
                <div className='single-review-container' key={review.id}>

                    <div className="review-group"><i className="fas fa-user-circle" />
                        <div className="review-name">{review?.User?.firstName}
                            <div className="review-date"> {review?.createdAt.slice(0, 7)}
                                {review?.userId === sessionUser?.id ?
                                    <button className="delete-detail-button" onClick={async () => { await dispatch(actionDeleteReview(review.id)); await dispatch(getOneSpot(spotId)) }} > Delete Review</button> : null
                                }
                            </div></div>
                    </div>
                    <div className='review-text'>{review.review}</div>
                    <div>{review.stars} &#9733;</div>
                </div>
            ))}

        </div>
    )

}

export default SpotDetail
