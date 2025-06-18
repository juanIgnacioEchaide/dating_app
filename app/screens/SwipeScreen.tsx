import React from 'react'

import { AppDispatch, RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import BasePage from '../features/shared/placeholders/BasePage'


const SwipeScreen = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const { list, loading } = useAppSelector((state: RootState) => state.swipe)
    const id = useAppSelector((state) => state.profile.data?.id)

    return  <BasePage title='Swipe' subtitle='here goes the swipe?'/>
}

export default SwipeScreen