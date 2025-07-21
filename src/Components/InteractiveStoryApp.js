import React, { useState, useCallback, useMemo } from 'react';
import { Book, Search, RotateCcw, Lightbulb, Star, Heart, Brain, CheckCircle, XCircle, Trophy, Timer } from 'lucide-react';

const InteractiveStoryApp = ({ generatedStories = [] }) => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [foundWords, setFoundWords] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameMode, setGameMode] = useState('search'); // 'search' or 'quiz'
  const [currentQuizWord, setCurrentQuizWord] = useState(null);
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAttempts, setQuizAttempts] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Spelling correction dictionary - maps common misspellings to correct words
  const spellingCorrections = {
    'bewtiful': 'beautiful', 'beutiful': 'beautiful', 'beautifull': 'beautiful',
    'frend': 'friend', 'freind': 'friend', 'friedn': 'friend',
    'happi': 'happy', 'hapy': 'happy', 'happpy': 'happy',
    'litle': 'little', 'littel': 'little', 'litttle': 'little',
    'magik': 'magic', 'majic': 'magic', 'magick': 'magic',
    'castl': 'castle', 'castel': 'castle', 'castell': 'castle',
    'prinses': 'princess', 'princes': 'princess', 'princcess': 'princess',
    'adventur': 'adventure', 'adventrue': 'adventure', 'advnture': 'adventure',
    'forrest': 'forest', 'froest': 'forest', 'forets': 'forest',
    'animel': 'animal', 'anamal': 'animal', 'animall': 'animal',
    'vilage': 'village', 'village': 'village', 'villege': 'village',
    'mountin': 'mountain', 'montain': 'mountain', 'moutain': 'mountain',
    'treasur': 'treasure', 'tresure': 'treasure', 'treasre': 'treasure',
    'dragn': 'dragon', 'drago': 'dragon', 'draggon': 'dragon',
    'wizar': 'wizard', 'wizerd': 'wizard', 'wisard': 'wizard',
    'kindom': 'kingdom', 'kingdm': 'kingdom', 'kingdon': 'kingdom',
    'secrt': 'secret', 'secert': 'secret', 'secrect': 'secret',
    'journy': 'journey', 'jurney': 'journey', 'journi': 'journey',
    'mystri': 'mystery', 'mistery': 'mystery', 'mysterey': 'mystery',
    'rainbo': 'rainbow', 'ranbow': 'rainbow', 'rainboe': 'rainbow',
    'gardn': 'garden', 'garde': 'garden', 'gardne': 'garden'
  };

  // Collection of interactive stories
  const stories = [
    {
      id: 1,
      title: "The Magic Forest Adventure",
      icon: "🌲",
      difficulty: "Easy",
      content: `Once upon a time, in a beautiful magic forest, there lived a little rabbit named Luna. The forest was full of wonderful animals and colorful flowers. One sunny morning, Luna decided to go on an adventure to find the secret rainbow treasure hidden deep in the forest.

She met a wise old owl who told her, "Follow the path of golden leaves, and you will find what you seek." Luna hopped along the path, making friends with a friendly squirrel and a singing bird. Together, they discovered a magical clearing where the rainbow treasure sparkled in the sunlight.

The treasure was not gold or jewels, but a beautiful garden where all the forest animals could play together happily forever.`,
      targetWords: ['beautiful', 'magic', 'forest', 'little', 'rabbit', 'animals', 'flowers', 'adventure', 'secret', 'rainbow', 'treasure', 'golden', 'friends', 'magical', 'garden', 'happy'],
      color: "from-green-400 to-blue-500",
      quizQuestions: [
        {
          question: "What was Luna looking for in the forest?",
          options: ["Golden leaves", "Rainbow treasure", "A wise owl", "Colorful flowers"],
          correct: 1
        },
        {
          question: "What kind of animal was Luna?",
          options: ["Squirrel", "Bird", "Rabbit", "Owl"],
          correct: 2
        },
        {
          question: "What did the treasure turn out to be?",
          options: ["Gold and jewels", "A beautiful garden", "A magical clearing", "Golden leaves"],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: "Princess and the Castle Mystery",
      icon: "👑",
      difficulty: "Medium",
      content: `In a faraway kingdom, Princess Aria lived in a magnificent castle on top of a high mountain. The castle had many secret rooms and hidden passages. One day, the princess discovered that her favorite magical crown had disappeared from the royal treasure room.

She decided to solve this mystery herself. With the help of her loyal friend, a clever wizard named Merlin, they searched every room in the castle. They found strange clues: golden footprints, mysterious notes, and magical sparkles in the air.

After a long journey through the castle's secret passages, they discovered that a playful dragon had borrowed the crown to decorate his cave for a surprise party. The dragon wanted to celebrate the princess's birthday! Princess Aria was so happy that she invited the dragon to live in the castle and become the royal party planner.`,
      targetWords: ['kingdom', 'princess', 'castle', 'mountain', 'secret', 'magical', 'crown', 'treasure', 'mystery', 'wizard', 'clues', 'golden', 'journey', 'dragon', 'surprise', 'birthday', 'party'],
      color: "from-purple-400 to-pink-500",
      quizQuestions: [
        {
          question: "What went missing from the treasure room?",
          options: ["A magical wand", "Golden footprints", "A magical crown", "Mysterious notes"],
          correct: 2
        },
        {
          question: "Who helped Princess Aria solve the mystery?",
          options: ["A dragon", "Merlin the wizard", "A party planner", "Golden footprints"],
          correct: 1
        },
        {
          question: "Why did the dragon take the crown?",
          options: ["To keep it forever", "To sell it", "For a surprise party", "To hide it"],
          correct: 2
        }
      ]
    },
    {
      id: 3,
      title: "The Village of Singing Animals",
      icon: "🎵",
      difficulty: "Medium",
      content: `In a charming little village nestled between rolling hills, something magical happened every morning. All the animals in the village would wake up and sing beautiful songs together. The dogs would bark melodies, the cats would purr harmonies, and the birds would add their sweet voices to create wonderful music.

A young girl named Melody moved to the village with her family. At first, she was amazed by the singing animals, but she felt sad because she couldn't join their morning concerts. Her voice was just an ordinary human voice.

One day, an old musician who lived in the village taught Melody that music comes from the heart, not just the voice. He gave her a special flute made from a magical tree. When Melody played the flute, her music blended perfectly with the animals' songs, and she became the conductor of the most beautiful orchestra in the world.`,
      targetWords: ['village', 'animals', 'magical', 'beautiful', 'songs', 'melodies', 'music', 'family', 'ordinary', 'musician', 'heart', 'special', 'flute', 'tree', 'orchestra', 'world'],
      color: "from-yellow-400 to-orange-500",
      quizQuestions: [
        {
          question: "What made the village special?",
          options: ["Rolling hills", "Singing animals", "Beautiful trees", "A magical flute"],
          correct: 1
        },
        {
          question: "What instrument did Melody receive?",
          options: ["A violin", "A piano", "A flute", "A drum"],
          correct: 2
        },
        {
          question: "What did the old musician teach Melody?",
          options: ["Music comes from the voice", "Music comes from the heart", "Music comes from practice", "Music comes from the flute"],
          correct: 1
        }
      ]
    },
    {
      id: 4,
      title: "The Ocean's Secret Lighthouse",
      icon: "🌊",
      difficulty: "Hard",
      content: `Far out in the deep blue ocean stood an ancient lighthouse on a mysterious island. The lighthouse had been abandoned for many years, but sailors reported seeing its light on stormy nights, guiding ships safely to shore.

Captain Marina, a brave explorer, decided to investigate this mystery. She sailed her ship through dangerous waters and finally reached the island. The lighthouse was covered in beautiful seashells and coral, and strange symbols were carved into its walls.

Inside the lighthouse, Marina discovered a friendly sea spirit who had been the guardian of the ocean for centuries. The spirit explained that the lighthouse was magical - it could sense when ships were in danger and would automatically light up to help them. The spirit had been lonely for so long, and Marina's visit brought joy back to the ancient guardian.

Marina promised to visit regularly and help spread the story of the magical lighthouse, so that sailors would know they were always protected by the caring sea spirit.`,
      targetWords: ['ocean', 'lighthouse', 'mysterious', 'island', 'ancient', 'sailors', 'stormy', 'ships', 'captain', 'explorer', 'dangerous', 'seashells', 'coral', 'symbols', 'spirit', 'guardian', 'centuries', 'magical', 'protected'],
      color: "from-blue-400 to-teal-500",
      quizQuestions: [
        {
          question: "Who investigated the mysterious lighthouse?",
          options: ["A sailor", "Captain Marina", "A sea spirit", "An ancient guardian"],
          correct: 1
        },
        {
          question: "What covered the lighthouse?",
          options: ["Strange symbols", "Seashells and coral", "Dangerous waters", "Stormy clouds"],
          correct: 1
        },
        {
          question: "How long had the sea spirit been the guardian?",
          options: ["Many years", "Decades", "Centuries", "Forever"],
          correct: 2
        }
      ]
    },
    {
      id: 5,
      title: "The Inventor's Flying Machine",
      icon: "⚙️",
      difficulty: "Hard",
      content: `In a bustling town filled with workshops and inventions, lived a curious inventor named Professor Gears. He spent his days creating amazing machines that could do incredible things. His workshop was filled with gears, springs, wires, and all sorts of mechanical wonders.

Professor Gears had always dreamed of building a machine that could fly like the birds. He worked day and night, designing and testing different flying contraptions. Some were too heavy, others too fragile, and many simply wouldn't leave the ground.

One day, while watching butterflies dance in his garden, the professor had a brilliant idea. He built a lightweight flying machine with wings that moved like a butterfly's, powered by a combination of steam and magic crystals he had discovered in the nearby mountains.

When the professor first flew his machine above the town, everyone cheered with amazement. Soon, he was teaching other inventors how to build flying machines, and the sky became filled with wonderful flying contraptions of all shapes and sizes.`,
      targetWords: ['town', 'workshops', 'inventions', 'inventor', 'professor', 'machines', 'incredible', 'gears', 'springs', 'wires', 'mechanical', 'wonders', 'dreamed', 'building', 'birds', 'designing', 'testing', 'contraptions', 'butterflies', 'garden', 'brilliant', 'lightweight', 'wings', 'steam', 'crystals', 'mountains', 'amazing', 'teaching', 'shapes'],
      color: "from-amber-400 to-red-500",
      quizQuestions: [
        {
          question: "What was Professor Gears trying to build?",
          options: ["A mechanical workshop", "A flying machine", "Magic crystals", "Steam engines"],
          correct: 1
        },
        {
          question: "What inspired the professor's final design?",
          options: ["Birds", "Butterflies", "Steam", "Crystals"],
          correct: 1
        },
        {
          question: "What powered the flying machine?",
          options: ["Gears and springs", "Steam and magic crystals", "Wires and mechanical parts", "Butterflies and wings"],
          correct: 1
        }
      ]
    },
    ...generatedStories
  ];

  // Timer effect for quiz mode
  React.useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameMode === 'quiz') {
      handleQuizTimeout();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, gameMode]);

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

  // Generate quiz question
  const generateQuizQuestion = useCallback(() => {
    if (!selectedStory || !selectedStory.quizQuestions) return;
    
    const availableQuestions = selectedStory.quizQuestions.filter(q => 
      !foundWords.includes(q.question.toLowerCase())
    );
    
    if (availableQuestions.length === 0) {
      // If no predefined questions left, generate word-finding quiz
      const availableWords = selectedStory.targetWords.filter(word => 
        !foundWords.includes(word.toLowerCase())
      );
      
      if (availableWords.length === 0) return;
      
      const targetWord = availableWords[Math.floor(Math.random() * availableWords.length)];
      const wrongWords = selectedStory.targetWords
        .filter(word => word !== targetWord)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      const options = [...wrongWords, targetWord].sort(() => 0.5 - Math.random());
      const correctIndex = options.indexOf(targetWord);
      
      setCurrentQuizWord({
        question: `Which word appears in the story "${selectedStory.title}"?`,
        options: options,
        correct: correctIndex,
        word: targetWord
      });
    } else {
      const question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      setCurrentQuizWord(question);
    }
    
    setSelectedAnswer(null);
    setShowQuizResult(false);
    setTimeLeft(30);
    setIsTimerActive(true);
  }, [selectedStory, foundWords]);

  // Handle quiz answer
  const handleQuizAnswer = useCallback((answerIndex) => {
    if (selectedAnswer !== null || !currentQuizWord) return;
    
    setSelectedAnswer(answerIndex);
    setIsTimerActive(false);
    setShowQuizResult(true);
    setQuizAttempts(prev => prev + 1);
    
    if (answerIndex === currentQuizWord.correct) {
      setQuizScore(prev => prev + 20);
      if (currentQuizWord.word && !foundWords.includes(currentQuizWord.word.toLowerCase())) {
        setFoundWords(prev => [...prev, currentQuizWord.word.toLowerCase()]);
        setScore(prev => prev + 10);
      }
    }
  }, [selectedAnswer, currentQuizWord, foundWords]);

  // Handle quiz timeout
  const handleQuizTimeout = useCallback(() => {
    if (selectedAnswer === null && currentQuizWord) {
      setShowQuizResult(true);
      setIsTimerActive(false);
      setQuizAttempts(prev => prev + 1);
    }
  }, [selectedAnswer, currentQuizWord]);

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

  // Switch game modes
  const switchGameMode = useCallback((mode) => {
    setGameMode(mode);
    if (mode === 'quiz') {
      generateQuizQuestion();
    } else {
      setIsTimerActive(false);
      setCurrentQuizWord(null);
      setSelectedAnswer(null);
      setShowQuizResult(false);
    }
  }, [generateQuizQuestion]);

  // Reset game
  const resetGame = useCallback(() => {
    setFoundWords([]);
    setScore(0);
    setAttempts(0);
    setSearchTerm('');
    setQuizScore(0);
    setQuizAttempts(0);
    setCurrentQuizWord(null);
    setSelectedAnswer(null);
    setShowQuizResult(false);
    setIsTimerActive(false);
    setTimeLeft(30);
  }, []);

  // Get progress percentage
  const progressPercentage = useMemo(() => {
    if (!selectedStory) return 0;
    return Math.round((foundWords.length / selectedStory.targetWords.length) * 100);
  }, [foundWords.length, selectedStory]);

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
            <Book className="text-purple-600" />
            Interactive Story Explorer
          </h1>
          <p className="text-gray-600">Discover hidden words in magical stories with search mode or test your knowledge with quiz mode!</p>
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
                {story.quizQuestions && (
                  <div className="mt-2 text-center">
                    <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                      Quiz Available!
                    </span>
                  </div>
                )}
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

              {/* Game Mode Selector */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={() => switchGameMode('search')}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                      gameMode === 'search' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Search size={20} />
                    Word Search Mode
                  </button>
                  <button
                    onClick={() => switchGameMode('quiz')}
                    disabled={!selectedStory.quizQuestions}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      gameMode === 'quiz' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Brain size={20} />
                    Quiz Mode
                  </button>
                </div>
              </div>

              {/* Search Interface */}
              {gameMode === 'search' && (
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

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800 flex items-center gap-2">
                      <Lightbulb size={16} />
                      <strong>Spelling Help:</strong> Don't worry about perfect spelling! I can help correct common misspellings.
                    </p>
                  </div>
                </div>
              )}

              {/* Quiz Interface */}
              {gameMode === 'quiz' && currentQuizWord && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Quiz Question</h3>
                    <div className="flex items-center gap-2">
                      <Timer size={20} className="text-red-500" />
                      <span className={`font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-blue-600'}`}>
                        {timeLeft}s
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-lg text-gray-700 mb-4">{currentQuizWord.question}</p>
                    <div className="grid grid-cols-1 gap-3">
                      {currentQuizWord.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuizAnswer(index)}
                          disabled={selectedAnswer !== null}
                          className={`p-4 text-left rounded-lg border-2 transition-colors ${
                            selectedAnswer === null
                              ? 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                              : selectedAnswer === index
                                ? index === currentQuizWord.correct
                                  ? 'border-green-500 bg-green-100 text-green-800'
                                  : 'border-red-500 bg-red-100 text-red-800'
                                : index === currentQuizWord.correct
                                  ? 'border-green-500 bg-green-100 text-green-800'
                                  : 'border-gray-300 bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {showQuizResult && (
                              <span>
                                {index === currentQuizWord.correct ? (
                                  <CheckCircle className="text-green-600" size={20} />
                                ) : selectedAnswer === index ? (
                                  <XCircle className="text-red-600" size={20} />
                                ) : null}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {showQuizResult && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className={`font-semibold ${
                        selectedAnswer === currentQuizWord.correct ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedAnswer === currentQuizWord.correct 
                          ? '🎉 Correct! Great job!' 
                          : selectedAnswer === null 
                            ? '⏰ Time\'s up!' 
                            : '❌ Not quite right. Try again next time!'}
                      </p>
                      <button
                        onClick={generateQuizQuestion}
                        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
                      >
                        Next Question
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Game Stats and Progress */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Star className="text-yellow-500" />
                  Game Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Search Score:</span>
                    <span className="font-bold text-purple-600">{score}</span>
                  </div>
                  {gameMode === 'quiz' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quiz Score:</span>
                      <span className="font-bold text-blue-600">{quizScore}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Words Found:</span>
                    <span className="font-bold text-green-600">{foundWords.length}/{selectedStory.targetWords.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Attempts:</span>
                    <span className="font-bold text-gray-600">{attempts + quizAttempts}</span>
                  </div>
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

              {/* Found Words */}
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

              {/* Hints */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Lightbulb className="text-yellow-500" />
                  Hints
                </h3>
                <div className="space-y-2">
                  {getHints().length > 0 ? (
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
                  )}
                </div>
              </div>

              {/* Achievements */}
              {(score > 0 || quizScore > 0) && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Trophy className="text-yellow-500" />
                    Achievements
                  </h3>
                  <div className="space-y-2">
                    {score >= 50 && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <p className="text-sm text-purple-800">🏆 Word Hunter - Found 5+ words!</p>
                      </div>
                    )}
                    {quizScore >= 40 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-800">🧠 Quiz Master - 2+ correct answers!</p>
                      </div>
                    )}
                    {progressPercentage === 100 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-800">🌟 Story Completed - Found all words!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveStoryApp;
