import React from 'react'

import { AppDispatch, RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchMatches } from '../features/matches/store/matchesThunk'
import BasePage from '../features/shared/placeholders/BasePage'

const MatchesScreen = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const { likedUsers, error, list, loading } = useAppSelector((state: RootState) => state.matches)
    const id = useAppSelector((state) => state.profile.data?.id)

    return <BasePage title='matches' subtitle='here goes the matches'/>
}

export default MatchesScreen