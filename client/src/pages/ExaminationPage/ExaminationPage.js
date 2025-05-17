import styles from './ExaminationPage.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const tools = [
  { id: 1, name: 'Calculator', icon: '📐' },
  { id: 2, name: 'Notes', icon: '📝' },
  { id: 3, name: 'Timer', icon: '⏱️' },
];

const sampleQuestions = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    correctAnswer: ['Paris'],
  },
  {
    id: 2,
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: ['4', '5'],
  },
];

function ExaminationPage() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedOption, setSelectedOption] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleToolSelect = (toolId) => {
    setSelectedTool(toolId);
  };

  const handleAnswerSelect = (index, answer) => {
    setSelectedOption((prev) => [...prev, index]);
    setSelectedAnswer(answer);
    console.log(selectedOption, answer, correctAnswer);
  };

  useEffect(() => {
    handleSetCorrectAnswer();
    setSelectedOption([]);
  }, [currentQuestion]);

  const handleSetCorrectAnswer = () => {
    setCorrectAnswer(sampleQuestions[currentQuestion].correctAnswer);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className={cx('container', { 'dark-mode': isDarkMode })}>
      <div className={cx('sidebar')}>
        <h2>Tools</h2>
        <ul>
          {tools.map((tool) => (
            <li
              key={tool.id}
              className={cx('tool-item', { active: selectedTool === tool.id })}
              onClick={() => handleToolSelect(tool.id)}
            >
              <span className={cx('tool-icon')}>{tool.icon}</span>
              {tool.name}
            </li>
          ))}
        </ul>
        <button className={cx('theme-toggle')} onClick={toggleTheme}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className={cx('content')}>
        <h1>Examination</h1>
        <div className={cx('question-container')}>
          <h3>Question {currentQuestion + 1}</h3>
          <p>{sampleQuestions[currentQuestion].question}</p>
          <div className={cx('options')}>
            {sampleQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={cx('option', {
                  selected: selectedAnswer === option,
                  correct: selectedOption.includes(index) && correctAnswer.includes(option),
                })}
                onClick={() => handleAnswerSelect(index, option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className={cx('button-list')}>
            <button className={cx('next-button')} onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
              Previous Question
            </button>
            <button
              className={cx('next-button')}
              onClick={handleNextQuestion}
              disabled={currentQuestion === sampleQuestions.length - 1}
            >
              Next Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ExaminationPage;
