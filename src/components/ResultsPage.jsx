import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, selectedAnswers } = location.state || { score: 0, selectedAnswers: [] };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Quiz Completed!</h2>
        <p className="text-lg font-semibold mt-2">Your Final Score: <span className="text-green-600">{score}</span></p>

        <h3 className="text-xl font-semibold mt-4 text-gray-700">Review Your Answers:</h3>
        <ul className="mt-3 text-left space-y-3">
          {selectedAnswers.map((answer, index) => (
            <li key={index} className="p-3 rounded-lg shadow-md">
              <p className="font-semibold text-gray-800">{index + 1}. {answer.question}</p>
              <p className={`text-sm ${answer.selected === answer.correct ? "text-green-600" : "text-red-600"}`}>
                Your Answer: {answer.selected}
              </p>
              <p className="text-sm text-gray-700">Correct Answer: {answer.correct}</p>
            </li>
          ))}
        </ul>

        <button onClick={() => navigate("/")} className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
          Retake Quiz
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
