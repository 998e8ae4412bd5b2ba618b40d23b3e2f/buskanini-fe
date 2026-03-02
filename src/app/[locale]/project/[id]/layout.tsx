import { Metadata } from 'next'
import {fetchGraphQL} from "@/app/lib/directus";

type ProductLayoutProps = {
    params: { id: string }
}

export async function generateMetadata({
                                           params
                                       }: ProductLayoutProps): Promise<Metadata> {
    try {
        const query = `
                query Projects {
                    projects(filter: { id: { _eq: "${params.id}" } }) {
                        photos(limit: 1) {
                            directus_files_id {
                                id
                            }
                        }
                        translations(filter: { languages_code: { code: { _eq: "en-US" } } }) {
                            name
                            description
                        }
                    }
                }
            `;

        const result = await fetchGraphQL(query);
        const project = result?.data?.projects?.[0];

        if (!project) {
            return {
                title: 'Product Not Found',
                description: 'The requested product could not be found'
            }
        }

        const photoId = project.photos?.[0]?.directus_files_id?.id;
        const name = project.translations?.[0]?.name ?? 'Project';
        const description = project.translations?.[0]?.description ?? '';

        return {
            title: name,
            description: description,
            openGraph: {
                title: name,
                description: description,
                images: photoId ? [
                    {
                        url: `${process.env.NEXT_PUBLIC_DIRECTUS_API_URL2}/assets/${photoId}`,
                        width: 800,
                        height: 600,
                        alt: name
                    }
                ] : []
            },
            twitter: {
                card: 'summary_large_image',
                title: name,
                description: description,
                images: photoId ? [`${process.env.NEXT_PUBLIC_DIRECTUS_API_URL2}/assets/${photoId}`] : []
            }
        }
    } catch (error) {
        console.error('Failed to fetch product metadata:', error)
        return {
            title: 'Product Error',
            description: 'An error occurred while loading the product'
        }
    }
}

export default function ProductLayout({
                                          children
                                      }: {
    children: React.ReactNode
}) {
    return <>{children}</>
}