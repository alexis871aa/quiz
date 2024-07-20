// noinspection JSValidateTypes

import { useEffect, useRef, useState } from 'react';
import styles from './Question.module.css';

export const Question = ({ question, isOpen, onUpdateQuestion }) => {
	const {
		id: qId,
		options: initialOptions,
		correctAnswer: initialCorrectAnswer,
	} = question;
	const [options, setOptions] = useState(initialOptions);
	const [correctAnswer, setCorrectAnswer] = useState(initialCorrectAnswer);
	const [questionText, setQuestionText] = useState(question.question);
	const [optionTexts, setOptionTexts] = useState(initialOptions);
	const [newOptionText, setNewOptionText] = useState('');
	const saveTimeout = useRef(null);

	const handleDeleteOption = (index) => {
		const updatedOptions = options.filter((_, i) => i !== index);
		if (options[index] === correctAnswer) {
			alert('Прежде чем удалять выберите другой правильный ответ');
			return;
		}
		setOptions(updatedOptions);
		onUpdateQuestion({ ...question, options: updatedOptions });
	};

	const handleChangeOption = (option) => {
		setCorrectAnswer(option);
		onUpdateQuestion({ ...question, correctAnswer: option });
	};

	const handleQuestionChange = ({ target }) => {
		setQuestionText(target.value);

		if (saveTimeout.current) {
			clearTimeout(saveTimeout.current);
		}

		saveTimeout.current = setTimeout(() => {
			onUpdateQuestion({ ...question, question: target.value });
		}, 1500);
	};

	const handleOptionChange = (index, value, option) => {
		const updatedOptionTexts = [...optionTexts];
		updatedOptionTexts[index] = value;
		setOptionTexts(updatedOptionTexts);

		if (saveTimeout.current) {
			clearTimeout(saveTimeout.current);
		}

		saveTimeout.current = setTimeout(() => {
			const updatedOptions = [...options];
			updatedOptions[index] = value;
			setOptions(updatedOptions);
			if (correctAnswer === option) {
				setCorrectAnswer(updatedOptions[index]);
			}
			onUpdateQuestion({
				...question,
				options: updatedOptions,
				correctAnswer: updatedOptions[index],
			});
		}, 1500);
	};

	const handleAddOption = (event) => {
		event.preventDefault();
		if (newOptionText.trim() === '') return;
		const updatedOptions = [...options, newOptionText];

		setOptions(updatedOptions);
		setOptionTexts(updatedOptions);
		setNewOptionText('');
		onUpdateQuestion({ ...question, options: updatedOptions });
	};

	useEffect(() => {
		return () => {
			if (saveTimeout.current) {
				clearTimeout(saveTimeout.current);
			}
		};
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<textarea
					className={styles.question}
					value={questionText}
					onChange={handleQuestionChange}
				/>
				<span
					className={styles.arrow}
					onClick={() => isOpen.setIsOpen(!isOpen.isOpen)}
				>
					▲
				</span>
			</div>
			<div className={styles.answer}>
				<textarea
					className={styles.option}
					value={newOptionText}
					onChange={({ target }) => setNewOptionText(target.value)}
					placeholder="Добавьте ответ"
				/>
				<div className={styles.addAnswer} onClick={handleAddOption}>
					+
				</div>
			</div>
			{options.map((option, index) => (
				<div className={styles.answer} key={index}>
					<textarea
						className={styles.option}
						value={optionTexts[index]}
						onChange={({ target }) =>
							handleOptionChange(index, target.value, option)
						}
					/>
					<div className={styles.rightControl}>
						<div>
							<input
								className={styles.correctAnswer}
								type="radio"
								name={`question-${qId}`}
								checked={correctAnswer === option}
								onChange={() => handleChangeOption(option)}
							/>
						</div>
						<div
							className={styles.deleteAnswer}
							onClick={() => handleDeleteOption(index)}
						>
							&#128465;
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
