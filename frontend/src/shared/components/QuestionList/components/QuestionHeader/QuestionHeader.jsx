import { useState } from 'react';
import { Question } from '../Question/Question';
import styles from './QuestionHeader.module.css';

export const QuestionHeader = ({ question, onUpdateQuestion }) => {
	const [isOpen, setIsOpen] = useState(false);
	return !isOpen ? (
		<div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
			<span className={styles.question}>{question.question}</span>
			<span className={styles.arrow}>▼</span>
		</div>
	) : (
		<Question
			question={question}
			isOpen={{ isOpen, setIsOpen }}
			onUpdateQuestion={onUpdateQuestion}
		/>
	);
};
