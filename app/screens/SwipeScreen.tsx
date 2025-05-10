import React from 'react'
import { View, Text } from 'react-native'

import { AppDispatch, RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'


const SwipeScreen = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const { list, loading } = useAppSelector((state: RootState) => state.swipe)
    const id = useAppSelector((state) => state.profile.data?.id)

    return <View><Text>Swipe</Text></View>
}

export default SwipeScreen