import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Error, Main, Test, TestEdit } from '../../../pages';
import { request } from '../../../shared/lib/utils';
import styles from './Quiz.module.css';

export const Quiz = () => {
	const [tests, setTests] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTests = async () => {
			try {
				const { data } = await request('/tests');

				setIsLoading(false);
				setTests(data);
			} catch (error) {
				console.error(
					'Ошибка получения тестов, сообщение от сервера: ',
					error.message,
				);
				setIsLoading(false);
			}
		};

		fetchTests();
	}, []);

	const handleSaveTest = async (updatedTest) => {
		try {
			const { data } = await request(
				`/tests/${updatedTest.id}`,
				'PUT',
				updatedTest,
			);

			setTests((prevTests) =>
				prevTests.map((test) => (test.id === updatedTest.id ? data : test)),
			);
		} catch (error) {
			console.error(
				'Ошибка сохранения теста, сообщение от сервера: ',
				error.message,
			);
		}
	};

	return (
		<div className={styles.app}>
			<Routes>
				<Route
					path="/"
					element={
						isLoading ? (
							<div className={styles.loader}>Загрузка...</div>
						) : (
							<Main tests={tests} />
						)
					}
				/>
				<Route path="/tests/:id" element={<Test tests={tests} />} />
				<Route
					path="/tests/:id/edit"
					element={<TestEdit tests={tests} onSaveTest={handleSaveTest} />}
				/>
				<Route
					path="/test/not-found"
					element={<Error>Ошибка, такой страницы не существует!</Error>}
				/>
				<Route
					path="*"
					element={<Error>Ошибка, такой страницы не существует!</Error>}
				/>
			</Routes>
		</div>
	);
};
