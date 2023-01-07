import { csrfFetch } from "./csrf"

const LIST_bookings = 'bookings/LIST_bookings'
const FIND_bookings = 'bookings/FIND_bookings'
const EDIT_bookings = 'bookings/EDIT_bookings'
const CREATE_bookings = 'bookings/CREATE_bookings'
const DELETE_bookings = 'bookings/DELETE_bookings'

export const getAllbookings = (state) => Object.values(state.bookings)

const listbookings = (bookings) => ({
  type: LIST_bookings,
  bookings
})

const findbookings = (bookings) => ({
  type: FIND_bookings,
  bookings
})

const editbooking = (booking) => ({
  type: EDIT_bookings,
  booking
})

const createbooking = (newbooking) => ({
  type: CREATE_bookings,
  newbooking
})

const deletebooking = (bookingId) => ({
  type: DELETE_bookings,
  bookingId
})

export const listRoombookings = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
  if (response.ok) {
    const bookingObj = await response.json();
    // console.log(bookingObj, "BOOKINGOBJ")
    dispatch(listbookings(bookingObj.Bookings))
  }
  return response;
}

export const listAllbookings = () => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/current`)
  if (response.ok) {
    const bookings = await response.json()
    console.log(bookings, "THUNK")
    dispatch(findbookings(bookings.Bookings))
  }
  return response;
}

export const bookNewbooking = (bookingData) => async (dispatch) => {
  const { userId, spotId, startDate, endDate } = bookingData;
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    body: JSON.stringify({
      userId, spotId, startDate, endDate
    })
  })
  if (response.ok) {
    const newbooking = await response.json()
    dispatch(createbooking(newbooking));
    return newbooking;
  }
}

export const updatebooking = (bookingData) => async (dispatch) => {
  const { bookingId, userId, spotId, startDate, endDate } = bookingData;
  const response = await csrfFetch(`/api/spots/${spotId}/bookings/${bookingId}`, {
    method: "PUT",
    body: JSON.stringify({
      userId, spotId, startDate, endDate
    })
  })
  if (response.ok) {
    const booking = await response.json()
    dispatch(editbooking(booking));
    return booking;
  }
}

export const removebooking = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
    // body: JSON.stringify({
    //   bookingId
    // })
  })
  const deletedbooking = await response.json();
  dispatch(deletebooking(bookingId));
  return deletedbooking;
  // return;
}

const initialState = {spotBooking: {}, userBooking: {}}
const bookingReducer = (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {
    case LIST_bookings: {
      action.bookings.map(booking => newState.spotBooking[booking.spotId] = booking)
      return newState;
    }
    case FIND_bookings: {
      action.bookings.map(booking => newState.userBooking[booking.spotId] = booking)
      return newState;
    }
    case CREATE_bookings: {
      newState = { ...state }
      newState.userBooking[action.newbooking.id] = action.newbooking;
      return newState;
    }
    case EDIT_bookings: {
      newState = { ...state }
      newState.userBooking[action.booking.id] = action.booking;
      return newState;
    }
    case DELETE_bookings: {
      newState = { ...state }
      delete newState.userBooking[action.bookingId]
      return newState;
    }
    default:
      return state;
  }
}

export default bookingReducer;
