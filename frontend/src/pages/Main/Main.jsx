import { TestItem } from './components';
import { getTestHistories } from '../../shared/lib/utils';
import { ProgressBar } from '../../shared/components';
import styles from './Main.module.css';

const Empty = () => {
	return <div className={styles.empty}>Вы ещё ни разу не проходили тестирование!</div>;
};

export const Main = ({ tests }) => {
	const histories = getTestHistories();

	return (
		<div className={styles.container}>
			<p>Список тестов</p>
			<ul>
				{tests.map(({ id, title }) => (
					<TestItem key={id} id={id} title={title} />
				))}
			</ul>
			<p>История прохождений</p>
			<ul>
				{histories.length > 0 ? (
					histories.map(
						({ id, title, date, correctAnswers, totalQuestions }) => (
							<ProgressBar
								key={id}
								title={title}
								date={date}
								correctAnswers={correctAnswers}
								totalQuestions={totalQuestions}
							/>
						),
					)
				) : (
					<Empty />
				)}
			</ul>
		</div>
	);
};
