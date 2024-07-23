type MessageType = {
    id: string;
    body: string;
    senderId: string;
    createdAt: string
    shouldShake?: boolean;
}
type ConversationType = {
    id: string;
    fullName: string;
    profilePic: string;
}