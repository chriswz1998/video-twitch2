import { db } from '@/lib/db'

export const getRecommended = async () => {
    return db.user.findMany({
        orderBy: {
            createAt: 'desc'
        }
    })
}
