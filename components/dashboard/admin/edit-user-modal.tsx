// components/dashboard/admin/edit-user-modal.tsx
'use client'

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UpdateUserSchema, type UpdateUserInput } from "@/lib/schemas/user"
import { editUser } from "@/app/(dashboard)/admin-dashboard/_actions/editUser"
import { Spinner } from "@/components/ui/spinner"

type User = {
    id: string
    name: string
    email: string
    role: "TENANT" | "LANDLORD" | "ADMIN"
    is_banned: boolean
}

export function EditUserModal({
    user,
    open,
    onOpenChange,
}: {
    user: User
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<UpdateUserInput>({
        resolver: zodResolver(UpdateUserSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            role: user.role,
            is_banned: user.is_banned,
        },
    })

    const onSubmit = async (data: UpdateUserInput) => {
        const result = await editUser(user.id, data)

        if (result.success) {
            toast.success("User updated.")
            onOpenChange(false)
            router.refresh()
        } else {
            toast.error(result.message || "Could not update user.")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
                    <div>
                        <label className="text-sm font-medium block mb-1">Name</label>
                        <Input {...register("name")} placeholder="Full name" />
                        {errors.name && (
                            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-1">Email</label>
                        <Input {...register("email")} type="email" placeholder="email@example.com" />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-1">Role</label>
                        <Select
                            defaultValue={user.role}
                            onValueChange={(val) =>
                                setValue("role", val as UpdateUserInput["role"], { shouldValidate: true })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="TENANT">Tenant</SelectItem>
                                <SelectItem value="LANDLORD">Landlord</SelectItem>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.role && (
                            <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-1">Account Status</label>
                        <Select
                            defaultValue={user.is_banned ? "true" : "false"}
                            onValueChange={(val) =>
                                setValue("is_banned", val === "true", { shouldValidate: true })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="false">Active</SelectItem>
                                <SelectItem value="true">Banned</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" className="w-full h-10" disabled={isSubmitting}>
                        {isSubmitting ? <Spinner></Spinner> : "Save Changes"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}