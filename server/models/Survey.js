require('./db')
require('./Admin')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveySchema = new Schema({ 
  surveyNumber: { //every 6 months surveys are sent
    type: Number,  
    required: true,
    unique: false
  },
  company:{
    type: String,
    required:true
  },
  version:{ //employee or executive???
    type: String,
    required:true
  }, 

  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
},

  heading: String,
	img: String,
  narrative: String,
  questions:[
    {
      questionType:String,
      questionNumber: Number,
      question:String,
      answerOptions: []
    }
  ],
  createdDate: Date 
})

module.exports = mongoose.model('Survey', surveySchema, 'survey');