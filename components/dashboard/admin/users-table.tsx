'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CircleX, UserPen } from "lucide-react"

type User = {
    id: string
    name: string
    email: string
    role: string,
    profilePhoto: string,
    is_banned: boolean,
    created_at: string
    updated_at: string
}

export function AllUsersTable({ users }: { users: User[] }) {
    if (users.length === 0) {
        return <p className="text-muted-foreground">No users yet.</p>
    }

    const handleEdit = (e: React.MouseEvent, id: string) => {
        console.log(id)
        e.stopPropagation()

    }

    const handleDelete = (e: React.MouseEvent, id: string) => {
        console.log(id)
        e.stopPropagation()
    }

    const router = useRouter()
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Created at</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="flex items-center gap-3">
                            {user.profilePhoto ? (
                                <Image
                                    width={50}
                                    height={50}
                                    src={user.profilePhoto}
                                    alt={user.profilePhoto}
                                    className="w-12 h-12 rounded-md object-cover"
                                />
                            ) : <span className="w-12 h-12 rounded-md object-cover bg-secondary"></span>}
                            {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                            {new Date(user.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: '2-digit',
                                year: 'numeric'
                            })}
                        </TableCell>
                        <TableCell>
                            <Badge variant={"outline"}>{user.role}</Badge>
                        </TableCell>
                        <TableCell className="flex justify-center items-center h-full w-full">
                            <Button className="w-8 flex" variant="outline" onClick={(e) => handleEdit(e, user.id)}>
                                <UserPen />
                            </Button>
                            <Button className="w-8 flex" variant="destructive" onClick={(e) => handleDelete(e, user.id)}>
                                <CircleX />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}