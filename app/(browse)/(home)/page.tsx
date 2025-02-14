import { getFiles } from '@/lib/file-service'
import UploadFile from '@/app/(browse)/(home)/_components/upload-file'
import { formatterDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Home = async () => {
    const { type, files } = await getFiles()
    return (
        <div className=" w-full h-full flex flex-col gap-y-4 items-center justify-center">
            <UploadFile files_types={type} />
            {files.map((file) => (
                <div className="p-4 text-white">
                    <p>filename: {file.filename}</p>
                    <p>file type: {file.filetype.typename}</p>
                    <p>upload time: {formatterDate(file.uploadtime)}</p>
                    <Link href={`/report/${file.id}`}>
                        <Button>View detail and report</Button>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Home
