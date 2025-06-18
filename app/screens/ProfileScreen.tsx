import React from 'react'

import { AppDispatch, RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import BasePage from '../features/shared/placeholders/BasePage'



const ProfileScreen = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const { data, status } = useAppSelector((state: RootState) => state.profile)
    const id = useAppSelector((state) => state.profile.data?.id)


    return  <BasePage title='Profile' subtitle='here goes the profile'/>
}

export default ProfileScreen