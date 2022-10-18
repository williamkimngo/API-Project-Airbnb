import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import SpotCard from '../SpotCard';

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
        <h1>AllSpots</h1>
        <ul>
            {spotsList.map(spot => (
                <li key={spot.id}>
                <SpotCard key={spot.id} spot={spot}/>
             </li>
            ))}
        </ul>
    </div>
)
}

export default AllSpots
