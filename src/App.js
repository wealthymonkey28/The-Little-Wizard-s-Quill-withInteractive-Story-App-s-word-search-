import React, { useState } from 'react';
import { Wand2, Book, Brain, Home } from 'lucide-react';
import LittleWizardQuill from './components/LittleWizardQuill';
import InteractiveStoryApp from './components/InteractiveStoryApp';

function App() {
  const [currentMode, setCurrentMode] = useState('home');
  const [generatedStories, setGeneratedStories] = useState([]);

  const addGeneratedStory = (story) => {
    const newStory = {
      id: Date.now(),
      title: story.title || "Generated Story",
      icon: "✨",
      difficulty: "Custom",
      content: story.content,
      targetWords: story.targetWords || [],
      color: "from-indigo-400 to-purple-500"
    };
    setGeneratedStories(prev => [...prev, newStory]);
  };

  const renderCurrentMode = () => {
    switch (currentMode) {
      case 'quill':
        return <LittleWizardQuill onStoryGenerated={addGeneratedStory} />;
      case 'explorer':
        return <InteractiveStoryApp generatedStories={generatedStories} mode="search" />;
      case 'quiz':
        return <InteractiveStoryApp generatedStories={generatedStories} mode="quiz" />;
      default:
        return <HomeScreen setCurrentMode={setCurrentMode} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {currentMode !== 'home' && (
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentMode('home')}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
              >
                <Home size={20} />
                <span className="font-semibold">Home</span>
              </button>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentMode('quill')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentMode === 'quill' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-purple-600 hover:bg-purple-100'
                  }`}
                >
                  <Wand2 size={20} />
                  <span>Story Generator</span>
                </button>
                <button
                  onClick={() => setCurrentMode('explorer')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentMode === 'explorer' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-purple-600 hover:bg-purple-100'
                  }`}
                >
                  <Book size={20} />
                  <span>Word Search</span>
                </button>
                <button
                  onClick={() => setCurrentMode('quiz')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentMode === 'quiz' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-purple-600 hover:bg-purple-100'
                  }`}
                >
                  <Brain size={20} />
                  <span>Quiz Mode</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
      
      {renderCurrentMode()}
    </div>
  );
}

// Home Screen Component
const HomeScreen = ({ setCurrentMode }) => {
  const modes = [
    {
      id: 'quill',
      title: '🪶 The Little Wizard\'s Quill',
      description: 'Transform random keystrokes into magical stories! Type anything and watch AI create enchanting tales.',
      icon: <Wand2 className="text-purple-600" size={32} />,
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      id: 'explorer',
      title: '📚 Interactive Story Explorer',
      description: 'Discover hidden words in magical stories! Search for words with spelling help included.',
      icon: <Book className="text-blue-600" size={32} />,
      gradient: 'from-blue-400 to-teal-500'
    },
    {
      id: 'quiz',
      title: '🧠 Story Quiz Mode',
      description: 'Test your comprehension! Answer questions about the stories and earn points.',
      icon: <Brain className="text-green-600" size={32} />,
      gradient: 'from-green-400 to-blue-500'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            ✨ Magical Story Adventures ✨
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your adventure! Generate stories from chaos, explore magical tales, or test your knowledge with fun quizzes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modes.map((mode) => (
            <div
              key={mode.id}
              onClick={() => setCurrentMode(mode.id)}
              className={`cursor-pointer transform hover:scale-105 transition-all duration-300 rounded-xl p-8 bg-gradient-to-br ${mode.gradient} text-white shadow-lg hover:shadow-xl`}
            >
              <div className="text-center mb-6">
                {mode.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">{mode.title}</h3>
              <p className="text-lg opacity-90 text-center leading-relaxed">
                {mode.description}
              </p>
              <div className="mt-6 text-center">
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-lg font-semibold transition-all">
                  Start Adventure →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            Perfect for kids learning to read, spell, and explore their imagination! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;