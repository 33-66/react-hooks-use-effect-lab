import React, { useEffect, useState } from 'react';

const Question = ({ question, onAnswered }) => {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(prevTime => prevTime - 1);
      } else {
        handleAnswer(false); // Timer ran out, answer is false
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [timeRemaining]);

  const handleAnswer = (answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
      setTimeRemaining(10); // Reset the timer
      onAnswered(answer);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <h2>{question.prompt}</h2>
      <p>{timeRemaining} seconds remaining</p>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>
            <button onClick={() => handleAnswer(answer)} disabled={selectedAnswer !== null}>
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
