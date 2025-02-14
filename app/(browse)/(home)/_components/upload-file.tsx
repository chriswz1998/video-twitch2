'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import { FileType, RentSubsidy } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

const UploadFile = ({ files_types }: { files_types: FileType[] }) => {
    const [upload, setUpload] = useState<{
        filename?: null | string
        filetype?: null | string
        records?: null | any
    }>({
        filename: null,
        filetype: null,
        records: null
    })

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const filename = file.name // ✅ 获取文件名

        const reader = new FileReader()
        reader.onload = async (e: ProgressEvent<FileReader>) => {
            if (!e.target?.result) {
                console.error('Failed to read file')
                return
            }

            const data = new Uint8Array(e.target.result as ArrayBuffer)
            const workbook = XLSX.read(data, { type: 'array' })
            const sheetName = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetName]

            const records = XLSX.utils.sheet_to_json(sheet) // ✅ 解析 Excel 数据

            setUpload({
                filename,
                records
            })
        }

        reader.readAsArrayBuffer(file)
    }

    const upload_file = async () => {
        try {
            const res = await fetch('/api/file', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(upload)
            })

            if (!res.ok) throw new Error('Upload failed')

            const result = await res.json()
            console.log('Upload response:', result)
            alert('File uploaded successfully!')
            revalidatePath('/')
        } catch (error) {
            console.error('Error uploading file:', error)
            alert('Error uploading file')
        }
    }

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

            <Select onValueChange={(value) => setUpload({ ...upload, filetype: value })}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="select file type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Types</SelectLabel>
                        {files_types.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                                {type.typename}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Button onClick={upload_file}>upload</Button>
        </div>
    )
}

export default UploadFile
