import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

import { AppDispatch, RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchTutorial } from '../features/tutorial/tutorialThunk'

const TutorialScreen = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const { completedSteps, currentStep } = useAppSelector((state: RootState) => state.tutorial)
    const id = useAppSelector((state) => state.profile.data?.id)

    return <View><Text>Tutorial</Text></View>
}

export default TutorialScreen