const Interview = require('../model/interview')

exports.createInterview = async data => {
    return await Interview.create(data)
}

