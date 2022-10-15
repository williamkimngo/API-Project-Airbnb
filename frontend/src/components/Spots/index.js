import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots';

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
        <h1>AllSpots (Change Later)</h1>
        <ul>
            {spotsList.map(spot => (
                <li key={spot.id}>{spot.name}</li>
            ))}
        </ul>
    </div>
)
}

export default AllSpots
