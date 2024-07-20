export const generateUniqueId = () => {
	const timestamp = Date.now(); // Текущее время в миллисекундах
	const randomNum = Math.floor(Math.random() * 1000); // Случайное число от 0 до 999
	return `${timestamp}-${randomNum}`;
};
