import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import SpotCard from '../SpotCard';
import './allspot.css'

const AllSpots = () => {
    const dispatch = useDispatch()
    const spotsList = useSelector(state => Object.values(state.spots.allSpots))

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    if(!spotsList){
        return null
    }
return (
    <div className='all-spots'>
        <ul className='all-spots-container'>
            {spotsList.map(spot => (
                <li className='all-spots-list' key={spot.id}>
                <SpotCard key={spot.id} spot={spot}/>
             </li>
            ))}
        </ul>
    </div>
)
}

export default AllSpots
