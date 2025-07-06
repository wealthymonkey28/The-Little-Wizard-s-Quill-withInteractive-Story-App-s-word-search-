import React, { useState } from 'react';
import { Wand2, Loader2, Sparkles, Book, ArrowRight } from 'lucide-react';

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

One day, while following a trail of shimmering letters that spelled "${input}", Whiskers discovered a hidden grove where words grew on trees like fruit. The magical tree in the center bore golden apples, each containing a different word.

"Welcome, young seeker," said the wise old tree. "I am the Tree of Knowledge, and these word-fruits hold the power to create amazing stories. But first, you must prove your understanding."

Whiskers carefully picked an apple labeled "ADVENTURE" and immediately felt a surge of excitement. The grove began to glow, and suddenly Whiskers could see all the hidden words floating around: "brave", "journey", "magical", "friendship", and "wonder".

From that day forward, Whiskers became the greatest storyteller in all of ${input.charAt(0).toUpperCase() + input.slice(1)}, using the magical words to inspire young readers everywhere. And whenever someone types "${input}" on their magical keyboard, they too can access this wonderful power of storytelling.

The End... or is it just the Beginning? ✨`,
        title: `The Adventures of Whiskers in ${input.charAt(0).toUpperCase() + input.slice(1)}`,
        targetWords: ['adventure', 'brave', 'journey', 'magical', 'friendship', 'wonder', 'mystical', 'curious', 'enchanted', 'legendary']
      })
    },
    {
      pattern: /\d+/,
      generator: (input) => ({
        content: `Once upon a time, in a kingdom where numbers held magical powers, there lived ${input} friendly dragons. These weren't scary dragons - oh no! - they were the Mathematical Dragons of Mount Calculation.

Each dragon had a special gift. The first dragon could count to ${input}, the second could add numbers faster than lightning, and the third could solve puzzles that made even the wisest mathematicians scratch their heads.

One bright morning, the dragons discovered that ${input} magical scrolls had appeared in their cave. Each scroll contained a riddle about words and numbers. "We must solve these riddles," declared the eldest dragon, "for they will teach young adventurers the power of both numbers and letters!"

The dragons worked together, using their counting skills and word magic. They learned that ${input} is not just a number - it represents quantity, possibility, and the foundation of all mathematical adventures.

When they finished solving all ${input} riddles, the scrolls transformed into a beautiful library where numbers and words danced together in perfect harmony. From that day on, anyone who visited could learn the amazing connection between mathematics and storytelling.

And so, the number ${input} became known throughout the land as the Number of Wonder! 🔢✨`,
        title: `The ${input} Mathematical Dragons`,
        targetWords: ['mathematical', 'dragons', 'calculation', 'riddles', 'quantity', 'harmony', 'foundation', 'lightning', 'possibility', 'connection']
      })
    },
    {
      pattern: /.*/,
      generator: (input) => ({
        content: `Deep in the Whispering Woods, there existed a magical phenomenon known as the "Echo of Creativity." Whenever someone typed the mysterious combination "${input}" into the ancient Keyboard of Stories, something wonderful would happen.

Professor Scribble, a wise old owl who wore tiny spectacles, had been studying this phenomenon for many years. "Fascinating!" he would hoot. "It seems that any sequence of characters, no matter how random, can spark the most incredible adventures!"

One day, a young explorer typed "${input}" and immediately, the forest began to shimmer. Trees started growing books instead of leaves, flowers bloomed into colorful letters, and the brook began babbling actual words instead of just babbling!

"You see," explained Professor Scribble, adjusting his spectacles, "creativity doesn't come from perfect words or complete sentences. It comes from curiosity, imagination, and the willingness to explore the unknown."

The young explorer learned that day that "${input}" wasn't just random typing - it was the beginning of infinite possibilities. Every character was a seed, every letter a potential adventure, and every story a bridge between imagination and reality.

From that moment on, the Whispering Woods echoed with the laughter and wonder of countless young storytellers, all discovering that magic can be found in the most unexpected places - even in "${input}"!

