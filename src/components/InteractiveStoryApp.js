import React, { useState, useCallback, useMemo } from 'react';
import { Book, Search, RotateCcw, Lightbulb, Star, Heart, Wand2, Brain } from 'lucide-react';

// Spelling correction dictionary
const spellingCorrections = {
  'bewtiful': 'beautiful', 'beutiful': 'beautiful', 'beautifull': 'beautiful',
  'frend': 'friend', 'freind': 'friend', 'friedn': 'friend',
  // ... other corrections ...
};

// Collection of interactive stories
const predefinedStories = [
  {
    id: 1,
    title: "The Magic Forest Adventure",
    icon: "🌲",
    difficulty: "Easy",
    content: `Once upon a time, in a beautiful magic forest, there lived a little rabbit named Luna. The forest was full of wonderful animals and colorful flowers. One sunny morning, Luna decided to go on an adventure to find the secret rainbow treasure hidden deep in the forest.

She met a wise old owl who told her, “Follow the path of golden leaves, and you will find what you seek.” Luna hopped along the path, making friends with a friendly squirrel and a singing bird. Together, they discovered a magical clearing where the rainbow treasure sparkled in the sunlight.

The treasure was not gold or jewels, but a beautiful garden where all the forest animals could play together happily forever.`, 
    targetWords: ['beautiful', 'magic', 'forest', 'little', 'rabbit', 'animals', 'flowers', 'adventure', 'secret', 'rainbow', 'treasure', 'golden', 'friends', 'magical', 'garden', 'happy'], 
    color: "from-green-400 to-blue-500" 
  },
  {
    id: 2, 
    title: "Princess and the Castle Mystery", 
    icon: "👑", 
    difficulty: "Medium", 
    content: `In a faraway kingdom, Princess Aria lived in a magnificent castle on top of a high mountain. The castle had many secret rooms and hidden passages. One day, the princess discovered that her favorite magical crown had disappeared from the royal treasure room.

She decided to solve this mystery herself. With the help of her loyal friend, a clever wizard named Merlin, they searched every room in the castle. They found strange clues: golden footprints, mysterious notes, and magical sparkles in the air.

After a long journey through the castle’s secret passages, they discovered that a playful dragon had borrowed the crown to decorate his cave for a surprise party. The dragon wanted to celebrate the princess’s birthday! Princess Aria was so happy that she invited the dragon to live in the castle and become the royal party planner.`, 
    targetWords: ['kingdom', 'princess', 'castle', 'mountain', 'secret', 'magical', 'crown', 'treasure', 'mystery', 'wizard', 'clues', 'golden', 'journey', 'dragon', 'surprise', 'birthday', 'party'], 
    color: "from-purple-400 to-pink-500" 
  },
  // ... other predefined stories ...
];

