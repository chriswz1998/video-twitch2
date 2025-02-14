'use client'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { useRef, useState, useTransition } from 'react'
import { createIngress } from '@/actions/ingress'
import { toast } from 'sonner'

const RTMP = '0'
const WHIP = '1'

export const ConnectModal = () => {
    const closeRef = useRef<HTMLButtonElement>(null)
    const [isPending, startTransition] = useTransition()
    const [ingressType, setIngressType] = useState(RTMP)

    const submit = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType))
                .then(() => {
                    toast.success('Ingress created')
                    closeRef.current?.click()
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="primary">Generate connection</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate connection</DialogTitle>
                </DialogHeader>
                <Select
                    disabled={isPending}
                    value={ingressType}
                    onValueChange={(value) => setIngressType(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ingress type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={RTMP}>RTMP</SelectItem>
                        <SelectItem value={WHIP}>WHIP</SelectItem>
                    </SelectContent>
                </Select>
                <Alert>
                    <AlertTriangle className="w-4 h-4" />
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        This action will reset all active streams using the current connection.
                    </AlertDescription>
                </Alert>
                <div className="flex justify-between">
                    <DialogClose ref={closeRef} asChild>
                        <Button>Cancel</Button>
                    </DialogClose>
                    <Button disabled={isPending} variant="primary" onClick={submit}>
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
