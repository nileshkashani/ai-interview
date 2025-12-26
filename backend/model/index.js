const Interview = require('./interview')
const Question = require('./question')

Interview.hasMany(Question, {
  foreignKey: 'interviewId',
  onDelete: 'CASCADE'
})

Question.belongsTo(Interview, {
  foreignKey: 'interviewId'
})
