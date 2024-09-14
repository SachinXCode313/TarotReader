import React, { useState, useEffect } from 'react';
import './index.css'; // Import Tailwind styles
import CardsData from './Cards';

// Shuffle function
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

// Helper function to get random indices
const getRandomIndices = (total, count) => {
  const indices = [];
  while (indices.length < count) {
    const randomIndex = Math.floor(Math.random() * total);
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }
  return indices;
};

const App = () => {
  const [cards, setCards] = useState(
    CardsData.map((card) => ({ ...card, isFlipped: false, rotateClass: '' }))
  );
  const [selectedCards, setSelectedCards] = useState([]); // Keep track of multiple selected cards
  const maxSelectedCards = 3; 

  useEffect(() => {
    // Apply rotation to a random subset of cards on mount
    applyRandomRotation();
  }, []);

  const applyRandomRotation = () => {
    const rotateCardCount = 11; // Number of cards to rotate
    const indices = getRandomIndices(cards.length, rotateCardCount);

    setCards((prevCards) =>
      prevCards.map((card, index) => ({
        ...card,
        rotateClass: indices.includes(index) ? 'rotate-180' : '', // Add rotation class
      }))
    );
  };
  const handleCardClick = (index) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card, i) =>
        i === index ? { ...card, isFlipped: !card.isFlipped } : card
      );

      // Update selected cards logic
      const flippedCard = updatedCards[index];

      setSelectedCards((prevSelectedCards) => {
        // If card is flipped and max limit reached, prevent selecting more
        if (flippedCard.isFlipped && prevSelectedCards.length >= maxSelectedCards) {
          // Revert the flip since max is reached
          updatedCards[index].isFlipped = false;
          return prevSelectedCards;
        }

        // If card is flipped, add it to selectedCards, otherwise remove it
        if (flippedCard.isFlipped) {
          return [...prevSelectedCards, flippedCard];
        } else {
          return prevSelectedCards.filter((card) => card !== flippedCard);
        }
      });

      return updatedCards;
    });
  };

  const handleShuffle = () => {
    // Reset card flip state and shuffle card data
    setCards((prevCards) => {
      const shuffledCards = shuffleArray(prevCards.map((card) => ({ ...card, isFlipped: false, rotateClass: '' })));
      return shuffledCards;
    });
    // Apply rotation to a random subset of cards after shuffle
    applyRandomRotation();
    setSelectedCards([]); // Reset selected cards
  };

  const handleReset = () => {
    // Reset the flipped state of all cards
    setCards((prevCards) => {
      const resetCards = prevCards.map((card) => ({ ...card, isFlipped: false, rotateClass: '' }));
      return resetCards;
    });
    // Apply rotation to a random subset of cards after reset
    applyRandomRotation();
    setSelectedCards([]); // Reset selected cards
  };

  return (
    <div className="px-4 flex flex-row min-h-screen items-center justify-between gap-20 bg-gray-100">
      {/* Left side: Cards */}
      <div className="w-[35rem] h-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Select The Cards</h1>

        {/* Shuffle and Reset buttons */}
        <div className="flex space-x-4 my-4">
          <button
            onClick={handleShuffle}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Shuffle & Reset Cards
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Reset All Cards
          </button>
        </div>

        <div className=" grid grid-cols-10 gap-2 overflow-y-hidden">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`relative w-[2rem] h-[3rem] cursor-pointer perspective-1000 ${card.rotateClass}`} // Apply rotation class
              onClick={() => handleCardClick(index)}
            >
              <div
                className={`absolute w-[2rem] h-[3rem] transition-transform duration-500 transform-style-preserve-3d
                ${card.isFlipped ? 'rotate-y-180' : ''}`}
                style={{ transformOrigin: '50% 50%' }}
              >
                <div
                  className={`absolute w-full h-full backface-hidden ${card.isFlipped ? 'hidden' : ''}`}
                >
                  <div className="flex items-center justify-center h-full text-white">
                    <img className="object-cover" src="/images/card.jpg" alt="" />
                  </div>
                </div>
                <div
                  className={`absolute w-full h-full backface-hidden ${card.isFlipped ? '' : 'hidden'} rotate-y-180`}
                >
                  <img
                    src={card.img}
                    className="w-[2rem] h-[3rem] object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side: Display flipped cards */}
      <div className="w-[70rem] flex items-center justify-center">
        {selectedCards.length > 0 ? (
          <div className="flex items-center space-y-4">
            {selectedCards.map((card, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`relative w-[17rem] h-[28rem] perspective-1000 ${card.rotateClass}`}>
                  <div
                    className={`absolute w-[17rem] h-[28rem] transition-transform duration-500 transform-style-preserve-3d
                      ${card.isFlipped ? 'rotate-y-180' : ''}`}
                    style={{ transformOrigin: '50% 50%' }}
                  >
                    <div
                      className={`absolute w-full h-full backface-hidden ${card.isFlipped ? 'hidden' : ''}`}
                    >
                      <div className="flex items-center justify-center h-full text-white">
                        <img className="object-cover" src="/images/card.jpg" alt="" />
                      </div>
                    </div>
                    <div
                      className={`absolute w-full h-full backface-hidden ${card.isFlipped ? '' : 'hidden'} rotate-y-180`}
                    >
                      <img
                        src={card.img}
                        className="w-[17rem] h-[28rem] object-cover"
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-2 font-bold">{card.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className=" text-gray-500">Flip a card to display it here.</p>
        )}
      </div>
    </div>
  );
};

export default App;
