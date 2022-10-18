import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { actionCreateReview } from "../../store/reviews"


const CreateReviewForm = () => {
    const dispatch = useDispatch()
    const {spotId} = useParams()
    const history = useHistory()
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(1)
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {
            review, rating
        }

        let newReview = dispatch(actionCreateReview(payload, spotId))
            .catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors);
        })
        if(newReview && !errors.length){
            history.push(`/spots/${spotId}`)
        }
    }


    return (
        <div>
            <form className="review-form-container" onSubmit={handleSubmit}>
                <h2>Create a Review</h2>
                <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
            Review
            <textarea
            type='text'
            value={review}
            onChange={(e) => setReview(e.target.value)}
            />
         </label>

         <label>
            rating
            <label>
            <input
               type="radio"
               value="1"
               name="rating"
               onChange={(e) => setRating(parseInt(e.target.value))}
                checked={rating === 1 ? true: false}
            />
            1
            </label>

            <label>
            <input
               type="radio"
               value="2"
               name="rating"
               onChange={(e) => setRating(parseInt(e.target.value))}
                checked={rating === 2 ? true: false}
            />
            2
            </label>

            <label>
            <input
               type="radio"
               value="3"
               name="rating"
               onChange={(e) => setRating(parseInt(e.target.value))}
                checked={rating === 3 ? true: false}
            />
            3
            </label>

            <label>
            <input
               type="radio"
               value="4"
               name="rating"
               onChange={(e) => setRating(parseInt(e.target.value))}
                checked={rating === 4 ? true: false}
            />
            4
            </label>

            <label>
            <input
               type="radio"
               value="5"
               name="rating"
               onChange={(e) => setRating(parseInt(e.target.value))}
                checked={rating === 5 ? true: false}
            />
            5
            </label>
         </label>
         <button type="submit">Submit Review</button>
            </form>
        </div>
    )
}

export default CreateReviewForm
