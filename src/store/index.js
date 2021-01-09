import { createSlice, configureStore } from '@reduxjs/toolkit'

const surveySlice = createSlice({
  name: 'survey',
  initialState: {
    questions: {},
    answers: {}
  },
  reducers: {
    updateAnswer: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(action)
      let {name, result} = action.payload
      if(!state.answers[name]){
          state.answers[name]={}
      }
      state.answers[name].value = result
    },
    updateQuestion: (state,action) => {
        console.log(action)
    },
    initQuestions: (state, action)=>{
        console.log(action)
        state.questions = action.payload.questions
    }
  }
})

export const { updateAnswer, updateQuestion, initQuestions } = surveySlice.actions

export const store = configureStore({
  reducer: surveySlice.reducer
})