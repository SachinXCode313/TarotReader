import React, { useState } from 'react';

const Card = ({ name, img }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`relative w-36 h-48 cursor-pointer transition-transform duration-500 transform ${
        isFlipped ? 'rotate-y-180' : ''
      }`}
      onClick={handleClick}
    >
      {/* Front side */}
      <div className={`absolute w-full h-full bg-gray-500 flex justify-center items-center rounded-lg shadow-lg backface-hidden ${isFlipped ? 'hidden' : ''}`}>
        <span className="text-white font-bold text-lg">{name}</span>
      </div>

      {/* Back side */}
      <div className={`absolute w-full h-full bg-white rounded-lg shadow-lg backface-hidden transform rotate-y-180 ${!isFlipped ? 'hidden' : ''}`}>
        <img
          src={img}
          alt={name}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default Card;
