import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const body = await req.json() // 解析 JSON

        const { filename, filetype, records } = body
        console.log(records)
        if (!filename || !filetype || !Array.isArray(records)) {
            return NextResponse.json({ error: 'Invalid request format' }, { status: 400 })
        }

        const fileRecord = await db.file.create({
            data: {
                filename,
                filetypeId: filetype
            }
        })

        const fileTypeRecord = await db.fileType.findUnique({ where: { id: filetype } })

        // 处理 RentSubsidy 数据
        if (filetype === fileTypeRecord?.id) {
            const formattedRecords = records.map((record) => ({
                individual: record.Individual,
                program: record['Program or Site'] || null,
                subsidyAmount: record['Subsidy Amount'] || null,
                dateOfRequest: record['Date of Request'],
                rentSupplementProgram: record['Rent Supplement Program'] || null,
                homeAddress: record['Applicants Current Home Address']?.toString() || null,
                fullMonthlyRentAmount: record['Full Monthly Rent Amount'] || null,
                notes: record.Notes || null,
                fileId: fileRecord.id // 关联文件ID
            }))
            await db.rentSubsidy.createMany({ data: formattedRecords })
        }

        return NextResponse.json(
            { message: 'Upload successful', fileId: fileRecord.id },
            { status: 201 }
        )
    } catch (error) {
        console.error('POST request error:', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function GET(req: Request) {
    await db.fileType.create({
        data: {
            typename: 'Flow Through'
        }
    })
}