// Quiz questions for stories
const quizQuestions = {
  1: [ // Magic Forest Adventure
    {
      question: "What was the main character's name?",
      options: ["Luna", "Ruby", "Star", "Moon"],
      correct: 0,
      explanation: "The little rabbit was named Luna."
    },
    {
      question: "What was Luna searching for?",
      options: ["Golden leaves", "Rainbow treasure", "Magic flowers", "Friendly squirrel"],
      correct: 1,
      explanation: "Luna was looking for the secret rainbow treasure hidden in the forest."
    },
    {
      question: "What did the wise old owl tell Luna to follow?",
      options: ["Rainbow colors", "Bird songs", "Golden leaves", "Flower petals"],
      correct: 2,
      explanation: "The owl said to follow the path of golden leaves."
    },
    {
      question: "What was the real treasure Luna found?",
      options: ["Gold coins", "Precious jewels", "A beautiful garden", "Magic powers"],
      correct: 2,
      explanation: "The treasure was a beautiful garden where all animals could play together."
    }
  ],
  2: [ // Princess and Castle Mystery
    {
      question: "What disappeared from Princess Aria's treasure room?",
      options: ["Golden ring", "Magical crown", "Royal necklace", "Silver shoes"],
      correct: 1,
      explanation: "Princess Aria's favorite magical crown had disappeared."
    },
    {
      question: "Who helped the princess solve the mystery?",
      options: ["A dragon", "Merlin the wizard", "A talking cat", "Her parents"],
      correct: 1,
      explanation: "Merlin, a clever wizard, helped Princess Aria search the castle."
    },
    {
      question: "Who had taken the crown?",
      options: ["A thief", "A playful dragon", "An evil witch", "A royal guard"],
      correct: 1,
      explanation: "A playful dragon had borrowed the crown to decorate his cave."
    },
    {
      question: "Why did the dragon take the crown?",
      options: ["To keep it forever", "To sell it", "For a surprise party", "To play a trick"],
      correct: 2,
      explanation: "The dragon wanted to celebrate the princess's birthday with a surprise party."
    }
  ],
  3: [ // Village of Singing Animals
    {
      question: "What made the village special?",
      options: ["Flying animals", "Singing animals", "Dancing trees", "Magic flowers"],
      correct: 1,
      explanation: "All the animals in the village would sing beautiful songs together every morning."
    },
    {
      question: "What was the girl's name?",
      options: ["Harmony", "Melody", "Rhythm", "Song"],
      correct: 1,
      explanation: "The young girl who moved to the village was named Melody."
    },
    {
      question: "What did the old musician give Melody?",
      options: ["A violin", "A piano", "A special flute", "A guitar"],
      correct: 2,
      explanation: "The old musician gave Melody a special flute made from a magical tree."
    },
    {
      question: "What did Melody become in the end?",
      options: ["A singer", "A conductor", "A dancer", "A teacher"],
      correct: 1,
      explanation: "Melody became the conductor of the most beautiful orchestra in the world."
    }
  ],
  4: [ // Ocean's Secret Lighthouse
    {
      question: "Who was the main character exploring the lighthouse?",
      options: ["Captain Marina", "Sailor Sam", "Explorer Emma", "Navigator Nick"],
      correct: 0,
      explanation: "Captain Marina was the brave explorer who decided to investigate the mysterious lighthouse."
    },
    {
      question: "What covered the lighthouse?",
      options: ["Moss and vines", "Ice and snow", "Seashells and coral", "Paint and drawings"],
      correct: 2,
      explanation: "The lighthouse was covered in beautiful seashells and coral."
    },
    {
      question: "Who lived inside the lighthouse?",
      options: ["An old sailor", "A sea spirit", "A mermaid", "A wise owl"],
      correct: 1,
      explanation: "Marina discovered a friendly sea spirit who had been the guardian of the ocean for centuries."
    },
    {
      question: "How long had the spirit been guarding the ocean?",
      options: ["Decades", "Years", "Centuries", "Months"],
      correct: 2,
      explanation: "The spirit had been the guardian of the ocean for centuries."
    }
  ],
  5: [ // Inventor's Flying Machine
    {
      question: "What was the inventor's name?",
      options: ["Doctor Wheels", "Professor Gears", "Engineer Springs", "Master Tools"],
      correct: 1,
      explanation: "The curious inventor was named Professor Gears."
    },
    {
      question: "What inspired the professor's final design?",
      options: ["Birds flying", "Butterflies dancing", "Leaves falling", "Clouds moving"],
      correct: 1,
      explanation: "While watching butterflies dance in his garden, the professor had a brilliant idea."
    },
    {
      question: "What powered the flying machine?",
      options: ["Wind and solar", "Steam and magic crystals", "Electricity and gears", "Oil and springs"],
      correct: 1,
      explanation: "The flying machine was powered by a combination of steam and magic crystals he had discovered."
    },
    {
      question: "What happened after the professor's first flight?",
      options: ["He kept it secret", "He sold the machine", "He taught other inventors", "He built more machines alone"],
      correct: 2,
      explanation: "Soon, he was teaching other inventors how to build flying machines, and the sky became filled with wonderful flying contraptions."
    }
  ]
};

