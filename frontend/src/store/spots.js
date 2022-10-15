import {csrfFetch} from './csrf'

const GET_SPOTS = 'spots/getSpots'


const loadSpots = (spots) => {
    type: GET_SPOTS,
    spots
}

export const getSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots')
    if(res.ok){
        const allSpot = await res.json()
        dispatch(loadSpots(allSpot))
        return allSpot
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
        default:
        return state
    }
}


export default spotsReducer
