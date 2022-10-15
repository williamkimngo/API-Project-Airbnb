import {csrfFetch} from './csrf'

const GET_SPOTS = 'spots/getSpots'
const ADD_SPOT = 'spots/allSpot'
const DELETE_SPOT = '/spots/deleteSpot'
const GET_ONE_SPOT = '/spots/getOneSpot'
const CURRENT_USER_SPOT = '/spots/userCurrentSpot'


const loadSpots = (spots) => {
    return {
    type: GET_SPOTS,
    spots
    }
}

const loadOneSpot = (spot) => {
    return {
        type: GET_ONE_SPOT,
        spot
    }
}

export const loadCurrentUserSpot = (spots) => {
    return {
        type: CURRENT_USER_SPOT,
        spots
    };
}

const addSpot = (spot) => {
    return {
    type: ADD_SPOT,
    spot
    }
}

const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}


export const getSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots')
    if(res.ok){
        const allSpot = await res.json()
        dispatch(loadSpots(allSpot))
        return allSpot
    }
}

export const getOneSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`)
    if(res.ok){
        const currentSpot = await res.json()
        dispatch(loadOneSpot(currentSpot))
        return currentSpot
    }
}

export const actionAddSpot = (data) => async dispatch => {
    const res = await csrfFetch('/api/spots/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    if(res.ok){
        const newSpot = await res.json()
        dispatch(addSpot(newSpot))
        return res
    }
}

export const actionUpdateSpot = (data, spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    if(res.ok){
        const updatedSpot = await res.json()
        dispatch(addSpot(updatedSpot))
        return res
    }
}

export const actionDeleteSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    if(res.ok){
        dispatch(deleteSpot(spotId))
    }
}

const initialState = {
    allSpots: {}
}
const spotsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_SPOTS: {
            const newState = {...state, allSpots: {...state.allSpots}}
            action.spots.Spots.forEach(spot => newState.allSpots[spot.id] = spot)
            return newState
        }
        case GET_ONE_SPOT: {
            const oneState = {...state}
            oneState[action.spot.id] = action.spot
            return oneState

        }
        case ADD_SPOT: {
            const addState = {...state, allSpots: {...state.allSpots}}
            addState.allSpots[action.spot.id] = action.spot
            return addState
        }
        case DELETE_SPOT: {
            const delSpot = {...state, allSpots: {...state.allSpots}}
            delete delSpot.allSpots[action.spotId]
            return delSpot
        }
        default:
        return state
    }
}


export default spotsReducer
