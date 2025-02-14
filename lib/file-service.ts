import { db } from '@/lib/db'
import { RentSubsidy } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const getFiles = async () => {
    const type = await db.fileType.findMany()

    const files = await db.file.findMany({
        include: {
            filetype: true
        }
    })

    return { type, files }
}

export const getAnalyticsById = async (id: string) => {
    // 获取文件信息，包含 filetype
    const file = await db.file.findUnique({
        where: { id },
        include: { filetype: true }
    })

    if (!file) {
        throw new Error('File not found')
    }

    if (file.filetype.typename !== 'Rent Supplement Request') {
        return { message: 'Not a Rent Supplement Request file' }
    }

    // 获取相关 RentSubsidy 记录
    const subsidies = await db.rentSubsidy.findMany({ where: { fileId: file.id } })

    // 统计数据
    const programStats: Record<string, number> = {}
    const programAmountStats: Record<string, number> = {}
    const individualStats: Record<string, { count: number; totalAmount: number }> = {}
    const fileStats: Record<string, number> = {}
    const dateStats: Record<string, number> = {}

    subsidies.forEach((curr) => {
        const program = curr.rentSupplementProgram?.trim() || 'Unknown'
        const subsidyAmount = parseFloat(curr.subsidyAmount?.replace(/[$,]/g, '') || '0')
        const individual = curr.individual.trim()
        const fileId = curr.fileId?.trim()
        const date = new Date((curr.dateOfRequest - 25569) * 86400 * 1000)
            .toISOString()
            .split('T')[0] // Excel 日期转换

        // 1️⃣ 统计 Rent Supplement Program 的申请次数
        programStats[program] = (programStats[program] || 0) + 1

        // 2️⃣ 按 Program 统计总补贴金额
        const programKey = curr.program?.trim() || 'Unknown'
        programAmountStats[programKey] = (programAmountStats[programKey] || 0) + subsidyAmount

        // 3️⃣ 按 Individual 统计总申请次数 & 总金额
        if (!individualStats[individual]) {
            individualStats[individual] = { count: 0, totalAmount: 0 }
        }
        individualStats[individual].count += 1
        individualStats[individual].totalAmount += subsidyAmount

        // 4️⃣ 按 File ID 统计补贴总额
        if (fileId) {
            fileStats[fileId] = (fileStats[fileId] || 0) + subsidyAmount
        }

        // 5️⃣ 按 Date 统计补贴发放情况
        dateStats[date] = (dateStats[date] || 0) + subsidyAmount
    })

    return {
        programStats,
        programAmountStats,
        individualStats,
        fileStats,
        dateStats
    }
}

// create 3 defrience function to request the 3 type report
