import React, { useState } from "react";
import FlashcardViewer from "./components/FlashcardViewer";
import Quiz from "./components/Quiz";
import ControlPanel from "./components/ControlPanel";
import { useFavorites } from "./hooks/useFavorites";
import { useCategoryFilter } from "./hooks/useCategoryFilter";
import "./App.css";

/**
 * Main application component.
 * - Manages global app state such as the current mode (flashcard or quiz),
 * category selection, and favorite flashcards.
 * - Delegates UI rendering of filters and controls to the ControlPanel component,
 * and switches between FlashcardViewer and Quiz based on the selected mode.
 */

const App: React.FC = () => {
  const [mode, setMode] = useState<"flashcard" | "quiz">("flashcard");
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    restrictToCategory,
    setRestrictToCategory,
  } = useCategoryFilter();
  const {
    favoriteIds,
    updateFavoriteIds,
    showOnlyFavourites,
    setShowOnlyFavourites,
  } = useFavorites();

  return (
    <div className="container">
      <ControlPanel
        mode={mode}
        onModeChange={setMode}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        restrictToCategory={restrictToCategory}
        onToggleRestrict={setRestrictToCategory}
        showOnlyFavourites={showOnlyFavourites}
        onToggleshowOnlyFavourites={setShowOnlyFavourites}
      />

      <div className="container">
        {mode === "flashcard" ? (
          <FlashcardViewer
            selectedCategory={selectedCategory}
            favorites={favoriteIds}
            onupdateFavoriteIds={updateFavoriteIds}
          />
        ) : (
          <Quiz
            selectedCategory={selectedCategory}
            restrictToCategory={restrictToCategory}
            showOnlyFavourites={showOnlyFavourites}
            favoriteIds={favoriteIds}
          />
        )}
      </div>
    </div>
  );
};

export default App;
