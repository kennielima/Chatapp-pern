import { Request, Response } from "express"
import prisma from "../db/prisma.js";
import { create } from "domain";

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;

        let conversation = await prisma.conversation.findFirst({
            where: {
                participantsIds: {
                    hasEvery: [senderId, receiverId],
                }
            }
        })

        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    participantsIds: {
                        set: [senderId, receiverId]
                    }
                }
            })
        }

        const newMessage = await prisma.message.create({
            data: {
                senderId,
                body: message,
                conversationId: conversation.id
            }
        })
        if (newMessage) {
            conversation = await prisma.conversation.update({
                where: {
                    id: conversation.id
                },
                data: {
                    messages: {
                        connect: {
                            id: newMessage.id
                        }
                    }
                }
            })
        }
        //socket io

        res.status(201).json(newMessage)
    } catch (error: any) {
        console.error("ERROR: ", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}


export const getMessages = async (req: Request, res: Response) => {
    try {
        const { id: UserToChatId } = req.params;
        const senderId = req.user.id;

        const conversation = await prisma.conversation.findFirst({
            where: {
                participantsIds: {
                    hasEvery: [senderId, UserToChatId]
                }
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc"
                    }
                }
            }
        })

        if (!conversation) {
            return res.status(200).json([]);
        }
        res.status(200).json(conversation.messages)
    } catch (error: any) {
        console.error("ERROR: ", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}


export const getUsersForSidebar = async (req: Request, res: Response) => {
    try {
        const authUserId = req.user.id;
        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: authUserId
                }
            },
            select: {
                id: true,
                fullName: true,
                profilePic: true,
            }
        })
        res.status(201).json(users)
    } catch (error: any) {
        console.error("ERROR: ", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}