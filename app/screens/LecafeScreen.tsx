import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

import { AppDispatch, RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchMatchables } from '../features/shared/swipe/store/swipeThunk'
import MatchableSwiper from '../features/shared/swipe/components/MatchablesSwiper'

const LecafeScreen = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const matchablesList = useAppSelector((state: RootState) => state.swipe.list)
    const token = useAppSelector((state) => state.auth.token)

    useEffect(() => {
        if(token)dispatch(fetchMatchables())
    }, [])

    return <View><MatchableSwiper swipeList={matchablesList} /></View>
}

export default LecafeScreen