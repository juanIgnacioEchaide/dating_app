import React from 'react'

import { AppDispatch, RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchSettings } from '../features/settings/store/settingsThunk'
import BasePage from '../features/shared/placeholders/BasePage'

const SettingsScreen = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const { loading, error } = useAppSelector((state: RootState) => state.settings)
    const id = useAppSelector((state) => state.profile.data?.id)

    return  <BasePage title='Settings' subtitle='here goes the settings'/>
}

export default SettingsScreen