function dbTransformTest({ id, title, questions }) {
	return {
		_id: id,
		title,
		questions: questions.map(({ id, question, options, correctAnswer }) => ({
			_id: id,
			question,
			options,
			correct_answer: correctAnswer,
		})),
	};
}

module.exports = dbTransformTest;
