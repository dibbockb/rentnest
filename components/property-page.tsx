'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { MapPin, Heart, Share2, ArrowLeft, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/shared/navbar'
import { IProperty } from '@/app/(properties)/_actions/getAllProperties'
import { toast } from 'sonner'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { submitRequest } from '@/app/(properties)/_actions/submitRequest'
import { Spinner } from './ui/spinner'

export default function PropertyDetailsPage({ property }: { property: IProperty }) {
    const [liked, setLiked] = useState(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [imageLoading, setImageLoading] = useState(true)
    const [showConfirm, setShowConfirm] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    if (!property) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-2">Property not found</h1>
                    <p className="text-muted-foreground mb-6">This property doesn&apos;t exist or has been removed.</p>
                    <Link href="/browse">
                        <Button variant={'default'} className="w-40 h-9">Back to Properties</Button>
                    </Link>
                </div>
            </div>
        )
    }

    const nextImage = () => {
        setSelectedImageIndex((prev) => (prev + 1) % property.images.length)
        setImageLoading(true)
    }

    const prevImage = () => {
        setSelectedImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
        setImageLoading(true)
    }

    const handleConfirmRequest = async () => {
        setIsSubmitting(true)
        const result = await submitRequest(property.id)

        if (result.success) {
            toast.success("Request sent!")
        } else {
            toast.error(result.message || "Could not send request.")
        }

        setIsSubmitting(false)
        setShowConfirm(false)
    }

    const handleShare = () => {
        const currentUrl = window.location.href
        navigator.clipboard.writeText(currentUrl)
        toast.success("Link copied to clipboard!")
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link href="/properties">
                    <Button variant="ghost" className="gap-2 mb-6 px-3 py-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Image Gallery */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden group">
                            <Image
                                src={property.images[selectedImageIndex]}
                                alt={`${property.category.name} - Image ${selectedImageIndex + 1}`}
                                fill
                                className={`object-cover transition-all ${imageLoading ? 'blur-sm' : 'blur-0'}`}
                                priority
                                onLoad={() => setImageLoading(false)}
                            />

                            {imageLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                                    <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            {property.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
                                        {selectedImageIndex + 1} / {property.images.length}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Thumbnail Grid */}
                        {property.images.length > 1 && (
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                {property.images.map((image, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setSelectedImageIndex(idx)
                                            setImageLoading(true)
                                        }}
                                        className={`relative aspect-square rounded-md overflow-hidden border-2 transition-colors ${selectedImageIndex === idx ? 'border-primary' : 'border-border hover:border-primary/50'
                                            }`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`Thumbnail ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="100px"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar Information */}
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold text-foreground capitalize mb-1">
                                {property.category.name}
                            </h1>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="w-4 h-4 shrink-0" />
                                <span>{property.location}</span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="space-y-2 p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Monthly Price</p>
                            <p className="text-4xl font-bold text-foreground">
                                ${property.price.toLocaleString()}
                                <span className="text-lg text-muted-foreground font-normal">/month</span>
                            </p>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2">
                            {property.is_available ? (
                                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-100 dark:bg-green-950/30">
                                    <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400" />
                                    <span className="text-sm font-medium text-green-700 dark:text-green-400">Available</span>
                                </div>
                            ) : (
                                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-100 dark:bg-red-950/30">
                                    <div className="w-2 h-2 rounded-full bg-red-600 dark:bg-red-400" />
                                    <span className="text-sm font-medium text-red-700 dark:text-red-400">Not Available</span>
                                </div>
                            )}
                        </div>

                        {/* Photos Count */}
                        <div className="p-4 bg-muted rounded-lg space-y-2">
                            <p className="text-sm text-muted-foreground">
                                <span className="font-semibold text-foreground">{property.images.length}</span> photos available
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Last updated {new Date(property.updated_at).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Property Info */}
                        <div className="space-y-3 border-t border-border pt-6">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Property ID</span>
                                <span className="text-sm font-mono text-foreground">{property.id.slice(0, 8)}...</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Category</span>
                                <span className="text-sm font-medium text-foreground capitalize">{property.category.name}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-4">
                            <Button onClick={() => setShowConfirm(true)} className="w-full px-4 py-3 h-12 text-base">
                                Request to Rent
                            </Button>

                            <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
                                <AlertDialogContent size='sm'>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-2xl font-medium">Send rental request?</AlertDialogTitle>
                                        <AlertDialogDescription className="text-sm font-light">
                                            The landlord will review and approve your request first. You&apos;ll need to checkout to confirm the rental.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="h-10" disabled={isSubmitting}>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="h-10" onClick={handleConfirmRequest} disabled={isSubmitting}>
                                            {isSubmitting ? <Spinner /> : 'Send Request'}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>


                            <div className="grid grid-cols-2 gap-3 transition-all duration-500">
                                <Button
                                    variant="outline"
                                    className="gap-2 px-4 py-3 h-10"
                                    onClick={() => setLiked(!liked)}
                                >
                                    <Heart
                                        className={`w-4 h-4 transition-all duration-500 ${liked ? 'fill-black text-black' : ''}`}
                                    />
                                    {liked ? 'Saved' : 'Save'}
                                </Button>
                                <Button variant="outline" onClick={handleShare} className="gap-2 px-4 py-3 h-10">
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Sections */}
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Description */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-foreground mb-4">About this property</h2>
                        <div className="p-6 rounded-lg border border-border space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                                This spacious {property.category.name} is located in {property.location}. It features modern
                                amenities and excellent accessibility. Perfect for professionals and families looking for a quality
                                living space.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                The property has been well-maintained and is ready for immediate occupancy. Contact the landlord for
                                more details and to schedule a viewing.
                            </p>
                        </div>
                    </div>

                    {/* Landlord Info */}
                    <div>
                        <h2 className="text-xl font-bold text-foreground mb-4">About the Landlord</h2>
                        <div className="p-6 rounded-lg border border-border space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    {property.landlord?.profilePhoto && (
                                        <Image
                                            className="rounded-full"
                                            src={property.landlord.profilePhoto}
                                            alt={property.landlord.name || 'Landlord profile photo'}
                                            width={40}
                                            height={40}
                                        />
                                    )}
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">{property.landlord?.name}</p>
                                    <p className="text-sm text-foreground">{property.landlord?.email}</p>
                                    <p className="text-xs text-muted-foreground">Verified</p>
                                </div>
                            </div>
                            <Button className="w-full h-8" variant="outline">
                                Contact Landlord
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
