import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../shared/components';
import { generateUniqueId, getDateNow, saveTestHistory } from '../../shared/lib/utils';
import styles from './Test.module.css';

export const Test = ({ tests }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [currentQuestion, setCurrentQuestion] = useState(1);
	const [selectedAnswers, setSelectedAnswers] = useState({});
	const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
	const [isTestCompleted, setIsTestCompleted] = useState(false);
	const [error, setError] = useState('');

	const test = tests.find((test) => test.id === id);

	useEffect(() => {
		if (!test) {
			navigate('/test/not-found');
		}
	}, [test, navigate]);

	if (test === undefined) {
		return;
	}

	const totalQuestions = test.questions.length;
	const { title, questions } = test;

	const { question, options, correctAnswer } = questions[currentQuestion - 1];

	const handleNextQuestion = () => {
		if (!selectedAnswers[currentQuestion]) {
			setError('Пожалуйста, выберите ответ перед переходом к следующему вопросу.');
			return;
		}
		setError('');

		if (selectedAnswers[currentQuestion] === correctAnswer) {
			setCorrectAnswersCount(correctAnswersCount + 1);
		}

		setCurrentQuestion(currentQuestion + 1);
	};

	const handlePreviousQuestion = () => {
		setCurrentQuestion(currentQuestion - 1);
	};

	const handleAnswerChange = ({ target }) => {
		setSelectedAnswers({
			...selectedAnswers,
			[currentQuestion]: target.value,
		});
		setError('');
	};

	const handleCompleteTest = () => {
		if (!selectedAnswers[currentQuestion]) {
			setError('Пожалуйста, выберите ответ перед завершением теста.');
			return;
		}
		setError('');

		if (selectedAnswers[currentQuestion] === correctAnswer) {
			setCorrectAnswersCount(correctAnswersCount + 1);
		}

		saveTestHistory({
			id: generateUniqueId(),
			title,
			date: getDateNow(),
			correctAnswers: correctAnswersCount,
			totalQuestions: questions.length,
		});

		setIsTestCompleted(true);
	};

	const handleResultTestMain = () => {
		navigate('/');
	};

	const handleResultTestAgain = () => {
		setCurrentQuestion(1);
		setSelectedAnswers({});
		setCorrectAnswersCount(0);
		setIsTestCompleted(false);
		navigate(`/tests/${id}`);
	};

	if (isTestCompleted) {
		return (
			<div className={styles.content}>
				<h3>{title}</h3>
				<div className={styles.text}>Правильных ответов:</div>
				<div className={styles.result}>
					{correctAnswersCount}
					{'/'}
					{totalQuestions}
				</div>
				<div className={styles.buttons}>
					<Button height="40px" width="190px" onClick={handleResultTestMain}>
						На главную
					</Button>
					<Button height="40px" width="190px" onClick={handleResultTestAgain}>
						Пройти ещё раз
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.content}>
			<h3>{title}</h3>
			<div className={styles.questionsContainer}>
				<div
					className={styles.numberQuestion}
				>{`${currentQuestion}/${totalQuestions}`}</div>
				<div>{question}</div>
			</div>
			<div className={styles.optionsContainer}>
				{options.map((option, index) => (
					<label key={index} className={styles.option}>
						<input
							className={styles.inputOption}
							type="radio"
							name="answer"
							value={option}
							checked={selectedAnswers[currentQuestion] === option}
							onChange={handleAnswerChange}
						/>
						{option}
					</label>
				))}
			</div>
			{error && <div className={styles.error}>{error}</div>}
			<div className={styles.buttons}>
				<Button
					height="40px"
					width="190px"
					hoverColor={currentQuestion === 1 ? '#f0f0f0' : '#FFD700'}
					disabled={currentQuestion === 1}
					onClick={handlePreviousQuestion}
				>
					Предыдущий вопрос
				</Button>
				{currentQuestion !== questions.length ? (
					<Button
						height="40px"
						width="190px"
						hoverColor={error !== '' ? '#f0f0f0' : '#FFD700'}
						onClick={handleNextQuestion}
					>
						Следующий вопрос
					</Button>
				) : (
					<Button
						height="40px"
						width="190px"
						hoverColor="#98FB98"
						onClick={handleCompleteTest}
					>
						Завершить тест
					</Button>
				)}
			</div>
		</div>
	);
};
