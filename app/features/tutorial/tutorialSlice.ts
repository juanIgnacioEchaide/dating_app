import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TutorialStep = {
  stepId: string
  completedAt: number
}

type TutorialState = {
  completedSteps: TutorialStep[]
  currentStep: number
}

const initialState: TutorialState = {
  completedSteps: [],
  currentStep: 0
}

const tutorialSlice = createSlice({
  name: 'tutorial',
  initialState,
  reducers: {
    completeStep(state, action: PayloadAction<TutorialStep>) {
      state.completedSteps.push(action.payload)
      state.currentStep++
    },
    resetTutorial(state) {
      state.completedSteps = []
      state.currentStep = 0
    }
  }
})

export const { completeStep, resetTutorial } = tutorialSlice.actions
export default tutorialSlice.reducer
