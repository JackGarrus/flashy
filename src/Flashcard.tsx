interface FlashcardProps {
  verb: string;
  translation: string;
  example: string;
  revealed: boolean;
  onReveal: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({
  verb,
  translation,
  example,
  revealed,
  onReveal,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full text-center">
      <h2 className="text-2xl font-bold mb-4">{verb}</h2>
      {!revealed ? (
        <button
          onClick={onReveal}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Mostra significato
        </button>
      ) : (
        <div className="mt-4">
          <p className="text-lg">Traduzione: {translation}</p>
          <p className="italic text-gray-600 mt-2">{example}</p>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
