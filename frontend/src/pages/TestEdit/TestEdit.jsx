import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, QuestionList } from '../../shared/components';
import styles from './TestEdit.module.css';

export const TestEdit = ({ tests, onSaveTest }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const initialTest = tests.find((test) => test.id === id) || null;
	const [test, setTest] = useState(initialTest);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!initialTest) {
			const foundTest = tests.find((test) => test.id === id);

			if (!foundTest) {
				navigate('/test/not-found');
			} else {
				setTest(foundTest);
				setLoading(false);
			}
		} else {
			setLoading(false);
		}
	}, [id, tests, navigate, initialTest]);

	if (loading) return <div>Загрузка...</div>;
	if (error) return <div>Error: {error}</div>;

	const { title, questions } = test;

	const handleBack = () => {
		navigate('/');
	};

	const handleUpdateQuestion = (updateQuestion) => {
		setTest((prevTest) => ({
			...prevTest,
			questions: prevTest.questions.map((q) =>
				q.id === updateQuestion.id ? updateQuestion : q,
			),
		}));
	};

	const handleSaveTest = async (event) => {
		event.preventDefault();

		try {
			await onSaveTest(test);
			navigate('/');
		} catch (error) {
			console.log(error);
			setError('Ошибка сохранения теста!');
		}
	};

	return (
		<div className={styles.containerHeader}>
			<h3>Редактирование</h3>
			<h3>{title}</h3>
			<form className={styles.form} onSubmit={handleSaveTest}>
				<QuestionList
					questions={questions}
					onUpdateQuestion={handleUpdateQuestion}
				/>
				<div className={styles.buttons}>
					<Button
						height="40px"
						width="320px"
						margin="0"
						hoverColor="#FFD700"
						onClick={handleBack}
					>
						Назад
					</Button>
					<Button
						type="submit"
						height="40px"
						width="320px"
						hoverColor="#98FB98"
					>
						Сохранить
					</Button>
				</div>
			</form>
		</div>
	);
};
