import "./ProgressBar.css";

interface ProgressBarProps {
  score: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ score, total }) => {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <>
      <p>
        Punteggio: {score} / {total} ({percentage}%)
      </p>
      <div className="score-bar">
        <div
          className="score-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
