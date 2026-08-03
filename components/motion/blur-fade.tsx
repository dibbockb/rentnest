"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface BlurFadeProps {
    children: ReactNode
    className?: string
    duration?: number
}

export function BlurFade({ children, className, duration = 0.5 }: BlurFadeProps) {
    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration, ease: "easeInOut" }}
            style={{ willChange: "filter, opacity" }}
            className={className}
        >
            {children}
        </motion.div>
    )
}