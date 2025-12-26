const question = require('../model/question')

exports.createQuestion = async (data) => {
    return await question.create(data);
}