import {csrfFetch} from './csrf'

const GET_SPOTS = 'spots/getSpots'
const ADD_SPOT = 'spots/allSpot'


const loadSpots = (spots) => {
    return {
    type: GET_SPOTS,
    spots
    }
}

const addSpot = (spot) => {
    return {
    type: ADD_SPOT,
    spot
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
        case ADD_SPOT: {
            const addState = {...state, allSpots: {...state.allSpots}}
            addState.allSpots[action.spot.id] = action.spot
            return addState
        }
        default:
        return state
    }
}


export default spotsReducer
