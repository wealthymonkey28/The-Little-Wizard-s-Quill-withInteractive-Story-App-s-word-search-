import React, { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';

const LittleWizardQuill = ({ onStoryGenerated }) => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedStory, setGeneratedStory] = useState(null);

  // Story templates for generation
  const storyTemplates = [
    {
      pattern: /[a-z]{4,}/i,
      generator: (input) => ({
        content: `In the mystical land of ${input.charAt(0).toUpperCase() + input.slice(1)}, there lived a curious creature named Whiskers. Every morning, Whiskers would venture into the enchanted forest, searching for the legendary Crystal of Understanding.

One day, while following a trail of shimmering letters that spelled "${input}", Whiskers discovered a hidden grove where words grew on trees like fruit. The ancient Tree of Stories whispered, "Those who can find meaning in chaos possess the greatest magic of all."

Whiskers learned that even the most random combinations of letters held secret messages from the universe, waiting to be discovered by those brave enough to look beyond the surface.`,
        targetWords: ['mystical', 'creature', 'whiskers', 'enchanted', 'forest', 'legendary', 'crystal', 'understanding', 'shimmering', 'letters', 'discovered', 'hidden', 'grove', 'ancient', 'stories', 'meaning', 'chaos', 'magic', 'random', 'messages', 'universe', 'surface']
      })
    },
    {
      pattern: /\d/,
      generator: (input) => ({
        content: `Captain Nova's spaceship received a mysterious transmission: "${input}". The ship's AI couldn't decode it, but Nova knew better—sometimes the most important messages come disguised as random noise.

As Nova input the sequence into the ancient Galactic Archive, something extraordinary happened. The letters and numbers rearranged themselves, revealing coordinates to a lost planet where creativity itself was born.

The journey to this world would be perilous, but Nova understood that within every seemingly meaningless string of characters lay the seeds of infinite possibility, waiting for the right explorer to unlock their secrets.`,
        targetWords: ['captain', 'spaceship', 'mysterious', 'transmission', 'decode', 'important', 'messages', 'disguised', 'random', 'noise', 'sequence', 'ancient', 'galactic', 'archive', 'extraordinary', 'letters', 'numbers', 'coordinates', 'planet', 'creativity', 'journey', 'perilous', 'meaningless', 'characters', 'infinite', 'possibility', 'explorer', 'secrets']
      })
    },
    {
      pattern: /.*/,
      generator: (input) => ({
        content: `In Professor Luna's Laboratory of Lost Languages, the string "${input}" appeared on her quantum typewriter—a device that translated thoughts from parallel dimensions.

As Luna studied the mysterious characters, she realized they weren't random at all. They were a greeting from a civilization that communicated entirely through what others might consider gibberish. Each letter combination was a window into their world of pure imagination.

With trembling hands, Luna typed back her own string of "nonsense," beginning the first conversation between worlds that spoke the language of creative chaos. Sometimes, she thought, the most profound communication happens when we abandon the need to make conventional sense.`,
        targetWords: ['professor', 'laboratory', 'languages', 'quantum', 'typewriter', 'device', 'translated', 'thoughts', 'parallel', 'dimensions', 'mysterious', 'characters', 'random', 'greeting', 'civilization', 'communicated', 'gibberish', 'combination', 'window', 'imagination', 'trembling', 'nonsense', 'conversation', 'worlds', 'language', 'creative', 'chaos', 'profound', 'communication', 'conventional']
      })
    }
  ];

  const generateStory = (input) => {
    // Find the best matching template
    const template = storyTemplates.find(t => t.pattern.test(input)) || storyTemplates[storyTemplates.length - 1];
    return template.generator(input);
  };

  const simulateAPICall = (input) => {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        const story = generateStory(input);
        resolve(story);
      }, 1500 + Math.random() * 1000); // 1.5-2.5 seconds
    });
  };

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      alert('Please enter some text first! 🤔');
      return;
    }

    setIsLoading(true);
    setGeneratedStory(null);

    try {
      const result = await simulateAPICall(userInput);
      
      // Create a story object for the interactive app
      const storyForExplorer = {
        title: `Story from "${userInput}"`,
        content: result.content,
        targetWords: result.targetWords
      };
      
      setGeneratedStory(result);
      
      // Add to generated stories for use in other modes
      if (onStoryGenerated) {
        onStoryGenerated(storyForExplorer);
      }
      
    } catch (error) {
      console.error('Error generating story:', error);
      setGeneratedStory({
        content: 'Oops! The quill is out of ink. Please try again in a moment! 🪶',
        targetWords: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (example) => {
    setUserInput(example);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  const examples = ['kjhgfdsa', 'Hdfclife', 'qqwweerr', 'zxcvbnm', '123abc', 'mmmkkk'];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Wand2 className="text-purple-600" />
            🪶 The Little Wizard's Quill ✨
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform random keystrokes into magical stories! Type anything—gibberish, random characters, 
            or what your little one typed—and watch AI find hidden meaning and create enchanting tales.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 animate-fadeIn">
          <div className="space-y-6">
            <div>
              <input 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type random characters... e.g., kjhgfd, asdfgh, or Hdfclife"
                maxLength="200"
                className="w-full px-6 py-4 text-lg border-3 border-gray-300 rounded-xl bg-white transition-all duration-300 outline-none focus:border-purple-500 focus:shadow-lg focus:transform focus:scale-[1.02]"
              />
            </div>
            
            <button 
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full py-4 text-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 border-none rounded-xl cursor-pointer transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  Consulting the quill...
                </span>
              ) : (
                '✨ Reveal the Hidden Story ✨'
              )}
            </button>
          </div>
        </div>

        {/* Examples */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Try these examples:</h3>
          <div className="flex flex-wrap gap-3">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="px-4 py-2 bg-white border-2 border-purple-400 text-purple-600 rounded-full cursor-pointer transition-all duration-300 hover:bg-purple-600 hover:text-white hover:transform hover:scale-105 text-sm font-medium"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center animate-fadeIn">
            <div className="flex items-center justify-center gap-3 text-purple-600">
              <Loader2 className="animate-spin" size={24} />
              <span className="text-lg font-medium">Consulting the quill... ✨</span>
            </div>
          </div>
        )}

        {/* Story Output */}
        {generatedStory && !isLoading && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border-l-4 border-purple-500 shadow-lg animate-slideIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <span>🪶</span>
              <span>Your Mystical Story</span>
            </h2>
            <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
              {generatedStory.content}
            </div>
            
            {generatedStory.targetWords && generatedStory.targetWords.length > 0 && (
              <div className="mt-6 p-4 bg-white rounded-lg border border-purple-200">
                <p className="text-sm text-purple-600 font-medium mb-2">
                  🎯 This story has been added to your collection! You can now explore it in Word Search or Quiz mode.
                </p>
                <p className="text-xs text-gray-500">
                  Contains {generatedStory.targetWords.length} hidden words to discover.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LittleWizardQuill;