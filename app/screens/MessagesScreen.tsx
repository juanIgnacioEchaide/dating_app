import React from 'react'

import { AppDispatch, RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchMessages } from '../features/messages/store/messagesThunk'
import BasePage from '../features/shared/placeholders/BasePage'


const MessagesScreen = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const { threads, unreadCount, otherUserId } = useAppSelector((state: RootState) => state.messages)
    const id = useAppSelector((state) => state.profile.data?.id)


    return <BasePage title='Messages' subtitle='here goes the chat'/>
}

export default MessagesScreen