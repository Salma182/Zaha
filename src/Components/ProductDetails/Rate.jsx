import React, { memo, useEffect, useState } from "react";
import GrayStarIcon from "../../Images/greyStar.png";
import YellowStarIcon from "../../Images/goldstar.png";
import { useParams } from "react-router-dom";
import axios from "axios";


const Rate = ( {initialRate, onRate , productId, rating, returnedData}) => {
    const[rate, setRate] = useState('')
      const[id, setID]=useState('')
    const [currentRate, setCurrentRate] = useState(initialRate);
    const [hoverRate, setHoverRate] = useState(null);
    const[Data,setData] = useState('')
  
        useEffect(() => {
          setRate(rating)
          setID(productId)   
          setData(returnedData)    
          }, [initialRate]);

        const handleMouseEnter = (index) => {
            setHoverRate(index);
          };
        
      const handleMouseLeave = () => {
            setHoverRate(null);
          };
        
      const handleClick = (index) => {
            setCurrentRate(index);
            if (onRate) {
              onRate(index);
            }
          };
          
  return initialRate && onRate ? (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const starIndex = index + 1;
        return (
          <img
            key={index}
            width={30}
            src={starIndex <= (hoverRate || currentRate) ? YellowStarIcon : GrayStarIcon}
            alt={starIndex <= (hoverRate || currentRate) ? 'gold star' : 'gray star'}
            className="w-4 h-4 cursor-pointer"
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
          />
        );
      })}
      <span className="text-gray-500">({currentRate}/5)</span>
    </div>
  ) : (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <img
          key={index}
          src={index < rate ? YellowStarIcon : GrayStarIcon}
          width={30}
          alt="star"
          className="w-4 h-4" // Adjust the size of the stars as needed
        />
      ))}
      <span className="text-gray-500">({rating && rating}/5)</span>
    </div>
  );
};


export default Rate;
