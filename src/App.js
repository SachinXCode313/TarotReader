import React, { useState } from 'react';
import './index.css'; // Import Tailwind styles
import CardsData from './Cards';

// Shuffle function
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const App = () => {
  const [cards, setCards] = useState(
    CardsData.map((card) => ({ ...card, isFlipped: false }))
  );
  const [selectedCards, setSelectedCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShuffle = () => {
    // Reset card flip state and shuffle card data
    setCards((prevCards) => {
      const shuffledCards = shuffleArray(prevCards.map((card) => ({ ...card, isFlipped: false })));
      return shuffledCards;
    });
    setSelectedCards([]); // Reset selected cards
  };

  const handleCardClick = (index) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card, i) =>
        i === index ? { ...card, isFlipped: !card.isFlipped } : card
      );

      // Update selected cards logic
      const flippedCards = updatedCards.filter(card => card.isFlipped);
      if (flippedCards.length === 3) {
        setSelectedCards(flippedCards);
        setIsModalOpen(true);
      }

      return updatedCards;
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    handleShuffle(); // Shuffle and reset cards when modal is closed
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className='text-3xl font-bold'>Select The Cards</h1>
      <div className="grid grid-cols-20 gap-4 overflow-y-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`relative w-16 h-28 cursor-pointer perspective-1000`}
            onClick={() => handleCardClick(index)}
          >
            <div
              className={`absolute w-16 h-28 transition-transform duration-500 transform-style-preserve-3d
                ${card.isFlipped ? 'rotate-y-180' : ''}`}
              style={{ transformOrigin: '50% 50%' }}
            >
              <div
                className={`absolute w-full h-full backface-hidden ${card.isFlipped ? 'hidden' : ''}`}
              >
                <div className="flex items-center justify-center h-full bg-gray-300 text-white">
                  {/* Optional: Add content for the front of the card */}
                </div>
              </div>
              <div
                className={`absolute w-full h-full backface-hidden ${card.isFlipped ? '' : 'hidden'} rotate-y-180`}
              >
                <img
                  src={card.img}
                  className="w-16 h-28 object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="mx-20 my-10 bg-white p-4 flex flex-col items-center rounded shadow-lg w-full">
            <h2 className="text-xl font-bold mb-4">Selected Cards</h2>
            <div className="grid grid-cols-3 gap-4">
              {selectedCards.map((card, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={card.img}
                    alt={card.name}
                    className="w-[17rem] h-[30rem] object-cover"
                  />
                  <p className="mt-2 font-bold">{card.name}</p>
                </div>
              ))}
            </div>
            <button
              onClick={handleModalClose}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Close & Shuffle Cards
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
