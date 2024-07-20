function mapTest({ _id, title, questions }) {
	return {
		id: _id,
		title,
		questions: questions.map(({ _id, question, options, correct_answer }) => ({
			id: _id,
			question,
			options,
			correctAnswer: correct_answer,
		})),
	};
}

module.exports = mapTest;
