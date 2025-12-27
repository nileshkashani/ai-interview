const express = require('express')
const router = express.Router()
// const questionService = require('../service/questionService')
const question = require('../model/question')
router.get('/get/:id', async (req, resp) => { 
    console.log(req.params.id)
    const response = await question.findAll({where: {interview_id: req.params.id}});
    resp.json(response);
})

router.get('/getnext/:id', async (req, resp) => {
    resp.json(await question.findAll({where: {id: req.params.id}, limit: 1}))
})

module.exports = router