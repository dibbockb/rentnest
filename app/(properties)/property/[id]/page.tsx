import { getPropertyDetails } from "../../_actions/getPropertyDetails";
import PropertyDetailsPage from "@/components/property-page";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function CreatePropertyPage({ params }: PageProps) {
    const allParams = await params;
    const property = await getPropertyDetails(allParams.id);

    return <PropertyDetailsPage property={property} />;
}