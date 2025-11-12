import React, { useState, useCallback } from 'react';
import { generateFakemonDetails, generateFakemonImage } from './services/geminiService';
import { Fakemon } from './types';
import FakemonForm from './components/FakemonForm';
import FakemonCard from './components/FakemonCard';
import { PokeballIcon } from './components/icons';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [fakemon, setFakemon] = useState<Fakemon | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShinyLoading, setIsShinyLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for your Fakemon.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setFakemon(null);

    try {
      // Step 1: Generate the structured data for the Fakemon
      const details = await generateFakemonDetails(prompt);

      // Step 2: Generate the image using the original prompt and new details
      const imagePrompt = `A vibrant, high-quality image of a new Fakemon named ${details.name}. It is a ${details.types.join('/')} type. Description: ${prompt}. The style should be modern official Pokémon art, with a simple, clean background.`;
      const imageUrl = await generateFakemonImage(imagePrompt);

      setFakemon({ ...details, imageUrl });

    } catch (e) {
      console.error(e);
      setError('Failed to generate Fakemon. The model may be unavailable or the request was filtered. Please try again with a different prompt.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  const handleGenerateShiny = useCallback(async () => {
    if (!fakemon) return;

    setIsShinyLoading(true);
    setError(null);

    try {
      const shinyPrompt = `A "shiny" version of the Fakemon named ${fakemon.name}. It should have an alternate, rare, and visually distinct color palette compared to its standard form. Maintain the original design and style. Description for context: ${fakemon.description}. The style should be modern official Pokémon art, with a simple, clean background.`;
      const shinyImageUrl = await generateFakemonImage(shinyPrompt);

      setFakemon(prevFakemon => prevFakemon ? { ...prevFakemon, shinyImageUrl } : null);

    } catch (e) {
      console.error(e);
      setError('Failed to generate the shiny version. Please try again.');
    } finally {
      setIsShinyLoading(false);
    }
  }, [fakemon]);


  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-5xl text-center mb-8">
        <div className="flex justify-center items-center gap-4 mb-2">
          <PokeballIcon className="h-10 w-10 text-red-500" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500">
            Fakemon Generator
          </h1>
        </div>
        <p className="text-gray-400 text-lg">Bring your own Pokémon creations to life with AI!</p>
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <FakemonForm
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        </div>
        
        <div className="flex flex-col items-center justify-start">
          {error && (
            <div className="w-full p-4 mb-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
              <p className="font-semibold">An error occurred:</p>
              <p>{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-xl">
              <PokeballIcon className="h-16 w-16 text-gray-500 animate-spin" />
              <p className="mt-4 text-gray-400 text-lg">Generating your Fakemon...</p>
              <p className="text-gray-500 text-sm">This can take a moment.</p>
            </div>
          ) : fakemon ? (
            <FakemonCard 
              fakemon={fakemon}
              onGenerateShiny={handleGenerateShiny}
              isShinyLoading={isShinyLoading}
            />
          ) : (
            <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center text-center bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-xl p-8">
               <PokeballIcon className="h-16 w-16 text-gray-700 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-300">Your Creation Awaits</h2>
              <p className="text-gray-400 mt-2">Describe your idea on the left and click "Generate" to see your Fakemon appear here.</p>
              <p className="text-gray-500 mt-4 text-sm">Example: "A fluffy, electric-type sheep made of storm clouds."</p>
            </div>
          )}
        </div>
      </main>
       <footer className="w-full max-w-5xl text-center mt-12 text-gray-500 text-sm">
        <p>Powered by Google Gemini API. Fakemon Generator is a fan project and not affiliated with Nintendo or The Pokémon Company.</p>
      </footer>
    </div>
  );
};

export default App;