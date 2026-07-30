'use client'

import { useState, useMemo } from 'react'
import { PropertyCard } from '@/components/property-card'
import { Button } from '@/components/ui/button'
import { Search, X, ChevronDown } from 'lucide-react'
import { Navbar } from '@/components/shared/navbar'
import { IProperty } from '@/app/(properties)/_actions/getAllProperties'

export default function PropertyBrowseClient({ properties }: { properties: IProperty[] }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 })
    const [showFilters, setShowFilters] = useState(false)

    const categories = useMemo(
        () => Array.from(new Set(properties.map((p) => p.category.name))).sort(),
        [properties]
    )
    const locations = useMemo(
        () => Array.from(new Set(properties.map((p) => p.location))).sort(),
        [properties]
    )

    // Filter properties
    const filteredProperties = useMemo(() => {
        return properties.filter((property) => {
            const matchesSearch =
                property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.category.name.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesCategory = selectedCategory === null || property.category.name === selectedCategory

            const matchesPrice = property.price >= priceRange.min && property.price <= priceRange.max

            const matchesAvailability = property.is_available

            return matchesSearch && matchesCategory && matchesPrice && matchesAvailability
        })
    }, [properties, searchQuery, selectedCategory, priceRange])

    const handleReset = () => {
        setSearchQuery('')
        setSelectedCategory(null)
        setPriceRange({ min: 0, max: 100000 })
    }

    const activeFilters = [
        searchQuery && { type: 'search', label: searchQuery, key: 'search' },
        selectedCategory && { type: 'category', label: selectedCategory, key: 'category' },
        (priceRange.min > 0 || priceRange.max < 100000) && {
            type: 'price',
            label: `$${priceRange.min.toLocaleString()} - $${priceRange.max.toLocaleString()}`,
            key: 'price',
        },
    ].filter(Boolean)

    return (
        < div className="min-h-screen bg-background" >
            <Navbar />

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-border" >
                <div className="space-y-6">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                            Find Your Next Place
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Browse {properties.length} available properties
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by location or property type..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                        />
                    </div>

                    {/* Active Filters */}
                    {activeFilters.length > 0 && (
                        <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-sm text-muted-foreground">Active filters:</span>
                            {activeFilters.map((filter: any) => (
                                <div
                                    key={filter.key}
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                                >
                                    {filter.label}
                                    <button
                                        onClick={() => {
                                            if (filter.key === 'search') setSearchQuery('')
                                            if (filter.key === 'category') setSelectedCategory(null)
                                            if (filter.key === 'price') setPriceRange({ min: 0, max: 100000 })
                                        }}
                                        className="ml-1 hover:opacity-70"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <button onClick={handleReset} className="text-sm text-muted-foreground hover:text-foreground">
                                Clear all
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Filters */}
                    <div className={`lg:block space-y-6 ${showFilters ? 'block' : 'hidden'}`}>
                        <div className="lg:hidden flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                            <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-muted rounded-md">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">Property Type</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedCategory === null
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-muted text-foreground'
                                        }`}
                                >
                                    All Types
                                </button>
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors capitalize ${selectedCategory === category
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-muted text-foreground'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div className="space-y-3 border-t border-border pt-6">
                            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">Price Range</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs text-muted-foreground mb-2 block">Min Price</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100000"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground mb-2 block">Max Price</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100000"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                                <div className="pt-2 px-3 py-2 rounded-md bg-muted text-sm text-muted-foreground">
                                    ${priceRange.min.toLocaleString()} - ${priceRange.max.toLocaleString()}
                                </div>
                            </div>
                        </div>

                        {/* Location Filter */}
                        <div className="space-y-3 border-t border-border pt-6">
                            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">Locations</h3>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {locations.map((location) => (
                                    <label key={location} className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={searchQuery === location}
                                            onChange={(e) => setSearchQuery(e.target.checked ? location : '')}
                                            className="w-4 h-4 rounded border-border bg-background cursor-pointer"
                                        />
                                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                                            {location}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Properties Grid */}
                    <div className="lg:col-span-3">
                        <div className="lg:hidden mb-6">
                            <Button
                                onClick={() => setShowFilters(!showFilters)}
                                variant="outline"
                                className="w-full gap-2 px-4 py-2"
                            >
                                <ChevronDown className="w-4 h-4" />
                                {showFilters ? 'Hide Filters' : 'Show Filters'}
                            </Button>
                        </div>

                        {filteredProperties.length > 0 ? (
                            <div>
                                <div className="mb-6 text-sm text-muted-foreground">
                                    Showing <span className="font-semibold text-foreground">{filteredProperties.length}</span> of{' '}
                                    <span className="font-semibold text-foreground">{properties.length}</span> properties
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                                    {filteredProperties.map((property) => (
                                        <PropertyCard key={property.id} property={property} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                    <Search className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">No properties found</h3>
                                <p className="text-muted-foreground mb-6 max-w-sm">
                                    Try adjusting your search or filter criteria to find what you're looking for.
                                </p>
                                <Button onClick={handleReset} variant="outline" className="px-6 py-2">
                                    Reset Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}