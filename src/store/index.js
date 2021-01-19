import { createSlice, configureStore } from '@reduxjs/toolkit'

const surveySlice = createSlice({
  name: 'survey',
  initialState: {
    questions: {},
    answers: {},
  },
  reducers: {
    updateAnswer: (state,action) => {
      let {name} = action.payload
      state.answers[name] = action.payload
    },
    updateQuestion: (state,action) => {
      let {name} = action.payload
      state.questions[name] = action.payload
    },
    initQuestions: (state, action)=>{
      state.questions = action.payload
    },
    initAnswers: (state, action)=>{
      state.answers = action.payload
    },
  }
})

export const { updateAnswer, updateQuestion, initQuestions, initAnswers } = surveySlice.actions

export const store = configureStore({
  reducer: surveySlice.reducer
})