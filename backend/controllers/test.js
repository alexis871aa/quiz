const Test = require('../models/Test');

async function getTests() {
	return await Test.find();
}

async function updateTest(id, updatedTest) {
	return await Test.findByIdAndUpdate({ _id: id }, updatedTest, {
		new: true,
	});
}

module.exports = {
	getTests,
	updateTest,
};
