const express = require('express')
const router = express.Router()
const interviewService = require('../service/interviewService')
const questionService = require('../service/questionService')
const sequelize = require('../config/mysql')

router.post('/', async (req, res) => {
  const t = await sequelize.transaction()

  try {
    const { topic, questions } = req.body

    const interview = await interviewService.createInterview({ topic }, t)

    for (const q of questions) {
      await questionService.createQuestion({
        text: q,
        interview_id: interview.id
      }, t)
    }

    await t.commit()
    res.json(interview)

  } catch (err) {
    await t.rollback()
    console.error(err)
    res.status(500).json({ error: 'Interview creation failed' })
  }
})
module.exports = router