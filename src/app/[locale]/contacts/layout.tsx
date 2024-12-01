import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contacts',
    description: 'Contact page for our website'
}

export default function ContactsLayout({
                                           children
                                       }: {
    children: React.ReactNode
}) {
    return <>{children}</>
}