// Combine predefined and generated stories
const InteractiveStoryApp = ({ generatedStories = [], mode = 'search' }) => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [foundWords, setFoundWords] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  
  // Quiz mode state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  
  const stories = [...predefinedStories, ...generatedStories];

  // Function to correct spelling using the dictionary
  const correctSpelling = useCallback((word) => {
    const lowerWord = word.toLowerCase();
    return spellingCorrections[lowerWord] || word;
  }, []);

  // Function to check if a word (or its corrected version) exists in the story
  const findWordInStory = useCallback((searchWord, story) => {
    if (!story) return false;
    const correctedWord = correctSpelling(searchWord);
    const storyText = story.content.toLowerCase();
    const targetWords = story.targetWords.map(w => w.toLowerCase());
    return storyText.includes(correctedWord.toLowerCase()) || 
           targetWords.includes(correctedWord.toLowerCase());
  }, [correctSpelling]);

  // Handle word search
  const handleSearch = useCallback(() => {
    if (!searchTerm.trim() || !selectedStory) return;
    const correctedWord = correctSpelling(searchTerm.trim());
    const wordExists = findWordInStory(correctedWord, selectedStory);
    setAttempts(prev => prev + 1);
    if (wordExists && !foundWords.includes(correctedWord.toLowerCase())) {
      setFoundWords(prev => [...prev, correctedWord.toLowerCase()]);
      setScore(prev => prev + 10);
      if (correctedWord.toLowerCase() !== searchTerm.toLowerCase()) {
        alert(`Great! I found "${correctedWord}" in the story! (I corrected "${searchTerm}" to "${correctedWord}")`);
      }
    }
    setSearchTerm('');
  }, [searchTerm, selectedStory, correctSpelling, findWordInStory, foundWords]);

  // Quiz mode functions
  const getCurrentQuestions = useCallback(() => {
    if (!selectedStory || !quizQuestions[selectedStory.id]) return [];
    return quizQuestions[selectedStory.id];
  }, [selectedStory]);

  const handleAnswerSelect = useCallback((answerIndex) => {
    setSelectedAnswer(answerIndex);
  }, []);

  const handleAnswerSubmit = useCallback(() => {
    if (selectedAnswer === null) return;
    
    const questions = getCurrentQuestions();
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setScore(prev => prev + 20);
    }
    
    setAttempts(prev => prev + 1);
    setShowExplanation(true);
  }, [selectedAnswer, currentQuestionIndex, getCurrentQuestions]);

  const handleNextQuestion = useCallback(() => {
    const questions = getCurrentQuestions();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  }, [currentQuestionIndex, getCurrentQuestions]);

  // Reset game
  const resetGame = useCallback(() => {
    setFoundWords([]);
    setScore(0);
    setAttempts(0);
    setSearchTerm('');
    // Quiz mode reset
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizCompleted(false);
    setCorrectAnswers(0);
  }, []);

  // Get progress percentage
  const progressPercentage = useMemo(() => {
    if (!selectedStory) return 0;
    
    if (mode === 'quiz') {
      const questions = getCurrentQuestions();
      if (questions.length === 0) return 0;
      return Math.round((correctAnswers / questions.length) * 100);
    } else {
      return Math.round((foundWords.length / selectedStory.targetWords.length) * 100);
    }
  }, [foundWords.length, selectedStory, mode, correctAnswers, getCurrentQuestions]);

  // Get unfound words for hints
  const getHints = useCallback(() => {
    if (!selectedStory) return [];
    return selectedStory.targetWords
      .filter(word => !foundWords.includes(word.toLowerCase()))
      .slice(0, 3);
  }, [selectedStory, foundWords]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            {mode === 'quiz' ? <Brain className="text-green-600" /> : <Book className="text-purple-600" />}
            {mode === 'quiz' ? 'Story Quiz Mode' : 'Interactive Story Explorer'}
          </h1>
          <p className="text-gray-600">
            {mode === 'quiz' 
              ? 'Test your comprehension with fun questions about the stories!' 
              : 'Discover hidden words in magical stories!'
            }
          </p>
        </div>

        {!selectedStory ? (
          /* Story Selection */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className={`cursor-pointer transform hover:scale-105 transition-all duration-300 rounded-xl p-6 bg-gradient-to-br ${story.color} text-white shadow-lg hover:shadow-xl`}
              >
                <div className="text-4xl mb-4 text-center">{story.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-center">{story.title}</h3>
                <div className="flex items-center justify-between text-sm opacity-90">
                  <span className="bg-white bg-opacity-20 px-2 py-1 rounded">
                    {story.difficulty}
                  </span>
                  <span>{story.targetWords.length} words to find</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Story Game Interface */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Story Content */}
            <div className="lg:col-span-2">
              <div className={`rounded-xl p-6 bg-gradient-to-br ${selectedStory.color} text-white shadow-lg mb-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span className="text-3xl">{selectedStory.icon}</span>
                    {selectedStory.title}
                  </h2>
                  <button
                    onClick={() => setSelectedStory(null)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-lg transition-colors"
                  >
                    ← Back
                  </button>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <p className="text-lg leading-relaxed whitespace-pre-line">
                    {selectedStory.content}
                  </p>
                </div>
              </div>

              {/* Search Interface (Search Mode) */}
              {mode === 'search' && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Type a word from the story... (spelling help included!)"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
                      />
                    </div>
                    <button
                      onClick={handleSearch}
                      disabled={!searchTerm.trim()}
                      className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                    >
                      <Search size={20} />
                      Search
                    </button>
                  </div>

                  {/* Spelling Help Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-blue-800 flex items-center gap-2">
                      <Lightbulb size={16} />
                      <strong>Spelling Help:</strong> Don't worry about perfect spelling! I can help correct common misspellings.
                    </p>
                  </div>
                </div>
              )}

              {/* Quiz Interface (Quiz Mode) */}
              {mode === 'quiz' && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  {getCurrentQuestions().length > 0 ? (
                    <>
                      {!quizCompleted ? (
                        <>
                          {/* Question Progress */}
                          <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-gray-600">
                                Question {currentQuestionIndex + 1} of {getCurrentQuestions().length}
                              </span>
                              <span className="text-sm text-green-600 font-medium">
                                Score: {score} points
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentQuestionIndex + 1) / getCurrentQuestions().length) * 100}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Current Question */}
                          <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">
                              {getCurrentQuestions()[currentQuestionIndex]?.question}
                            </h3>
                            <div className="space-y-3">
                              {getCurrentQuestions()[currentQuestionIndex]?.options.map((option, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleAnswerSelect(index)}
                                  disabled={showExplanation}
                                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                                    selectedAnswer === index
                                      ? showExplanation
                                        ? index === getCurrentQuestions()[currentQuestionIndex]?.correct
                                          ? 'border-green-500 bg-green-50 text-green-800'
                                          : 'border-red-500 bg-red-50 text-red-800'
                                        : 'border-blue-500 bg-blue-50 text-blue-800'
                                      : showExplanation && index === getCurrentQuestions()[currentQuestionIndex]?.correct
                                        ? 'border-green-500 bg-green-50 text-green-800'
                                        : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                                  } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                  <span className="font-medium mr-3">
                                    {String.fromCharCode(65 + index)}.
                                  </span>
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-4">
                            {!showExplanation ? (
                              <button
                                onClick={handleAnswerSubmit}
                                disabled={selectedAnswer === null}
                                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
                              >
                                Submit Answer
                              </button>
                            ) : (
                              <button
                                onClick={handleNextQuestion}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                              >
                                {currentQuestionIndex < getCurrentQuestions().length - 1 ? 'Next Question' : 'Finish Quiz'}
                              </button>
                            )}
                          </div>

                          {/* Explanation */}
                          {showExplanation && (
                            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <p className="text-yellow-800">
                                <strong>Explanation:</strong> {getCurrentQuestions()[currentQuestionIndex]?.explanation}
                              </p>
                            </div>
                          )}
                        </>
                      ) : (
                        /* Quiz Completed */
                        <div className="text-center py-8">
                          <div className="text-6xl mb-4">🎉</div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-4">Quiz Completed!</h3>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                            <p className="text-lg text-green-800 mb-2">
                              <strong>Final Score: {score} points</strong>
                            </p>
                            <p className="text-green-700">
                              You answered {correctAnswers} out of {getCurrentQuestions().length} questions correctly!
                            </p>
                            <p className="text-sm text-green-600 mt-2">
                              Accuracy: {Math.round((correctAnswers / getCurrentQuestions().length) * 100)}%
                            </p>
                          </div>
                          <button
                            onClick={resetGame}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                          >
                            Try Again
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 text-lg mb-4">
                        Quiz questions are not available for this story yet.
                      </p>
                      <p className="text-sm text-gray-500">
                        Try selecting a different story or use Word Search mode instead!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Game Stats and Progress */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Star className="text-yellow-500" />
                  Game Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Score:</span>
                    <span className="font-bold text-purple-600">{score}</span>
                  </div>
                  {mode === 'search' ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Words Found:</span>
                        <span className="font-bold text-green-600">{foundWords.length}/{selectedStory.targetWords.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Attempts:</span>
                        <span className="font-bold text-blue-600">{attempts}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Correct Answers:</span>
                        <span className="font-bold text-green-600">{correctAnswers}/{getCurrentQuestions().length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Question:</span>
                        <span className="font-bold text-blue-600">
                          {quizCompleted ? getCurrentQuestions().length : currentQuestionIndex + 1}/{getCurrentQuestions().length}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-center text-sm text-gray-600">{progressPercentage}% Complete</p>
                </div>
                <button
                  onClick={resetGame}
                  className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <RotateCcw size={16} />
                  Reset Game
                </button>
              </div>

              {/* Found Words (Search Mode Only) */}
              {mode === 'search' && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Heart className="text-red-500" />
                    Found Words
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {foundWords.length > 0 ? (
                      foundWords.map((word, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {word}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No words found yet. Start searching!</p>
                    )}
                  </div>
                </div>
              )}

              {/* Quiz Progress (Quiz Mode Only) */}
              {mode === 'quiz' && getCurrentQuestions().length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Brain className="text-purple-500" />
                    Quiz Progress
                  </h3>
                  <div className="space-y-3">
                    {getCurrentQuestions().map((question, index) => (
                      <div key={index} className={`p-3 rounded-lg border-2 ${
                        index < currentQuestionIndex 
                          ? 'border-green-200 bg-green-50' 
                          : index === currentQuestionIndex 
                            ? 'border-blue-200 bg-blue-50' 
                            : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Question {index + 1}
                          </span>
                          <span className="text-xs">
                            {index < currentQuestionIndex 
                              ? '✅ Completed' 
                              : index === currentQuestionIndex 
                                ? '📝 Current' 
                                : '⏳ Pending'
                            }
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hints */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Lightbulb className="text-yellow-500" />
                  {mode === 'quiz' ? 'Tips' : 'Hints'}
                </h3>
                <div className="space-y-2">
                  {mode === 'search' ? (
                    getHints().length > 0 ? (
                      getHints().map((hint, index) => (
                        <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <p className="text-sm text-yellow-800">
                            Try looking for: <strong>{hint}</strong>
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">
                        {foundWords.length === selectedStory.targetWords.length 
                          ? "🎉 Congratulations! You found all the words!" 
                          : "Keep searching for more words!"}
                      </p>
                    )
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-800">
                          📚 <strong>Read carefully:</strong> Pay attention to details in the story before answering.
                        </p>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-800">
                          🎯 <strong>Take your time:</strong> There's no rush, think about each question carefully.
                        </p>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <p className="text-sm text-purple-800">
                          ✨ <strong>Learn from explanations:</strong> Read why each answer is correct to learn more!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveStoryApp;
