import { createSlice, configureStore } from '@reduxjs/toolkit'

const surveySlice = createSlice({
  name: 'survey',
  initialState: {
    questions: {},
    answers: {},
    variables: {}
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
        let {name, options} = action.payload
        state.questions[name].options = options
    },
    initQuestions: (state, action)=>{
        console.log(action)
        state.questions = action.payload.questions
    },
    initVariables: (state, action)=>{
        console.log(action)
        state.variables = action.payload.variables
    }
  }
})

export const { updateAnswer, updateQuestion, initQuestions, initVariables } = surveySlice.actions

export const store = configureStore({
  reducer: surveySlice.reducer
})

store.subscribe(()=>{
  console.log("store.subscribe()..")
  console.log(store.getState().answers)
})