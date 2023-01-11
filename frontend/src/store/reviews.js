import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEW = 'reviews/getSpotReview';
const CREATE_REVIEW = 'reviews/createReview';
const DELETE_REVIEW = 'reviews/deleteReview';
const GET_USER_REVIEW = 'reviews/getUserReview';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW'


const getSpotReviews = (reviews) => {
   return {
      type: GET_SPOT_REVIEW,
      reviews
   }
}

const createReview = (review) => {
   return {
      type: CREATE_REVIEW,
      review
   }
}

const deleteReview = (reviewId) => {
   return {
      type: DELETE_REVIEW,
      reviewId
   }
}

const getUserReview = (reviews) => {
   return {
      type: GET_USER_REVIEW,
      reviews
   }
}

const editReview = (review) => ({
   type: EDIT_REVIEW,
   review
 })


export const actionGetSpotReview = (spotId) => async dispatch => {
   const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

   if(res.ok){
      const currentReview = await res.json();
      dispatch(getSpotReviews(currentReview));
      return currentReview;
   }
}

export const actionCreateReview = (data) => async dispatch => {
   const res = await csrfFetch(`/api/spots/${data.spotId}/reviews`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
   });


   if(res.ok){
      const newReview = await res.json();
      dispatch(createReview(newReview));
      return newReview;
   }
}

export const updateReview = (reviewData, reviewId) => async (dispatch) => {
   const response = await csrfFetch(`/api/reviews/${reviewId}`, {
     method: "PUT",
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(reviewData)
   })


   if (response.ok) {
     const review = await response.json()
     dispatch(editReview(review));
     return review;
   }
 }

export const actionDeleteReview = (reviewId) => async dispatch => {
   const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE'
   });

   if(res.ok){
      dispatch(deleteReview(reviewId));
   }
}

export const actionGetUserReview = () => async (dispatch) => {
   const res = await csrfFetch('/api/reviews/current');
   if(res.ok){
      const userReview = await res.json();
      dispatch(getUserReview(userReview));
      return res;
   }
}



const initialState = {
   spot: {},
   user: {}
};
const reviewsReducer = (state = initialState, action) => {
   switch(action.type){
      case GET_SPOT_REVIEW: {
         const newState = {...state};
         action.reviews.Reviews.forEach(review => (newState.spot[review.id] = review));
         return newState;
      }

      case CREATE_REVIEW: {
         const addState = {...state};
         addState.spot[action.review.id] = action.review;
         return addState;
      }
      case EDIT_REVIEW: {
         const newState = {...state}
         newState[action.review.id] = action.review
         return newState
      }
      case DELETE_REVIEW: {
         const delState = {...state, spot: {...state.spot}, user: {...state.user}};
         delete delState.spot[action.reviewId];
         delete delState.user[action.reviewId];
         return delState;
      }

      case GET_USER_REVIEW: {
         const userState = {...state, user: {}};
         action.reviews.Reviews.forEach(review => (userState.user[review.id] = review));
         return userState;
      }

      default:
         return state;
   }
}

export default reviewsReducer;
