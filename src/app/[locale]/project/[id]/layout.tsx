import { Metadata } from 'next'
import {fetchGraphQL} from "@/app/lib/directus";

type ProductLayoutProps = {
    params: { slug: string }
}

export async function generateMetadata({
                                           params
                                       }: ProductLayoutProps): Promise<Metadata> {
    try {
        const query = `
                query Projects {
                    projects(filter: { id: { _eq: "2" } }) {
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

        const product = await fetchGraphQL(query)

        const {
            data: {
                projects: [
                    {
                        photos: [
                            {
                                directus_files_id: { id: photoId }
                            }
                        ],
                        translations: [
                            {
                                name,
                                description
                            }
                        ]
                    }
                ]
            }
        } = product;


        if (!product) {
            return {
                title: 'Product Not Found',
                description: 'The requested product could not be found'
            }
        }

        return {
            title: name,
            description: description,
            openGraph: {
                title: name,
                description: description,
                images: [
                    {
                        url: photoId,
                        width: 800,
                        height: 600,
                        alt: name
                    }
                ]
            },
            twitter: {
                card: 'summary_large_image',
                title: product.name,
                description: product.description,
                images: [`${process.env.NEXT_PUBLIC_DIRECTUS_API_URL2}/assets/${photoId}`]
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