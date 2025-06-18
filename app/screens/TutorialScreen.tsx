import React from 'react'

import { AppDispatch, RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchTutorial } from '../features/tutorial/tutorialThunk'
import BasePage from '../features/shared/placeholders/BasePage'

const TutorialScreen = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const { completedSteps, currentStep } = useAppSelector((state: RootState) => state.tutorial)
    const id = useAppSelector((state) => state.profile.data?.id)

    return  <BasePage title='Tutorial' subtitle='here goes the tutorial'/>
}

export default TutorialScreen