import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

import { AppDispatch, RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchMessages } from '../features/messages/messagesThunk'


const MessagesScreen = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const { threads, unreadCount, otherUserId } = useAppSelector((state: RootState) => state.messages)
    const id = useAppSelector((state) => state.profile.data?.id)


    return <View><Text>Messages</Text></View>
}

export default MessagesScreen