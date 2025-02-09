import { useState } from "react";

const QuestionCard = ({ question, onAnswerClick }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option.text);
    setTimeout(() => {
      onAnswerClick(option.text, option.is_correct);
      setSelectedOption(null);
    }, 1000);
  };

  return (
    <div className="p-6 w-full bg-white rounded-lg shadow-md text-center">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{question.description}</h3>
      <ul className="space-y-3">
        {question.options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`cursor-pointer p-3 rounded-lg font-semibold transition ${
              selectedOption
                ? option.is_correct
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
