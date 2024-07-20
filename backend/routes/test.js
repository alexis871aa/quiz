const express = require('express');
const { mapTest, dbTransformTest } = require('../helpers');
const { getTests, updateTest } = require('../controllers/test');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	try {
		const tests = await getTests();

		res.send({ data: tests.map(mapTest), error: null });
	} catch (error) {
		res.send({
			data: null,
			error: 'Произошла ошибка получения тестов из БД: ' + error.message,
		});
	}
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const updatedTest = req.body;

	try {
		const newTest = await updateTest(id, dbTransformTest(updatedTest));
		res.send({ data: mapTest(newTest), error: null });
	} catch (error) {
		res.send({
			data: null,
			error: 'Произошла ошибка обновления теста: ' + error.message,
		});
	}
});

module.exports = router;
