import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

import { AppDispatch, RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchLecafeItems } from '../features/lecafe/lecafeThunk'


const LecafeScreen = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const { status, conversations } = useAppSelector((state: RootState) => state.lecafe)
    const id = useAppSelector((state) => state.profile.data?.id)

    return <View><Text>Lecafe</Text></View>
}

export default LecafeScreen