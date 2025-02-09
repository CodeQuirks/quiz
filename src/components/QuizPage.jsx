import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import he from "he";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = "https://opentdb.com/api.php?amount=5&type=multiple"; // Adjust amount for more questions

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const formattedQuestions = data.results.map((question) => {
          const incorrectAnswers = question.incorrect_answers.map((ans) => ({
            text: he.decode(ans),
            is_correct: false,
          }));
          const correctAnswer = {
            text: he.decode(question.correct_answer),
            is_correct: true,
          };
          const allAnswers = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);
          return {
            description: he.decode(question.question),
            options: allAnswers,
            correctAnswer: correctAnswer.text,
          };
        });
        setQuestions(formattedQuestions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
        setLoading(false);
      });
  }, []);

  const handleAnswerClick = (selectedOption, isCorrect) => {
    setScore(isCorrect ? score + 5 : score - 1);
    setSelectedAnswers([...selectedAnswers, { question: questions[currentQuestion].description, selected: selectedOption, correct: questions[currentQuestion].correctAnswer }]);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        navigate("/results", { state: { score, selectedAnswers } });
      }
    }, 1000);
  };

  if (loading) return <h2 className="text-xl font-bold text-center mt-10">Loading Quiz...</h2>;

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        {questions.length > 0 ? (
          <QuestionCard question={questions[currentQuestion]} onAnswerClick={handleAnswerClick} />
        ) : (
          <h2 className="text-xl font-semibold">No Questions Available</h2>
        )}
        <p className="mt-4 text-lg font-semibold text-gray-700">Score: {score}</p>
      </div>
    </div>
  );
};

export default QuizPage;
