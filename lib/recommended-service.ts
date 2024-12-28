import { db } from '@/lib/db'

export const getRecommended = () => {
    return db.user.findMany({
        orderBy: {
            createAt: 'desc'
        }
    })
}
