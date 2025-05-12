import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

import { AppDispatch, RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchSettings } from '../features/settings/store/settingsThunk'

const SettingsScreen = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const { loading, error } = useAppSelector((state: RootState) => state.settings)
    const id = useAppSelector((state) => state.profile.data?.id)

    return <View><Text>Settings</Text></View>
}

export default SettingsScreen