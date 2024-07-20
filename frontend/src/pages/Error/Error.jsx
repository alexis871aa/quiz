import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components';
import styles from './Error.module.css';

export const Error = ({ children }) => {
	const navigate = useNavigate();

	return (
		<div className={styles.error}>
			{children}
			<Button width="250px" height="40px" onClick={() => navigate('/')}>
				На главную
			</Button>
		</div>
	);
};
