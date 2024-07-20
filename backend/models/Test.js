const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
	question: {
		type: String,
		required: true,
	},
	options: {
		type: [String],
		required: true,
	},
	correct_answer: {
		type: String,
		required: true,
	},
});

const TestSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	questions: {
		type: [QuestionSchema],
		required: true,
	},
});

const TestsModel = mongoose.model('Test', TestSchema);

module.exports = TestsModel;
