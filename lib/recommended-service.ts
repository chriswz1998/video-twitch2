import { db } from '@/lib/db'
import { getSelf } from '@/lib/auth-service'
import { User } from '@prisma/client'

export const getRecommended = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    let userId
    try {
        const self = await getSelf()
        userId = self.id
    } catch (e) {
        userId = null
    }

    let users: User[] = []

    if (userId) {
        users = await db.user.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            id: userId
                        }
                    },
                    {
                        NOT: {
                            followedBy: {
                                some: {
                                    followerId: userId
                                }
                            }
                        }
                    },
                    {
                        NOT: {
                            blocking: {
                                some: {
                                    blockedId: userId
                                }
                            }
                        }
                    }
                ]
            },
            include: {
                stream: true
            },
            orderBy: {
                createAt: 'desc'
            }
        })
    } else {
        try {
            users = await db.user.findMany({
                include: { stream: true },
                orderBy: {
                    createAt: 'desc'
                }
            })
        } catch {
            console.log('error')
        }
    }

    return users
}
