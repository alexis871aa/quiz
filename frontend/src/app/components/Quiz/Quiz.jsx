import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Error, Main, Test, TestEdit } from '../../../pages';
import { request } from '../../../shared/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { loadTestsAsync } from '../../../store/actions';
import {
	selectTests,
	selectTestsError,
	selectTestsIsLoading,
} from '../../../store/selectors';
import { loadTests } from '../../../store/reducers';
import styles from './Quiz.module.css';

export const Quiz = () => {
	const tests = useSelector(selectTests);
	const isLoading = useSelector(selectTestsIsLoading);
	const error = useSelector(selectTestsError);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadTests());
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

	if (error) {
		return <div>{error}</div>;
	}

	if (isLoading) {
		return <div className={styles.loader}>Загрузка...</div>;
	}

	return (
		<div className={styles.app}>
			<Routes>
				<Route path="/" element={<Main tests={tests} />} />
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
