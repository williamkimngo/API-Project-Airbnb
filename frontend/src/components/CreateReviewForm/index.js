import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { actionCreateReview } from "../../store/reviews"
import './ReviewForm.css';


const CreateReviewForm = () => {
    const dispatch = useDispatch()
    const {spotId} = useParams()
    const history = useHistory()
    const [review, setReview] = useState("")
    const [stars, setStars] = useState(1)
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {
            review, stars
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
                <div className="review-header">
                <h2>Create a Review</h2>
                </div>
                <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
            <textarea
            type='text'
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Enter your review here"
            required
            />
         </label>

        <div className="star-click">
         <label>

            <label>
            <input
               type="radio"
               value= {1}
               name="stars"
               onChange={(e) => setStars(parseInt(e.target.value))}
                checked={stars === 1 ? true: false}
            />
                 ★
            </label>

            <label>
            <input
               type="radio"
               value= {2}
               name="stars"
               onChange={(e) => setStars(parseInt(e.target.value))}
                checked={stars === 2 ? true: false}
            />
             ★★
            </label>

            <label>
            <input
               type="radio"
               value= {3}
               name="stars"
               onChange={(e) => setStars(parseInt(e.target.value))}
                checked={stars === 3 ? true: false}
            />
             ★★★
            </label>

            <label>
            <input
               type="radio"
               value= {4}
               name="stars"
               onChange={(e) => setStars(parseInt(e.target.value))}
                checked={stars === 4 ? true: false}
            />
             ★★★★
            </label>

            <label>
            <input
               type="radio"
               value= {5}
               name="stars"
               onChange={(e) => setStars(parseInt(e.target.value))}
                checked={stars === 5 ? true: false}
            />
              ★★★★★
            </label>
         </label>
         </div>
         <button className="submit-button" type="submit">Submit Review</button>
            </form>
        </div>
    )
}

export default CreateReviewForm
