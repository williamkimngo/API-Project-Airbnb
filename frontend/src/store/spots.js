import {csrfFetch} from './csrf'

const GET_SPOTS = 'spots/getSpots'
const ADD_SPOT = 'spots/addSpot'
const DELETE_SPOT = 'spots/deleteSpot'
const GET_ONE_SPOT = 'spots/getOneSpot'
const ADD_IMAGE_URL = 'spots/addImageUrl';
const LOAD_CURRENT_USER_SPOTS = 'spots/current'


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
        type: LOAD_CURRENT_USER_SPOTS,
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

const addImageUrl = (spotId, singleImg) => {
    return {
       type: ADD_IMAGE_URL,
       spotId,
       singleImg
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
        return res
    }
}

export const actionAddSpot = (data) => async dispatch => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    if(res.ok){

        const newSpot = await res.json()
        dispatch(addSpot(newSpot))
        return newSpot
    }
}

export const actionUpdateSpot = (data, spotId) => async dispatch => {
    console.log(data, "DATA")
    const res = await csrfFetch(`/api/spots/${data.spotId}`, {
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

export const getCurrentUserSpots = () => async dispatch => {
    const res = await csrfFetch (`/api/spots/current`)
    if(res.ok){
        const userSpot = await res.json()
        // console.log("USERSPOT!!!!!!!!", userSpot)
        dispatch(loadCurrentUserSpot(userSpot))
        // console.log("USERSPOT!!!!!!!!", userSpot)
        return userSpot
    }
}

export const actionAddImageUrl = (data, id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}/images`, {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(data)
    });
    if(res.ok){
       const img = await res.json();
       dispatch(addImageUrl(id, data));
    }
}

const initialState = {
    allSpots: {},
    specificSpot: {}
}
const spotsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_SPOTS: {
            const newState = {...state, allSpots: {...state.allSpots}}
            action.spots.Spots.forEach(spot => newState.allSpots[spot.id] = spot)
            return newState
        }
        case GET_ONE_SPOT: {
            const oneState = {...state, allSpots: {...state.allSpots}};
            oneState.specificSpot = action.spot;
            return oneState;

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
        case LOAD_CURRENT_USER_SPOTS:
            const curSpot = {...state, allSpots: {}}
            action.spots.Spots.forEach(spot => curSpot.allSpots[spot.id] = spot)
            return curSpot
        case ADD_IMAGE_URL: {
            const imgState = {...state, allSpots: {...state.allSpots}, specificSpot: {...state.specificSpot}};
            imgState.allSpots[action.spotId].previewImage = action.singleImg.url;
            return imgState;
        }

        default:
        return state
    }
}


export default spotsReducer
