import React, { useState, useEffect } from 'react';
import { Fakemon } from '../types';
import { TYPE_COLORS } from '../constants';
import StatChart from './StatChart';
import { DnaIcon, BookOpenIcon, StarIcon } from './icons';

interface FakemonCardProps {
  fakemon: Fakemon;
  onGenerateShiny: () => void;
  isShinyLoading: boolean;
}

const FakemonCard: React.FC<FakemonCardProps> = ({ fakemon, onGenerateShiny, isShinyLoading }) => {
  const [showShiny, setShowShiny] = useState(false);

  // Reset view to normal when a new Fakemon is generated
  useEffect(() => {
    setShowShiny(false);
  }, [fakemon.name]);

  // Switch to shiny view once it's generated
  useEffect(() => {
    if (fakemon.shinyImageUrl) {
      setShowShiny(true);
    }
  }, [fakemon.shinyImageUrl]);

  const currentImageUrl = showShiny && fakemon.shinyImageUrl ? fakemon.shinyImageUrl : fakemon.imageUrl;

  return (
    <div className="w-full bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden transform transition-all duration-500 animate-fade-in">
      <div className="relative bg-gray-900/50 p-4">
        <img
          src={currentImageUrl}
          alt={fakemon.name}
          className="w-full h-80 object-contain rounded-lg transition-opacity duration-300"
        />
        <div className="absolute top-6 right-6 flex flex-col gap-2">
            {!fakemon.shinyImageUrl ? (
                <button
                    onClick={onGenerateShiny}
                    disabled={isShinyLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 rounded-lg hover:bg-yellow-500/40 disabled:opacity-50 disabled:cursor-wait transition-colors"
                    title="Generate Shiny Version"
                >
                    {isShinyLoading ? (
                        <>
                           <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </>
                    ) : (
                        <>
                            <StarIcon className="h-5 w-5"/>
                            <span>Shiny</span>
                        </>
                    )}
                </button>
            ) : (
                <div className="flex items-center bg-gray-900/60 border border-gray-700 rounded-lg p-1 backdrop-blur-sm">
                    <button
                        onClick={() => setShowShiny(false)}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${!showShiny ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                    >
                        Normal
                    </button>
                     <button
                        onClick={() => setShowShiny(true)}
                        className={`px-3 py-1 text-sm rounded-md transition-colors flex items-center gap-1 ${showShiny ? 'bg-yellow-400 text-black font-semibold' : 'text-gray-300 hover:bg-gray-700'}`}
                    >
                         <StarIcon className="h-4 w-4" />
                        Shiny
                    </button>
                </div>
            )}
        </div>
      </div>

      <div className="p-6">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3">
            {fakemon.shinyImageUrl && showShiny && <StarIcon className="h-6 w-6 text-yellow-400" />}
            <h2 className="text-4xl font-bold tracking-wider uppercase text-white">{fakemon.name}</h2>
          </div>
          <div className="flex justify-center gap-2 mt-2">
            {fakemon.types.map((type) => (
              <span
                key={type}
                className="px-4 py-1 text-sm font-semibold text-white rounded-full shadow-md"
                style={{ backgroundColor: TYPE_COLORS[type.toLowerCase() as keyof typeof TYPE_COLORS] || '#777' }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6">
            <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-300 border-b-2 border-gray-700 pb-2 mb-2">
                    <BookOpenIcon className="h-5 w-5" />
                    Pokédex Entry
                </h3>
                <p className="text-gray-400 text-base leading-relaxed">{fakemon.description}</p>
            </div>

            <div>
                 <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-300 border-b-2 border-gray-700 pb-2 mb-2">
                    <DnaIcon className="h-5 w-5" />
                    Abilities
                </h3>
                <ul className="flex flex-wrap gap-2">
                    {fakemon.abilities.map(ability => (
                         <li key={ability} className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-md">{ability}</li>
                    ))}
                </ul>
            </div>
            
             <div>
                <h3 className="text-lg font-semibold text-gray-300 border-b-2 border-gray-700 pb-2 mb-3">Base Stats</h3>
                <StatChart stats={fakemon.stats} />
             </div>
        </div>
      </div>
    </div>
  );
};

export default FakemonCard;