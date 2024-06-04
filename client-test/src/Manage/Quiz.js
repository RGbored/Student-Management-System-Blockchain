import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch form data from backend
    fetch('http://localhost:5000/questions')
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching form data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <div key={index}>
            <h2>Question {index + 1}</h2>
            <form>
              <label htmlFor={`problemName${index}`}>Problem Name:</label>
              <input type="text" id={`problemName${index}`} defaultValue={question.problemName} readOnly />
  
              <label htmlFor={`problemStatement${index}`}>Problem Statement:</label>
              <textarea id={`problemStatement${index}`} defaultValue={question.problemStatement} readOnly />
  
              <label>MCQ Options:</label>
              {question.mcqOptions.map((option, i) => (
                <div key={i}>
                  <input type="text" value={option.option} readOnly />
                  {option.isCorrect && <span> (Correct Option)</span>}
                </div>
              ))}
            </form>
          </div>
        ))
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default Quiz;
