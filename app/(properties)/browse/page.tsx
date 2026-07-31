import PropertyBrowseClient from '@/components/property/property-browse-client';
import { getAllProperties } from '../_actions/getAllProperties'

export default async function BrowsePropertiesPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const properties = await getAllProperties();

    return <PropertyBrowseClient properties={properties} />;
}