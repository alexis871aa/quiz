import styles from './Button.module.css';

export const Button = ({ children, height, width, margin, hoverColor, ...props }) => {
	const buttonStyle = {
		height: height,
		width: width,
		margin: margin,
	};

	const hoverStyle = hoverColor ? { '--hover-bg-color': hoverColor } : {};

	return (
		<button
			className={styles.button}
			style={{ ...buttonStyle, ...hoverStyle }}
			{...props}
		>
			{children}
		</button>
	);
};
