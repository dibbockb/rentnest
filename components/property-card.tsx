'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Heart, ImageIcon } from 'lucide-react'
import { useState } from 'react'
import { IProperty } from "@/app/(properties)/_actions/getAllProperties";


export function PropertyCard({ property }: { property: IProperty }) {
    const [liked, setLiked] = useState(false)
    const [imageLoading, setImageLoading] = useState(true)

    return (
        <Link href={`/property/${property.id}`}>
            <div className="group cursor-pointer h-full flex flex-col">
                <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                    <Image
                        src={property.images[0]}
                        alt={`${property.category.name} in ${property.location}`}
                        fill
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${imageLoading ? 'blur-sm' : 'blur-0'
                            }`}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        onLoad={() => setImageLoading(false)}
                    />

                    {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted">
                            <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
                        </div>
                    )}

                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            setLiked(!liked)
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background transition-colors backdrop-blur-sm"
                    >
                        <Heart
                            className={`w-5 h-5 transition-colors ${liked ? 'fill-black text-black' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        />
                    </button>

                    {property.images.length > 1 && (
                        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/50 text-white text-xs font-medium backdrop-blur-sm">
                            +{property.images.length - 1}
                        </div>
                    )}
                </div>

                <div className="flex-1 space-y-3">
                    <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 capitalize">
                            {property.category.name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span className="line-clamp-1">{property.location}</span>
                        </div>
                    </div>

                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-foreground">
                            ${property.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground">/month</span>
                    </div>

                    {property.is_available && (
                        <div className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-xs font-medium">
                            Available
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}
