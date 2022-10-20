import React from 'react';
import './spotCard.css'

const SpotCard = (spot) => {
    const { id, city, state, name, price, avgRating, previewImage } = spot.spot;
    // console.log("++++",spot.spot)
    // console.log('!!!!!!!!!!!!!!spotcard',id)
    if (!spot) { return null }

    let twoDecAvgRating

    if(avgRating === 0){
        twoDecAvgRating = "No Reviews"
    } else if(Number.isInteger(avgRating)){
        twoDecAvgRating = `${avgRating}.0`
    } else if(avgRating?.toString().split("").slice(2).length === 1){
        twoDecAvgRating = avgRating
    } else {
        twoDecAvgRating = parseFloat(avgRating).toFixed(2)
    }
    return (

        <a className="spot-card" href={`/spots/${id}`}>
            <div>
                <img className="spot-card-image" src={previewImage} alt='Still Loading' />
            </div>
            <div id="spot-card-title">
                <span>{`${city}, ${state}`}</span>
                <span id="spot-card-rating">
                    <i className="fa-solid fa-star" id='star-before-stars'></i>
                    <span>{twoDecAvgRating}</span>
                </span>

            </div >
            <div className="spot-card-text">{name}</div>
            <div>
                <span className="spot-card-price">{` $${Math.round(price)} `}</span>
                <span className='spot-card-night'>night</span>
            </div>
        </a>

    );
};

export default SpotCard;
