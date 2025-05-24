import React, { useState } from 'react';
import FlashcardViewer from './components/FlashcardViewer';
import Quiz from './components/Quiz';
import './index.css';

const App: React.FC = () => {
  // move the modes into a type
  const [mode, setMode] = useState<'flashcard' | 'quiz'>('flashcard');
  // category functionality
  const [selectedCategory, setSelectedCategory] = useState<string>('Tutte');
  const [restrictToCategory, setRestrictToCategory] = useState<boolean>(false);
  const uniqueCategories = [
    'Tutte',
    'Preferiti',
    'Mangiare',
    'Movimento',
    'Comunicazione',
    'Tempo libero',
    'Casa',
    'Lavoro',
    'Scuola',
  ];
  // favoourite functionality hook
  const [favorites, setFavorites] = useState<number[]>(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  // this can be a hook
  const handleToggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
    localStorage.setItem(
      'favorites',
      JSON.stringify(
        favorites.includes(id)
          ? favorites.filter((f) => f !== id)
          : [...favorites, id]
      )
    );
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Modalità:
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as 'flashcard' | 'quiz')}
          >
            <option value="flashcard">Flashcard</option>
            <option value="quiz">Quiz</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        {/* category functionality */}
        <label>
          Categoria:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {uniqueCategories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        {/* filters */}
        {mode === 'quiz' && (
          <div>
            <label style={{ marginLeft: '1rem' }}>
              <input
                type="checkbox"
                checked={restrictToCategory}
                onChange={(e) => setRestrictToCategory(e.target.checked)}
              />{' '}
              Usa solo verbi di questa categoria
            </label>
            <label style={{ marginLeft: '1rem' }}>
              <input
                type="checkbox"
                checked={onlyFavorites}
                onChange={(e) => setOnlyFavorites(e.target.checked)}
              />{' '}
              Solo preferiti
            </label>
          </div>
        )}
      </div>

      {mode === 'flashcard' ? (
        <FlashcardViewer
          selectedCategory={selectedCategory}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <Quiz
          selectedCategory={selectedCategory}
          restrictToCategory={restrictToCategory}
          onlyFavorites={onlyFavorites}
          favorites={favorites}
        />
      )}
    </div>
  );
};

export default App;
