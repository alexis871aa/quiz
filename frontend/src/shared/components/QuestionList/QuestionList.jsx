import { QuestionHeader } from './components';
import styles from './QuestionList.module.css';

export const QuestionList = ({ questions, onUpdateQuestion }) => {
	return (
		<div className={styles.questions}>
			{questions.map((question) => (
				<QuestionHeader
					key={question.id}
					question={question}
					onUpdateQuestion={onUpdateQuestion}
				/>
			))}
		</div>
	);
};
