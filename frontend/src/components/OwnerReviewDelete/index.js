import { useDispatch, useSelector } from "react-redux"
import { actionDeleteReview } from "../../store/reviews"

const OwnerDeleteReview = ({review}) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    let ownerReview = false
    if(sessionUser){
        if(review.userId === sessionUser.id){
            ownerReview = true
        }
    }

    return(
        <div className="owner-delete-review-container">
            {review.review}
            {ownerReview &&
            <button onClick={() => dispatch(actionDeleteReview(review.id))}> Delete Review</button> }
        </div>
    )
}

export default OwnerDeleteReview
