export type Photos = {
    small: string | null
    large: string | null
}

export type Profile = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: Photos
}

export type Dialogs = {
    id: number
    userName: string,
    hasNewMessages: boolean
    newMessagesCount: boolean
    photos: Photos
}

export type Messages = {
    id: string,
    body: string
    senderId: number
    senderName: string
    recipientId: number
    viewed: boolean
}
