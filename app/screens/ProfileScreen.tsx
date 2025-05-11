import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

import { AppDispatch, RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'



const ProfileScreen = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const { data, status } = useAppSelector((state: RootState) => state.profile)
    const id = useAppSelector((state) => state.profile.data?.id)


    return <View><Text>Profile</Text></View>
}

export default ProfileScreen