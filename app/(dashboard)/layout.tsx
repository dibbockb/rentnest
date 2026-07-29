import { Navbar } from "@/components/shared/navbar";
import { Suspense } from "react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Navbar />
            {children}
        </Suspense>
    );
}
