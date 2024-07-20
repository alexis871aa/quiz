import { useState } from 'react';
import styles from './ProgressBar.module.css';

export const ProgressBar = ({ title, date, correctAnswers, totalQuestions }) => {
	const [showTooltip, setShowTooltip] = useState(false);

	const correctPercentage = (correctAnswers / totalQuestions) * 100;
	const incorrectPercentage = 100 - correctPercentage;

	const handleMouseEnter = () => {
		setShowTooltip(true);
	};

	const handleMouseLeave = () => {
		setShowTooltip(false);
	};

	return (
		<div className={styles.container}>
			{showTooltip && (
				<div className={styles.tooltip}>
					пройдено: {correctAnswers} из {totalQuestions}
				</div>
			)}
			<div className={styles.barContainer}>
				<div className={styles.info}>
					<div className={styles.title}>{title}</div>
					<div>{date}</div>
				</div>
				<div className={styles.leftText}>0</div>
				<div
					className={styles.progressBar}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<div
						className={styles.correct}
						style={{ width: `${correctPercentage}%` }}
					></div>
					<div
						className={styles.incorrect}
						style={{ width: `${incorrectPercentage}%` }}
					></div>
				</div>
				<div className={styles.rightText}>{totalQuestions}</div>
				<div className={styles.details}>
					Верно: {correctAnswers} из {totalQuestions}
				</div>
			</div>
		</div>
	);
};