Remember: Every great story starts with a single word, letter, or even a curious combination like "${input}". What story will you create next? 🌟`,
        title: `The Mystery of "${input}"`,
        targetWords: ['creativity', 'phenomenon', 'mysterious', 'fascinating', 'explorer', 'shimmer', 'curiosity', 'imagination', 'possibilities', 'unexpected']
      })
    }
  ];

  const generateStory = () => {
    if (!userInput.trim()) return;

    setIsLoading(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      // Find the appropriate template
      const template = storyTemplates.find(t => t.pattern.test(userInput)) || storyTemplates[2];
      const story = template.generator(userInput);
      
      setGeneratedStory(story);
      setIsLoading(false);
      
      // Notify parent component
      if (onStoryGenerated) {
        onStoryGenerated(story);
      }
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      generateStory();
    }
  };

  const resetGenerator = () => {
    setUserInput('');
    setGeneratedStory(null);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="card-magical animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 magical-title flex items-center justify-center gap-3">
              <Wand2 className="text-purple-600" />
              🪶 The Little Wizard's Quill ✨
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Type anything - random letters, numbers, or even gibberish - and watch the magic happen! 
              Our enchanted quill will transform your keystrokes into wonderful stories.
            </p>
          </div>

          {/* Input Section */}
          <div className="mb-8">
            <div className="mb-4">
              <label htmlFor="story-input" className="block text-sm font-medium text-gray-700 mb-2">
                ✨ Cast Your Spell (Type Anything!)
              </label>
              <input
                id="story-input"
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type anything... 'asdf', '123', 'purple monkey' - anything works!"
                className="input-magical"
                disabled={isLoading}
              />
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={generateStory}
                disabled={!userInput.trim() || isLoading}
                className="btn-magical flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Weaving Magic...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Generate Story
                  </>
                )}
              </button>
              
              {generatedStory && (
                <button
                  onClick={resetGenerator}
                  className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                >
                  New Story
                </button>
              )}
            </div>
          </div>

          {/* Generated Story */}
          {generatedStory && (
            <div className="animate-fadeIn">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Book className="text-purple-600" />
                  {generatedStory.title}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {generatedStory.content}
                  </p>
                </div>
              </div>

              {/* Target Words for Exploration */}
              {generatedStory.targetWords && generatedStory.targetWords.length > 0 && (
                <div className="bg-blue-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <Sparkles className="text-blue-600" />
                    Words to Explore in Your Story
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {generatedStory.targetWords.map((word, index) => (
                      <span
                        key={index}
                        className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                  <p className="text-blue-700 text-sm mt-3">
                    💡 Tip: Try the Word Search mode to find these words in your story!
                  </p>
                </div>
              )}

              {/* Success Message */}
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold text-green-800 mb-2">
                  � Your Story Has Been Created!
                </h3>
                <p className="text-green-700 mb-4">
                  Amazing! You've just transformed "{userInput}" into a magical story. 
                  Your story has been saved and you can now explore it in Word Search mode or test your comprehension in Quiz mode!
                </p>
                <div className="flex justify-center">
                  <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                    <ArrowRight size={16} />
                    Check the navigation above to explore your story further!
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* How It Works */}
          {!generatedStory && (
            <div className="bg-yellow-50 rounded-xl p-6 mt-8">
              <h3 className="text-lg font-bold text-yellow-800 mb-3">
                🪄 How The Magic Works
              </h3>
              <div className="space-y-2 text-yellow-700">
                <p>• <strong>Type anything:</strong> Random letters, numbers, words, or symbols</p>
                <p>• <strong>Watch the magic:</strong> Our AI transforms your input into a complete story</p>
                <p>• <strong>Explore & learn:</strong> Use Word Search and Quiz modes with your generated story</p>
                <p>• <strong>Have fun:</strong> There are no wrong answers - every input creates a unique adventure!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LittleWizardQuill;