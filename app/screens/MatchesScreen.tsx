import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

import { AppDispatch, RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchMatches } from '../(features)/matches/matchesThunk'

const MatchesScreen = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const { likedUsers, error, list, loading } = useAppSelector((state: RootState) => state.matches)
    const id = useAppSelector((state) => state.profile.data?.id)

    return <View><Text>Matches</Text></View>
}

export default MatchesScreen